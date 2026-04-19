# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Instala un servidor HTTP simple para servir el contenido estático
RUN npm install -g serve

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["serve", "-s", "build"]
