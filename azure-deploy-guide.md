# Guía para desplegar tu aplicación Next.js en Azure App Service

Esta guía te ayudará a desplegar tu aplicación "Analyst Academy" en Azure App Service.

## 1. Preparación de archivos (Completado)

Ya hemos creado los siguientes archivos necesarios para el despliegue:

- `src/app/auth/[...nextauth]/route.ts`: Configuración de autenticación con NextAuth
- `.env.production`: Variables de entorno para producción
- `web.config`: Configuración de IIS para Azure App Service
- `server.js`: Servidor personalizado para Next.js
- `.deployment`: Configuración de despliegue para Azure

## 2. Preparar tu aplicación para producción

```bash
# Instalar dependencias
npm install

# Construir la aplicación para producción
npm run build
```

## 3. Configurar Azure App Service

1. Inicia sesión en el [Portal de Azure](https://portal.azure.com)
2. Busca "App Services" y haz clic en "Crear"
3. Completa la información básica:
   - **Suscripción**: Selecciona tu suscripción de Azure
   - **Grupo de recursos**: Crea uno nuevo o usa uno existente
   - **Nombre**: analyst-academy (o el nombre que prefieras)
   - **Publicar**: Código
   - **Pila del entorno en tiempo de ejecución**: Node 18 LTS
   - **Sistema operativo**: Linux (recomendado) o Windows
   - **Región**: Selecciona la más cercana a tus usuarios
   - **Plan de App Service**: Selecciona un plan existente o crea uno nuevo

4. Haz clic en "Revisar y crear" y luego en "Crear"

## 4. Configurar el despliegue

Tienes varias opciones para desplegar tu aplicación:

### Opción 1: Despliegue desde GitHub

1. Ve a tu recurso de App Service en el Portal de Azure
2. Navega a "Centro de implementación"
3. Selecciona "GitHub" como origen
4. Autoriza Azure para acceder a tu cuenta de GitHub
5. Selecciona tu repositorio y rama
6. Configura las opciones de compilación (Build Command: `npm run build`)
7. Haz clic en "Guardar"

### Opción 2: Despliegue con Azure CLI

1. Instala la [Azure CLI](https://docs.microsoft.com/es-es/cli/azure/install-azure-cli)
2. Inicia sesión con `az login`
3. Ejecuta el siguiente comando:

```bash
az webapp up --name analyst-academy --resource-group tu-grupo-de-recursos --runtime "NODE:18-lts"
```

### Opción 3: Despliegue con Visual Studio Code

1. Instala la extensión "Azure App Service" en VS Code
2. Inicia sesión en tu cuenta de Azure
3. Haz clic derecho en tu proyecto y selecciona "Deploy to Web App"
4. Sigue las instrucciones para completar el despliegue

## 5. Configurar variables de entorno

1. Ve a tu recurso de App Service en el Portal de Azure
2. Navega a "Configuración" > "Configuración de la aplicación"
3. Agrega las siguientes variables de entorno:
   - `NEXTAUTH_URL`: URL de tu aplicación (ej. https://analyst-academy.azurewebsites.net)
   - `NEXTAUTH_SECRET`: Un secreto seguro para NextAuth
   - Variables para los proveedores de autenticación que uses (GitHub, Google, etc.)

## 6. Configurar dominio personalizado (opcional)

1. Ve a tu recurso de App Service en el Portal de Azure
2. Navega a "Dominios personalizados"
3. Sigue las instrucciones para configurar tu dominio personalizado

## Solución de problemas comunes

- **Error 500**: Verifica los logs en "Registros" > "Registros de aplicación"
- **Problemas de autenticación**: Asegúrate de que las variables de entorno estén configuradas correctamente
- **Problemas de redirección**: Verifica la configuración de NEXTAUTH_URL

## Recursos adicionales

- [Documentación de Azure App Service](https://docs.microsoft.com/es-es/azure/app-service/)
- [Documentación de NextAuth.js](https://next-auth.js.org/)