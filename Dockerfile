#utilzado para desplegar la pagina con gcloud run
#gcloud builds submit --tag gcr.io/proyecto2s01/Name
#gcloud run deploy --image gcr.io/proyecto2s01/Name --platform managed
FROM node:12-slim
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install -g serve
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["serve", "-s", "-l", "8080", "./build"]
