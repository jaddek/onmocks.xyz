DOCKER_COMPOSE = docker compose

COMPOSE_FILE = docker-compose.yml

DOCKER_COMPOSE_ENV_LOCAL = $(DOCKER_COMPOSE) -f $(COMPOSE_FILE)

up: local-docker-up
down: local-docker-down
ps: local-docker-ps
logs: local-docker-logs
restart: down up

local-docker-up:
	$(DOCKER_COMPOSE_ENV_LOCAL) up -d --build --remove-orphans

local-docker-down:
	$(DOCKER_COMPOSE_ENV_LOCAL) down --remove-orphans

local-docker-ps:
	$(DOCKER_COMPOSE_ENV_LOCAL) ps --all

local-docker-logs:
	$(DOCKER_COMPOSE_ENV_LOCAL) logs

.PHONY: tests
tests:
	php bin/phpunit
