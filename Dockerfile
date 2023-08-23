FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build:prod

FROM nginx:alpine
WORKDIR /static
COPY --from=builder /usr/src/app/dist /static
COPY ./nginx.conf /etc/nginx/nginx.conf
