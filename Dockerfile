# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

# Install NodeJs
RUN apt-get update && \
apt-get install -y wget && \
apt-get install -y gnupg2 && \
wget -qO- https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y build-essential nodejs
# End Install
WORKDIR /app

# Copy the .csproj files and restore dependencies for all projects
COPY *.sln ./
COPY Stats.API/*.csproj Stats.API/
COPY Stats.Database/*.csproj Stats.Database/
COPY Stats.ExtApi/*.csproj Stats.ExtApi/
COPY Stats.CmdApp/*.csproj Stats.CmdApp/
COPY stats.web/*.esproj Stats.Web/
RUN dotnet restore

# Copy the entire solution and build
COPY . ./
RUN dotnet publish Stats.API/Stats.API.csproj -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/Stats.API/out .

# Expose the port and start the app
EXPOSE 80
ENTRYPOINT ["dotnet", "Stats.API.dll"]