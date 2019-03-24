run:
	make dev

dev:
	./utils/run_yarn.sh dev

lint:
	./utils/run_yarn.sh lint

linw:
	./utils/run_yarn.sh lint:write

build:
	./utils/run_yarn.sh build

start:
	./utils/run_yarn.sh start

prod:
	./utils/run_yarn.sh build-n-start

install:
	./utils/run_yarn.sh install

reinstall_modules:
	@rm -rf node_modules
	make install

init:
	@cp .env.example .env
	./utils/run_yarn.sh install
