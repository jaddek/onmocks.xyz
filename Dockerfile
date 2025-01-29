FROM node:20-buster AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    bash \
    libc6-dev \
    && rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

COPY package*.json ./

RUN npm install --legacy-peer-deps  # --legacy-peer-deps to avoid peer dependency issues

COPY . .
RUN npm run build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
