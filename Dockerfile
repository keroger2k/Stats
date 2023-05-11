FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /source
COPY . .
RUN dotnet restore "./Stats.Database/Stats.API.csproj" --disable-parallel
RUN dotnet restore "./Stats.ExtApi/Stats.API.csproj" --disable-parallel
RUN dotnet restore "./Stats.API/Stats.API.csproj" --disable-parallel
RUN dotnet publish "./Stats.API.Stats.API.csproj" -c release -o /app --no-restore

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app ./

# Expose the port and start the app
EXPOSE 5221
ENTRYPOINT ["dotnet", "Stats.API.dll"]