# Deploy de Microsserviços com Kubernetes

Projeto desenvolvido em meu canal do YouTube (Comics &amp; Code) sobre deploy de microsserviços utilizando Docker e Kubernetes

## Tecnologias

* Node.js 14
* REST API
* Docker
* Kubernetes
* MiniKube
* MongoDB

## Execução

É possível executar localmente, ou executar tudo via container Docker, ou também via Kubernetes.

### Executando APIs localmente

Basta executar `yarn install` para instalar as dependências, e `yarn start` para rodar a aplicação.

### Comandos Docker

`docker network create storage-nw`

`docker image build -t vhnegrisoli/storage-api .`

`docker image build -t vhnegrisoli/gateway-api .`

`docker container run --name gateway-api --network storage-nw -p 8080:8080 -e STORAGE_URL="http://storage-api:8081/api/storage" vhnegrisoli/gateway-api`

`docker container run --name storage-api --network storage-nw -p 8081:8081 -e MONGO_DB_URL="mongodb://admin:123456@storage-db:27017" vhnegrisoli/storage-api`

`docker container run --name storage-db --network storage-nw -p 27017:27017 -p 28017:28017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123456 mongo:latest`

`docker push user/image`

### Comandos Kubernetes

`minikube start / stop`

`kubectl apply -f arquivo.yml`

```shell
kubectl .\kubernetes\namespace\
kubectl .\kubernetes\config-maps\
kubectl .\kubernetes\deplyoments\
kubectl .\kubernetes\services\
```

#### Setando o contexto do Kubernetes para o namespace criado

`kubectl config set-context --current --namespace storage-ns`

`kubectl autoscale deployment gateway-api-dp --cpu-percent=50 --min=6 --max=10`

`kubectl logs pod_id`

`kubectl port-forward svc/gateway-api-svc 30080:8080`

### Autor

* Victor Hugo Negrisoli
* Desenvolvedor de Software Back-End
