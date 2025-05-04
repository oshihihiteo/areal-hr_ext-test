FROM node:22

WORKDIR ./api

COPY ./api/package*.json ./

RUN npm install

COPY ./api /api

EXPOSE 5000

CMD sh -c "npm run migrate && node config/db/init-admin.js && node app.js"



