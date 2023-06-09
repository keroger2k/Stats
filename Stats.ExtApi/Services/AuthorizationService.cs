﻿using Stats.Database.Services;
using Stats.Models;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace Stats.ExtApi.Services
{
    public class AuthorizationService
    {
        private const string API_URL = "https://api.team-manager.gc.com";
        private const string AUTH_ENDPOINT = "/auth";
        private const string DEVICE_ID = "ce0827aa5e4051bcf017ab8922f36b0d";
        private const string CLIENT_ID = "8046e3bb-11a8-473c-bfdd-1c42b678319c";
        private const string EDEN_AUTH_KEY = "DyOvp5A/8MNhXyFsRn/tlb5hZ9Qy6/4VI5fJPGm0tsc=";
        private readonly HttpClient _httpClient;
        private readonly DatabaseService _db;
        public AuthorizationService(HttpClient httpClient, DatabaseService db)
        {
            _httpClient = httpClient;
            _db = db;
        }
        public async Task<string> GetAccessTokenAsync()
        {
            var token = await _db.GetTokenAsync();
            var handler = new JwtSecurityTokenHandler();
            var access1 = handler.ReadJwtToken(token.access.data);
            var refresh1 = handler.ReadJwtToken(token.refresh.data);

            if (token == null)
            {
                throw new Exception("No access token present. Please create one with valid refresh token.");
            }
            else if (access1.ValidTo > DateTime.UtcNow)
            {
                return token.access.data;
            }
            else if (refresh1.ValidTo > DateTime.UtcNow)
            {
                var newToken = await GetRefreshTokenAsync(token.refresh.data);
                WriteTokenToDb(newToken);
                return newToken.access.data;
            }
            else
            {
                throw new Exception("Access token was not able to refresh.");
            }
        }

        public async void WriteTokenToDb(AuthorizationToken token)
        {
            await _db.CreateTokenAsync(new Stats.Database.Models.AuthorizationToken()
            {
                type = token.type,
                access = new Stats.Database.Models.AuthorizationToken.Token()
                {
                    data = token.access.data,
                    expires = token.access.expires
                },
                refresh = new Stats.Database.Models.AuthorizationToken.Token()
                {
                    data = token.refresh.data,
                    expires = token.refresh.expires
                }
            });
        }

        private async Task<HttpResponseMessage> MakePostRequestAsync(GCContext context, string payload, string signature, string token = "")
        {
            if(_httpClient.BaseAddress == null)
            {
                _httpClient.BaseAddress = new Uri(API_URL);
            }
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Gc-Signature", context.nonce + "." + signature);
            if (!string.IsNullOrEmpty(token))
            {
                _httpClient.DefaultRequestHeaders.Add("Gc-Token", token);
            }
            _httpClient.DefaultRequestHeaders.Add("Gc-App-Version", "0.0.0");
            _httpClient.DefaultRequestHeaders.Add("Gc-Device-Id", DEVICE_ID);
            _httpClient.DefaultRequestHeaders.Add("Gc-Client-Id", CLIENT_ID);
            _httpClient.DefaultRequestHeaders.Add("Gc-App-Name", "web");
            _httpClient.DefaultRequestHeaders.Add("Gc-Timestamp", context.timestamp.ToString());
            var clientRequestContent = new StringContent(payload, Encoding.UTF8, "application/json");
            return await _httpClient.PostAsync(AUTH_ENDPOINT, clientRequestContent);
        }
        public async Task<AuthorizationToken> GetRefreshTokenAsync(string refreshToken)
        {
            var payload = new { type = "refresh" };
            var context = GetNewContext();
            var clientRequestSignature = SignPayload(context, payload);
            var response = await MakePostRequestAsync(context, JsonSerializer.Serialize(payload), clientRequestSignature, refreshToken);
            var newToken = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<AuthorizationToken>(newToken) ?? new AuthorizationToken();
        }
        private GCContext GetNewContext()
        {
            return new GCContext
            {
                nonce = Base64Encode(RandomString(32)),
                timestamp = GetTimestamp(),
                previousSignature = ""
            };
        }
        private string SignPayload(GCContext context, object payload)
        {
            using (IncrementalHash hmacsha256 = IncrementalHash.CreateHMAC(HashAlgorithmName.SHA256, Convert.FromBase64String(EDEN_AUTH_KEY)))
            {
                var values = ValuesForSigner(payload, 0);
                var valstring = string.Join('|', values);
                hmacsha256.AppendData(Encoding.UTF8.GetBytes(context.timestamp.ToString() + "|"));
                hmacsha256.AppendData(Convert.FromBase64String(context.nonce));
                hmacsha256.AppendData(Encoding.UTF8.GetBytes("|"));
                hmacsha256.AppendData(Encoding.UTF8.GetBytes(valstring));
                if (!string.IsNullOrEmpty(context.previousSignature))
                {
                    hmacsha256.AppendData(Encoding.UTF8.GetBytes("|"));
                    hmacsha256.AppendData(Convert.FromBase64String(context.previousSignature));
                }
                var hash = hmacsha256.GetHashAndReset();
                return Convert.ToBase64String(hash);
            }
        }
        #pragma warning disable NU1701
        private string[] ValuesForSigner(object obj, int indent)
        {
            var propertyArray = new List<string>();
            if (obj == null)
            {
                return new string[] { };
            }
            string indentString = new string(' ', indent);
            Type objType = obj.GetType();
            PropertyInfo[] properties = objType.GetProperties().OrderBy(c => c.Name).ToArray();
            foreach (PropertyInfo property in properties)
            {
                object propValue = property.GetValue(obj, index: null);
                var elems = propValue as IList;
                if (elems != null)
                {
                    foreach (var item in elems)
                    {
                        ValuesForSigner(item, indent + 3);
                    }
                }
                else
                {
                    // This will not cut-off System.Collections because of the first check
                    if (property.PropertyType.Assembly == objType.Assembly)
                    {
                        ValuesForSigner(propValue, indent + 2);
                    }
                    else
                    {
                        if (propValue != null)
                            propertyArray.Add(propValue.ToString());
                    }
                }
            }
            return propertyArray.ToArray();
        }

        #pragma warning restore NU1701
        private string GetPasswordHash(string password, string password_salt, string challenge_salt)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, password_salt);
            hashedPassword = BCrypt.Net.BCrypt.HashPassword(hashedPassword, challenge_salt);
            return hashedPassword;
        }
        private string RandomString(int length)
        {
            Random random = new Random();

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        private string Base64Encode(string plainText)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }
        private int GetTimestamp()
        {
            TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            return (int)t.TotalSeconds;
        }
        private class GCContext
        {
            public string nonce { get; set; } = string.Empty;
            public int timestamp { get; set; }
            public string previousSignature { get; set; } = string.Empty;
        }
    }
}
