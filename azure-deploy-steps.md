# Pasos para desplegar en Azure App Service

## 1. Preparar el proyecto para Azure App Service

1. Asegúrate de que tu aplicación Next.js se compila correctamente:
   ```
   npm run build
   ```

2. Si tienes problemas con la compilación relacionados con NextAuth, prueba estas soluciones:
   - Simplifica la configuración de NextAuth como se muestra en el archivo actualizado
   - Si persisten los problemas, considera usar una versión anterior de NextAuth que sea compatible con tu versión de Next.js

## 2. Crear un archivo web.config

Este archivo ya está creado en la raíz del proyecto y configura IIS para trabajar con Next.js.

## 3. Crear un archivo server.js personalizado

Este archivo ya está creado en la raíz del proyecto y configura un servidor personalizado para Next.js.

## 4. Crear un App Service en Azure

1. Inicia sesión en el [Portal de Azure](https://portal.azure.com)
2. Busca "App Services" y haz clic en "Crear"
3. Completa la información básica:
   - **Suscripción**: Selecciona tu suscripción
   - **Grupo de recursos**: Crea uno nuevo o usa uno existente
   - **Nombre**: analyst-academy (o el nombre que prefieras)
   - **Publicar**: Código
   - **Pila del entorno en tiempo de ejecución**: Node 18 LTS
   - **Sistema operativo**: Windows (para usar IIS con web.config)
   - **Región**: Selecciona la más cercana a tus usuarios
   - **Plan de App Service**: Selecciona un plan existente o crea uno nuevo

## 5. Configurar el despliegue

### Opción 1: Despliegue desde el Portal de Azure

1. Comprime tu proyecto en un archivo ZIP
2. Ve a tu App Service en el Portal de Azure
3. Navega a "Centro de implementación" > "Implementación manual" > "ZIP Deploy"
4. Sube el archivo ZIP de tu proyecto

### Opción 2: Despliegue con Visual Studio Code

1. Instala la extensión "Azure App Service" en VS Code
2. Inicia sesión en tu cuenta de Azure
3. Haz clic derecho en tu proyecto y selecciona "Deploy to Web App"
4. Sigue las instrucciones para completar el despliegue

## 6. Configurar variables de entorno

1. Ve a tu App Service en el Portal de Azure
2. Navega a "Configuración" > "Configuración de la aplicación"
3. Añade las siguientes variables de entorno:
   - `NEXTAUTH_URL`: La URL de tu aplicación (ej. https://analyst-academy.azurewebsites.net)
   - `NEXTAUTH_SECRET`: Un valor secreto para cifrar las cookies
   - Otras variables de entorno que necesite tu aplicación

## 7. Verificar el despliegue

1. Accede a la URL de tu aplicación (https://[nombre-app].azurewebsites.net)
2. Verifica que la aplicación funciona correctamente
3. Si hay problemas, revisa los logs en "Registros" > "Registros de aplicación"