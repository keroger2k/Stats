namespace Stats.Models
{
    public class AuthorizationToken
    {
        public string type { get; set; } = string.Empty;
        public Token access { get; set; } = null!;
        public Token refresh { get; set; } = null!;


        public class Token
        {
            public string data { get; set; } = string.Empty;
            public int expires { get; set; }
        }
    }
}
