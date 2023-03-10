# change these variables for your app
export HOSTNAME=localhost

# do not change this
export PROD=1

# Run this only once after cloning the repository
setup:
	npm install && cd frontend && npm install

build:
	docker compose build

dev:
	PROD=0 docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up

prod:
	docker compose up -d

down:
	docker compose down

clean:
	sudo rm -rf data frontend/build backend/__pycache__

.PHONY: build dev prod down clean
