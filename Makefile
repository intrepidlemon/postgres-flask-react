### CODE MANAGEMENT ###
freeze:
	docker run --rm \
		--name covid-dependencies \
	  --mount type=bind,source=$(PWD),target=/workspace \
		--gpus device=1 \
		--env-file .sql-env \
		covid:pytorch
		pip3 freeze

shell:
	docker run -it --rm \
		--name covid-shell \
	  --mount type=bind,source=$(PWD),target=/workspace \
		--gpus device=1 \
		--env-file .sql-env \
		covid:pytorch
		python

### DOCKER CONTAINERS ####
docker:
	docker build -t covid:pytorch -f Dockerfile .

### SQL ###
setup-sql:
	docker run --rm \
		--name covid-setup-sql \
	  --mount type=bind,source=$(DATA_DIR)/db,target=/db/\
	  --mount type=bind,source=$(PWD),target=/workspace \
		--network=host \
		--env-file .sql-env \
		covid:pytorch \
		/bin/bash -c "flask db init && flask db migrate && flask db upgrade"

upgrade-sql:
	docker run --rm \
		--name covid-setup-sql \
	  --mount type=bind,source=$(DATA_DIR)/db,target=/db/\
	  --mount type=bind,source=$(PWD),target=/workspace \
		--env-file .sql-env \
		--network=host \
		covid:pytorch \
		/bin/bash -c "flask db upgrade"

postgres:
	docker run --rm  \
		--name pg-docker \
		--env-file .sql-env \
		-p 5432:5432 \
		-v $(HOME)/docker/volumes/postgres:/var/lib/postgresql/data  \
		postgres

### SERVER ###
server:
	docker run --rm \
		--name covid-server \
		--mount type=bind,source=$(DATA_DIR)/db,target=/db/\
		--mount type=bind,source=$(PWD),target=/workspace \
		--env-file .sql-env \
		-p 5000:5000 \
		--network=host \
		covid:pytorch \
		/bin/bash -c "flask run"

