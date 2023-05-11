# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

# Install NodeJs
RUN apt-get update && \
apt-get install -y wget && \
apt-get install -y gnupg2 && \
wget -qO- https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y build-essential nodejs
# End Install
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY Stats.sln ./
COPY Stats.API/*.csproj ./Stats.API/
COPY Stats.Database/*.csproj ./Stats.Database/
COPY Stats.ExtApi/*.csproj ./Stats.ExtApi/

RUN dotnet restore

RUN dotnet restore
COPY . .
WORKDIR /Stats.Database
RUN dotnet build -c Release -o /app

WORKDIR /Stats.API
RUN dotnet build -c Release -o /app

WORKDIR /Stats.ExtApi
RUN dotnet build -c Release -o /app

WORKDIR /Stats.CmdApp
RUN dotnet build -c Release -o /app


FROM build AS publish
RUN dotnet publish -c Release -o /app

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "Stats.API.dll"]
