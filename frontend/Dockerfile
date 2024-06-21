# Stage 1: Build an Angular Docker Image
FROM node:22 as build
RUN ls
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build -- --output-path=./dist/out

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/out/browser /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf