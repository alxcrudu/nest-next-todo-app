MAKEFLAGS += --silent --keep-going

DOCKER_COMPOSE_LOCAL = $(shell echo ".docker/docker-compose.local.yml")
DOCKER_COMPOSE_PROD = $(shell echo ".docker/docker-compose.prod.yml")

ENV_FILE_LOCAL = $(shell echo ".env.local")
ENV_FILE_PROD = $(shell echo ".env.prod")

########################################################################################
####                               Local Environment                                ####
########################################################################################
.PHONY: local-run local-down

local-run:
	@docker-compose \
		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
		--env-file ${ENV_FILE_LOCAL} \
		up \
		--detach
	@echo "[INFO] Local instance was successfully started!"

local-down:
	@docker-compose \
		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
		--env-file ${ENV_FILE_LOCAL} \
 		down --remove-orphans -v
	@echo "[INFO] Local instance was successfully downed."


########################################################################################
####                            Production Environment                              ####
########################################################################################
.PHONY: prod-run prod-down

prod-run:
	@docker-compose \
		--file $(DOCKER_COMPOSE_PROD) \
		--project-directory . \
		--env-file ${ENV_FILE_PROD} \
		up \
		--detach
	@echo "[INFO] Production instance was successfully started!"

prod-down:
	@docker-compose \
		--file $(DOCKER_COMPOSE_PROD) \
		--project-directory . \
		--env-file ${ENV_FILE_PROD} \
 		down --remove-orphans -v
	@echo "[INFO] Production instance was successfully downed!"