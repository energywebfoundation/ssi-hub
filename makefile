backup:
	docker-compose exec -T dgraph curl http://localhost:8080/admin/export
	docker cp -a dgraph_alpha:/dgraph/export/. ./db_dumps
	docker-compose exec -T dgraph rm -rf export
	find ./db_dumps/* -type d -ctime +2 -exec rm -rf {} \;

restore:
	FOLDER=$$(ls -t db_dumps | head -1); \
	docker cp db_dumps/$$FOLDER dgraph_alpha:/dgraph; \
	docker-compose exec -T dgraph curl -X POST localhost:8080/alter -d '{"drop_all": true}'; \
	docker-compose exec -T dgraph dgraph live -f $$FOLDER/g01.rdf.gz -s $$FOLDER/g01.schema.gz -a localhost:9080 -z zero:5080

start-universal-resolver:
	docker-compose -f ./universal-resolver/docker-compose.resolver.yml --env-file ./universal-resolver/.env.resolver up -d

stop-universal-resolver:
	docker-compose -f ./universal-resolver/docker-compose.resolver.yml --env-file ./universal-resolver/.env.resolver stop

update-universal-resolver:
	docker-compose -f ./universal-resolver/docker-compose.resolver.yml --env-file ./universal-resolver/.env.resolver pull
	docker-compose -f ./universal-resolver/docker-compose.resolver.yml --env-file ./universal-resolver/.env.resolver up -d

