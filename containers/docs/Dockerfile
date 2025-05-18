FROM node:22-alpine

WORKDIR /docs

COPY docs/package*.json ./
RUN npm install

COPY docs .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]