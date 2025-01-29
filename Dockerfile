# Stage 1
FROM node:23-bullseye-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    bash \
    libc6-dev \
    && rm -rf /var/lib/apt/lists/*  \

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Stage 2
#FROM nginx:alpine3.20 AS production
#WORKDIR /usr/share/nginx/html
#RUN rm -rf /usr/share/nginx/html/*
#COPY --from=builder /app/dist /usr/share/nginx/html
## COPY nginx.conf /etc/nginx/nginx.conf
#EXPOSE 80
#
#CMD ["nginx", "-g", "daemon off;"]