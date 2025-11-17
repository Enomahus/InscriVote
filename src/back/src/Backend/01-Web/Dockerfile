# Consultez https://aka.ms/customizecontainer pour savoir comment personnaliser votre conteneur de débogage et comment Visual Studio utilise ce Dockerfile pour générer vos images afin d’accélérer le débogage.

# Cet index est utilisé lors de l’exécution à partir de VS en mode rapide (par défaut pour la configuration de débogage)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 41230


# Cette phase est utilisée pour générer le projet de service
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/back/src/Backend/01-Web/01-Web.csproj", "src/back/src/Backend/01-Web/"]
COPY ["src/back/src/Backend/00-ServicesConfiguration/00-ServicesConfiguration.csproj", "src/back/src/Backend/00-ServicesConfiguration/"]
COPY ["src/back/src/Backend/10-Application/10-Application.csproj", "src/back/src/Backend/10-Application/"]
COPY ["src/back/src/Backend/22-Infrastructure.Persistence.SQLServer/22-Infrastructure.Persistence.SQLServer.csproj", "src/back/src/Backend/22-Infrastructure.Persistence.SQLServer/"]
COPY ["src/back/src/Backend/12-Application.Common/12-Application.Common.csproj", "src/back/src/Backend/12-Application.Common/"]
COPY ["src/back/src/Backend/21-Infrastructure.Persistence/21-Infrastructure.Persistence.csproj", "src/back/src/Backend/21-Infrastructure.Persistence/"]
COPY ["src/back/src/Backend/99-Tools/99-Tools.csproj", "src/back/src/Backend/99-Tools/"]
COPY ["src/back/src/Backend/Pcea.Core/Pcea.Core.Net.Authorization.Persistence/Pcea.Core.Net.Authorization.Persistence.csproj", "src/back/src/Backend/Pcea.Core/Pcea.Core.Net.Authorization.Persistence/"]
COPY ["src/back/src/Backend/Pcea.Core/Pcea.Core.Net.Authorization/Pcea.Core.Net.Authorization.csproj", "src/back/src/Backend/Pcea.Core/Pcea.Core.Net.Authorization/"]
COPY ["src/back/src/Backend/Pcea.Core/Pcea.Core.Net.Authorization.Application/Pcea.Core.Net.Authorization.Application.csproj", "src/back/src/Backend/Pcea.Core/Pcea.Core.Net.Authorization.Application/"]
COPY ["src/back/src/Backend/11-Application.Features/11-Application.Features.csproj", "src/back/src/Backend/11-Application.Features/"]
COPY ["src/back/src/Backend/20-Infrastructure/20-Infrastructure.csproj", "src/back/src/Backend/20-Infrastructure/"]
COPY ["src/back/src/Backend/Pcea.Core/Pcea.Core.Net.Authorization.Web/Pcea.Core.Net.Authorization.Web.csproj", "src/back/src/Backend/Pcea.Core/Pcea.Core.Net.Authorization.Web/"]
RUN dotnet restore "./src/back/src/Backend/01-Web/01-Web.csproj"
COPY . .
WORKDIR "/src/src/back/src/Backend/01-Web"
RUN dotnet build "./01-Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Cette étape permet de publier le projet de service à copier dans la phase finale
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./01-Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Cette phase est utilisée en production ou lors de l’exécution à partir de VS en mode normal (par défaut quand la configuration de débogage n’est pas utilisée)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "01-Web.dll"]