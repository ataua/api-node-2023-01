# MENU
- [INTRODUÇÃO](#desafio-*******-2023)  
- [INSTALAÇÃO](#instalando-e-rodando-o-projeto)  
  - [UTILIZANDO O DOCKER](#utilizando-o-docker)  
  - [UTILIZAÇÃO SEM O DOCKER](#utilização-sem-o-docker)  
  - [INSTALANDO AS DEPENDÊNCIA](#instalando-as-dependências)
- [ENDPOINTS](#endpoints)  
- [TRATAMENTO DE ERROS](#tratamento-de-erros-e-excessões)  

<a href="#menu" style="padding:.6rem 1.5rem;background:palegoldenrod;border-radius:6px;position:fixed;bottom:2rem;right:2rem;z-index:500;">Menu</a>

---
# DESAFIO testetecnico 2023
Olá. Eu sou o Atauã, e este projeto é uma solução de um teste ténico para a vaga de desenvolvedor back-end na empresa *******.  
Como era um teste técnico que pode ser utilizado por outros candidatos, por uma questão de sigilo, tentei retirar qualquer informação sobre a empresa ou que remetesse aos requisitos do teste. Se você encontrar alguma informação que tenha passado, por favor me avise.

---
# INSTALANDO E RODANDO O PROJETO:

## UTILIZANDO O DOCKER
Como solução de banco de dados, foi escolhido o Postgres; inicialmente, fiz os testes em um ambiente na nuvem chamado [ElephantSQL](https://api.elephantsql.com/), mas fiquei imaginando uma forma de permitir que qualquer pessoa instalasse o projeto independente de serviços externos. Para esse fim, decidi utilizar o Docker.  
Por meio do Docker, é possível criar um banco de dados localmente, isolado dos demais ambientes, exclusivo para esse projeto, e facilmente descartável, uma vez que se trata apenas de um teste.
Caso seja necessário instalar o Docker, siga as instruções na [documentação oficial](https://docs.docker.com/engine/install/)  
Uma vez instalado o Docker, inicie o conteiner do banco de dados com o comando:

```bash
docker compose up
```
Você deve rodar esse comando em um terminal a partir da pasta <span style="text-decoration:line-through">`/desafio`</span> raiz do projeto.  
Para parar o container, digite `CTRL+C` ou `CMD+C`. Quando for deletar o projeto, digite o comando para deletar os container:  
```bash
docker compose down -v --rmi all
```
Isso irá deletar todos os dados criados pelo Docker para esse projeto.

Se quiser acessar o banco de dados através de um GUI, acesse o Adminer no endereço `localhost:8080` em um navegador, com as seguintes configurações:  
- Sistema: **PostgreSQL**
- servidor: **db_pg**
- Usuário: **postgres**
- Senha: **postgres**
- Base de dados: **postgres**

---
## UTILIZAÇÃO SEM O DOCKER
Caso não possa ou não queira utilizar o Docker, é preciso rodar uma instância local do Postgres. Se precisar instalá-lo, siga as instruções no [site oficial](https://www.postgresql.org/download/). Caso contrário, pode pular para o próximo tópico.  
Nesse caso, seguem as configurações para rodar o Postgres localmente, considerando o nome do banco de dados como `postgres` e usuário e senha `postgres`.  
Em um terminal, digite:
```bash
psql -U postgres -w

# OBS.: o 'U' é maiúsculo!
```

Será solicitado o password. Digite: **postgres**, tudo em minúsculas.  
Em seguida, digite o seguinte comando:

```postgres
create database postgres;
```

Não esqueça do ponto-e-vírgula!  
Se der certo, não haverá mensagem alguma. Se houver uma mensagem de erro indicando que a database já existe, está tudo bem.  
Para conferir se deu certo, digite `\l`.  
Na lista que irá aparecer, deve constar a database com o nome **postgres**.  
Parta sair, digite `exit` ou `CTRL+D`. 

## INSTALANDO AS DEPENDÊNCIAS
Se estiver com o Docker rodando em um terminal, abra outro terminal e digite os comandos abaixo:
```json
npm install
```

Quando acabar, basta iniciar o projeto:

```json
npm start
```

Pronto! Se tudo der certo, nossa API está rodando em `localhost:3000/api/v1/`, conectada ao Postgres na porta `5432`.  

---
# ENDPOINTS
A seguir, estão listados os endpoints solicitados no teste, com a url e o payload esperado com dados de exemplo.  
Junto ao projeto, há uma arquivo chamado `requests.http`, que é utilizado para testar os endpoints pelo VSCode, por meio doa extensão Rest Client, disponível no link [https://marketplace.visualstudio.com/items?itemName=humao.rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).  
Não sei dizer se esse tipo de arquivo tem suporte em outras IDEs ou se pode ser útil em outros ambientes.

- Criar um projeto 

```json
POST http://localhost:3000/api/v1/projeto
Content-Type: application/json

{
    "nome": "Um primeiro projeto",
    "descricao": "Descrição do primeiro projeto"
}
```

Response:  

```json
HTTP/1.1 201 Created

{
    "data": {
        "projetoId": 9,
        "nome": "Um primeiro projeto",
        "descricao": "Descrição do primeiro projeto",
        "updatedAt": "2023-03-10T13:16:13.176Z",
        "createdAt": "2023-03-10T13:16:13.176Z"
    }
}
```

Obs.: O parâmetro 'nome' foi definido como único. Ao tentar enviar uma requisição com um nome existente, será retornada uma mensagem de erro:

```json
HTTP/1.1 400 Bad Request
...

{
    "error": "There is already a project with the name 'Um primeiro projeto'"
}
```
- Listar todos os projetos  

```httpjson
GET http://localhost:3000/api/v1/projeto
```

Response:

```json
HTTP/1.1 200 OK
...

{
  "data": [
    {
      "projetoId": 1,
      "nome": "Projeto Teste 1",
      "descricao": "Projeto de teste para avaliação da API, etc...",
      "createdAt": "2023-03-09T19:26:35.128Z",
      "updatedAt": "2023-03-09T19:26:35.128Z"
    },
    (...)
  ]
}
```

- Listar um único projeto  

```json
GET http://localhost:3000/api/v1/projeto/:id
```

Response:

```json
HTTP/1.1 200 OK
...

{
  "data": {
    "projetoId": 3,
    "nome": "Projeto com nome alterado",
    "descricao": "Projeto de teste para avaliação da API, etc...",
    "createdAt": "2023-03-09T19:28:00.387Z",
    "updatedAt": "2023-03-09T19:28:00.387Z"
  }
}
```

- Editar projeto  

```json
PATCH http://localhost:3000/api/v1/projeto
Content-Type: application/json

{
    "projetoId": 3,
    "nome": "Nome de projeto alterado"
}
```

Response:

```json
HTTP/1.1 200 OK
...

{
  "data": {
    "projetoId": 3,
    "nome": "Nome de projeto alterado",
    "descricao": "Projeto de teste para avaliação da API, etc...",
    "createdAt": "2023-03-09T19:28:00.387Z",
    "updatedAt": "2023-03-10T13:29:40.744Z"
  }
}
```

- Deletar projeto, assim como todas as suas tarefas  

```json
    DELETE http://localhost:3000/api/v1/projeto/10
```

Response:

```json
HTTP/1.1 200 OK
...

{
  "data": {
    "projetoId": 10,
    "nome": "Um primeiro projeto 2",
    "descricao": "Descrição do primeiro projeto",
    "createdAt": "2023-03-10T13:20:23.381Z",
    "updatedAt": "2023-03-10T13:20:23.381Z"
  }
}
```

Normalmente, a opção DELETE não retorna nenhum dado. Optei por retornar o objeto do elemento deleteado, tanto para conferência do resultado, quanto para disponibilizar o recurso para o caso de ser utilizado em outro ambiente.  

- Adicionar tarefa a um projeto  

```json
POST http://localhost:3000/api/v1/tarefa
Content-Type: application/json

{
    "projetoId": 9,
    "descricao": "Uma tarefa maneira",
    "dataLimite": "05/13/2023",
    "status": "aguardando"
}
```

Response:

```json
HTTP/1.1 201 Created

{
  "data": {
    "tarefaId": 6,
    "projetoId": 9,
    "descricao": "Uma tarefa maneira",
    "dataLimite": "2023-05-13",
    "status": "aguardando",
    "updatedAt": "2023-03-10T13:36:09.387Z",
    "createdAt": "2023-03-10T13:36:09.387Z"
  }
}
```

- Listar tarefas de um projeto  

```json

GET http://localhost:3000/api/v1/projeto/9/tarefa
```

Response:

```json
HTTP/1.1 200 OK
...

{
  "data": [
    {
      "tarefaId": 5,
      "descricao": "Descrição da tarefa",
      "dataLimite": "2023-05-13",
      "status": "aguardando",
      "projetoId": 9,
      "createdAt": "2023-03-10T13:35:36.028Z",
      "updatedAt": "2023-03-10T13:35:36.028Z"
    },
    (...)
  ]
}
```
- Editar tarefa  
As opções válidas para o compo `status` são: **"aguardando", "executando", "concluída", "cancelada"**.

```json

PATCH http://localhost:3000/api/v1/tarefas
Content-Type:  application/json

{
    "tarefaId": 5,
    "status": "concluída"
}
```


Response:

```json
HTTP/1.1 200 OK
...

{
  "data": {
    "tarefaId": 5,
    "descricao": "Descrição da tarefa",
    "dataLimite": "2023-05-13",
    "status": "concluída",
    "projetoId": 9,
    "createdAt": "2023-03-10T13:35:36.028Z",
    "updatedAt": "2023-03-10T13:44:30.311Z"
  }
}
```

- Deletar tarefa  

```json
DELETE http://localhost:3000/api/v1/tarefas/6
```

Response:

```json
HTTP/1.1 200 OK
...

{
  "data": {
    "tarefaId": 6,
    "descricao": "Uma tarefa maneira",
    "dataLimite": "2023-05-13",
    "status": "aguardando",
    "projetoId": 9,
    "createdAt": "2023-03-10T13:36:09.387Z",
    "updatedAt": "2023-03-10T13:36:09.387Z"
  }
}
```

---
# TRATAMENTO DE ERROS E EXCESSÕES  
Os erros gerados nas requisições, referentes a falhas na aplicação ou na rede, são tratados pelo Express, retornando apenas uma mensagem de erro nas respostas das requisições, sempre com o status 400 -- o que não é o ideal, mas foi uma forma genérica e rápida de tratar os erros nesse projeto.  
Os erros referentes ao conteúdo das requisições foram tratados da seguinte forma:  

1. Criação de novo projeto com nome já utilizado em outro projeto:

```json
HTTP/1.1 400 Bad Request
...

{
    "error": "There is already a project with the name 'Um primeiro projeto'"
}
```

2. Criação de projeto sem parâmetro obrigatório (nome):

```json
HTTP/1.1 400 Bad Request
...

{
  "error": "Please provide all parameters: 'nome' and 'descricao'."
}
```

3. Atualização de projeto sem projetoId:

```json
HTTP/1.1 400 Bad Request
...

{
  "error": "Parameter 'projetoId' is mandatory."
}
```

4. Alteração de projeto sem envio dos parâmetros 'nome' e 'descrição':

```json
HTTP/1.1 400 Bad Request
...

{
  "error": "No data was provided for update. The accepted parameters are: 'nome' or 'descricao'. Both are optional, but you must provide at least one of them."
}
```

5. Criação de tarefa sem parâmetro obrigatório (projetoId):
```json
HTTP/1.1 400 Bad Request
...

{
  "error": "Please provide all parameters: 'projetoId', 'descricao', 'dataLimite' and 'status'"
}
```

6. Alteração de tarefa sem algum parâmetro obrigatório:

```json
HTTP/1.1 400 Bad Request
...

{
  "error": "No data was provided for update. The accepted parameters are: 'descricao', 'dataLimite', 'status' or 'projetoId'. All are optional, but you must provide at least one of them."
}
```