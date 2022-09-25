# Deploy de Microsserviços com Kubernetes

Projeto desenvolvido em meu canal no YouTube chamado [Comics & Code](https://www.youtube.com/channel/UCtDl5evCzPavgyFz7EQ80Gg) sobre deploy de microsserviços utilizando Docker e Kubernetes.

O Comics & Code que trata sobre:

* Quadrinhos/HQs
* Filmes e super-heróis
* Análises, críticas, guias, dicas e recomendações de leituras e materiais
* Programação (Java, Javascript, Python, Node, etc)
* Desenvolvimento de projetos e tutoriais

![Logo Canal](https://github.com/vhnegrisoli/microsservicos-kubernetes/blob/master/Comics%20%26%20Code.png)

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

### Endpoint para teste

O endpoint para teste será no projeto `gateway-api`, na seguinte configuração:

**POST -> http://localhost:8080/api/data**

Body:

```json
{
    "status": 200,
    "data": "Comics!",
    "originService": "gateway-api"
}
```

Headers:

```
tracing: QUALQUER_INFORMACAO
```

Exemplo de resposta:

```json
{
    "status": 200,
    "data": {
        "status": 200,
        "response": {
            "data": "Comics!",
            "status": 200,
            "originService": "gateway-api",
            "currentService": "storage-api",
            "createdAt": "2022-09-25T22:04:11.923Z",
            "_id": "6330d05b3377d74a32cd75d5",
            "__v": 0
        }
    }
}
```

### Autor

* Victor Hugo Negrisoli
* Desenvolvedor de Software Back-End
