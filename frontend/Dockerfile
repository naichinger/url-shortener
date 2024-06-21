# Stage 1: Build an Angular Docker Image
FROM node:22 as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ARG configuration=production
RUN npm run build -- --output-path=./dist/out

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/out/ /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf