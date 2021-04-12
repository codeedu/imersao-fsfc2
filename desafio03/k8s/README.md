# Trabalhando com kubernetes localmente

### Primeiro, é necessário ter um cluster rodando
`kind create cluster --name nest-react`


### Subir o backend
```
kubectl apply -f nest-api/deploy.yml
kubectl expose -f nest-api/deploy.yml
kubectl port-forward service/nest-api 3000
```

### Subir o frontend
```
kubectl apply -f react-app/deploy.yml
kubectl expose -f react-app/deploy.yml
kubectl port-forward service/react-app 3001:3000
```

Para acessar a aplicação(frontend) acesse http://localhost:3001
Para acessar a aplicação(backend) acesse http://localhost:3000/routes

### Para ver os pods
`kubectl get pods`

### Para ver os services
`kubectl get svc`

### Para remover o cluster
`kind delete cluster --name nest-react`