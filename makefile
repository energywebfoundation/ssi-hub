enable_cron_backup:
	crontab -l > newcron
	echo "0 */12 * * * cd /app && make backup" >> newcron
	crontab newcron
	rm newcron

backup:
	/usr/bin/docker-compose exec -T dgraph curl http://localhost:8080/admin/export
	/usr/bin/docker cp -a dgraph_alpha:/dgraph/export/. ./db_dumps
	/usr/bin/docker-compose exec -T dgraph rm -rf export
	find ./db_dumps/* -type d -ctime +2 -exec rm -rf {} \;

backup-ci:
	/usr/bin/docker-compose exec -T dgraph curl http://localhost:8080/admin/export
	/usr/bin/docker cp -a dgraph_alpha:/dgraph/export/. ./db_dumps
	/usr/bin/docker-compose exec -T dgraph rm -rf export

restore:
	FOLDER=$$(ls -t db_dumps | head -1); \
	/usr/bin/docker cp db_dumps/$$FOLDER dgraph_alpha:/dgraph; \
	/usr/bin/docker-compose exec -T dgraph curl -X POST localhost:8080/alter -d '{"drop_all": true}'; \
	/usr/bin/docker-compose exec -T dgraph dgraph live -f $$FOLDER/g01.rdf.gz -s $$FOLDER/g01.schema.gz -a localhost:9080 -z zero:5080

