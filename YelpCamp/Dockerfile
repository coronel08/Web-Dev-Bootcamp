FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3005
ENTRYPOINT [ "node", "app.js" ]