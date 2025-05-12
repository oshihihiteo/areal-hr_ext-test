FROM node:22-alpine

WORKDIR ./api

COPY ./api/package*.json ./

RUN npm install

COPY ./api /api

EXPOSE 5000

CMD sh -c "npm run migrate && node app.js"
