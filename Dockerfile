FROM node:23-alpine AS builder

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    bash \
    libc6-compat  # Adds compatibility with glibc if needed by native modules


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
