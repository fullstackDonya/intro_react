FROM node as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Lancer le serveur
CMD ["node", "server.js"]
