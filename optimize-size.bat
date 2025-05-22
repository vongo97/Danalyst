@echo off
echo Optimizando el tamaño del proyecto para despliegue en Azure...

echo 1. Eliminando node_modules (se reinstalarán en Azure)...
if exist node_modules rmdir /s /q node_modules

echo 2. Eliminando caché de Next.js...
if exist .next\cache rmdir /s /q .next\cache

echo 3. Eliminando archivos de mapas de origen...
if exist .next\server\chunks\*.js.map del /s /q .next\server\chunks\*.js.map
if exist .next\static\chunks\*.js.map del /s /q .next\static\chunks\*.js.map

echo 4. Eliminando archivos de tipos TypeScript...
if exist .next\types rmdir /s /q .next\types

echo 5. Eliminando archivos de desarrollo...
if exist .next\server\pages\_*.js del /s /q .next\server\pages\_*.js
if exist .next\server\pages\api\*.js del /s /q .next\server\pages\api\*.js

echo 6. Comprimiendo imágenes públicas...
echo Nota: Para una optimización completa, considera comprimir manualmente las imágenes en /public/images

echo Optimización completada. El proyecto ahora debería ser más pequeño para el despliegue.
echo Recuerda ejecutar 'npm install --production' antes de desplegar si necesitas las dependencias de producción.