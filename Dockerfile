FROM debian:bullseye-slim AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    curl \
    gnupg \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN wget http://ftp.gnu.org/gnu/libc/glibc-2.29.tar.gz \
    && tar -xvf glibc-2.29.tar.gz \
    && cd glibc-2.29 \
    && mkdir build \
    && cd build \
    && ../configure --prefix=/usr \
    && make -j$(nproc) \
    && sudo make install

WORKDIR /app
COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
