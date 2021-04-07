# Imersão Full Cycle Desafio 1 - One piece

> Status do Projeto: Concluido :heavy_check_mark:

![One Piece](assets/monkeydluffy.jpg)

Fazer uma imagem que suba um webserver em GO na porta 8000 e fazer o push dessa imagem no Dockerhub.

## Subir o container pelo dockerhub
```sudo docker run --rm -p 8000:8000 souzarodrigo/go-web-onepiece```
## Subir o container localmente
#### Builde a imagem
```sudo docker build . -t go-web-onepiece```
#### Suba o container
```sudo docker run --rm --name imersao -p 8000:8000 go-web-onepiece:latest```


### Participante:
|Nome|Email|Curso|
| -------- | -------- | -------- |
|Rodrigo Santos|souza.rodrigo61@gmail.com|Imersão Full Cycle

[<img src="https://avatars.githubusercontent.com/u/31740435?v=4&v=" width=115 > <br> <sub> rodrigo Santos </sub>](https://github.com/Diana-ops) |
| :---: | 

