The purpose of this project is to consume the national weather service's API 
and persist the data in a druid cluster (probably overkill) for practice using druid

There will be a frontend written in a modern style react. To display active weather alerts. probably based on a selected area.

---

# Quickstart

## Run local with docker:
`bash tools/compose up`

view druid dashboard: localhost:8888

zookeeper admin panel: localhost:8080/commands

## Teardown local:
`bash tools/compose down`

---
# stuff

## Port Mappings (default from druid docs)

broker              0.0.0.0:8082->8082/tcp

middlemanager       0.0.0.0:8091->8091/tcp, 0.0.0.0:8100-8105->8100-8105/tcp

router              0.0.0.0:8888->8888/tcp

historical          0.0.0.0:8083->8083/tcp 

coordinator         0.0.0.0:8081->8081/tcp

zookeeper           2888/tcp, 3888/tcp, 0.0.0.0:2181->2181/tcp, 8080/tcp
