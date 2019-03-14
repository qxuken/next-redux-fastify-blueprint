run:
	make dev

dev:
	./utils/run_yarn.sh dev

lint:
	./utils/run_yarn.sh lint

build:
	./utils/run_yarn.sh build

start:
	./utils/run_yarn.sh build

prod:
	make build; make start

reinstall_modules:
	@rm -rf node_modules
	./utils/run_yarn.sh install

init:
	@cp .env.example .env
	./utils/run_yarn.sh install
