

 # Desafio Técnico Adois - BeMobile


Projeto criado em Node Adonis, Mysql e Docker com o objetivo de criar rotas para o registro de usuários, clientes, produtos e vendas


## Instalação

### Faça o clone do projeto:

```sh
git clone https://github.com/francescooviedo/bemobile

```
### Abra a pasta do projeto:

```sh
cd bemobile
```

Dentro da pasta copie o arquivo ".env.example" para ".env":
```sh
cp .env.example .env
```

### No terminal rodar o seguinte comando para inicializar o projeto via `Docker`:
```sh
docker-compose up --build -d
```

### Migre e popule o banco com os seguintes comandos:

```sh
docker-compose exec app node ace migration:run
docker-compose exec app node ace db:seed
```
## Documentação da API

#### Rota utilizada para cadastrar um usuário:

```http
  POST /signup
```
Exemplo de resposta:
```bash
{
    {
	"user": {
		"email": "bemobile@test.com",
		"created_at": "2023-11-15T21:32:52.994+00:00",
		"updated_at": "2023-11-15T21:32:52.995+00:00",
		"id": 6
	},
	"token": {
		"type": "bearer",
		"token": "Mg._SkVfwQ5sYXjGHFGHQJpseDc1C5J1oamkV2InaYnqIjqkNLzcy353olQfcYK"
	}
}
}
```

#### Rota utilizada para fazer login com um usuário:

```http
  POST /login
```
Exemplo de resposta:
```bash
{
	"token": {
		"type": "bearer",
		"token": "MQ.2jgF8XMoskOdRPTTRNeRhUHHI3or7MvJ0iEfs5P7wnt4U9UHxUb__cqrFyri"
	}
}
```
A rota /login verifica se o usuário está cadastrado e se a senha está correta. Se tudo estiver correto o login vai retornar para o usuário um token de tipo `bearer` que deverá ser inserido manualmente na sessão de autenticação do seu Rest client, como, `Thunder Client` ou `Insomnia`

## Rotas com autenticação:

#### Rota utilizada para fazer o cadastro de um cliente:

```http
  POST /clients
```
Exemplo de resposta:
```bash
{
	"name": "bemobile test",
	"document": "02004513664",
	"created_at": "2023-11-15T15:29:14.835+00:00",
	"updated_at": "2023-11-15T15:29:14.835+00:00",
	"id": 1
}
```
A rota de criação do cliente verifica se os campos estão preenchidos, se o documento tem 11 digitos, se o nome já existe ou se o documento já existe

#### Rota utilizada para listar todos os clientes cadastrados:

```http
  GET /clients
```
Exemplo de resposta:
```bash
[
	{
		"id": 1,
		"name": "user1",
		"document": "12345678901",
		"created_at": "2023-11-15T18:59:10.000+00:00",
		"updated_at": "2023-11-15T18:59:10.000+00:00"
	},
	{
		"id": 2,
		"name": "testuser",
		"document": "98765432102",
		"created_at": "2023-11-15T18:59:10.000+00:00",
		"updated_at": "2023-11-15T18:59:10.000+00:00"
	},
    ...
 ]
```
#### Rota utilizada para cadastrar o telefone de um cliente:

```http
  POST /phones
```
Exemplo de resposta:
```bash

	{
	"user_id": 1,
	"phone": "31999999999",
	"created_at": "2023-11-15T21:54:41.949+00:00",
	"updated_at": "2023-11-15T21:54:41.949+00:00",
	"id": 6
    }
 
```
A rota de criação de telefone verifica se o usuario existe e se o telefone já foi cadastrado

#### Rota utilizada para cadastrar o endereço de um cliente:

```http
  POST /addresses
```
Exemplo de resposta:
```bash

	{
	"street": "av afonso pena",
	"number": 3330,
	"neighborhood": "cruzeiro",
	"city": "belo horizonte",
	"state": "minas gerais",
	"zip_code": 30190000,
	"user_id": 1,
	"created_at": "2023-11-15T21:58:33.719+00:00",
	"updated_at": "2023-11-15T21:58:33.719+00:00",
	"id": 16
}
```
A rota de criação de endereço verifica se o usuario existe e se os campos estão preenchidos

#### Rota utilizada para cadastrar um novo produto:

```http
  POST /products
```
Exemplo de resposta:
```bash

	{
	"name": "mock product",
	"description": "some description",
	"weight": 10,
	"price": 10,
	"created_at": "2023-11-15T22:00:41.597+00:00",
	"updated_at": "2023-11-15T22:00:41.597+00:00",
	"id": 21
}
```
A rota de criação de produto verifica se o nome ja existe e se os campos estão preenchidos de forma correta

#### Rota utilizada para cadastrar uma nova venda:

```http
  POST /sales
```
Exemplo de requisição:
```bash
{	
  "client_id":1,
  "sale": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 2,
      "quantity": 3
    }
  ]
}
```
A rota verifica se o cliente existe e se os produtos existem, se tudo estiver correto duas tabelas serão preenchidas, `sales`, que contêm o id do cliente e o valor total e `sale_products` que contem o id da venda e cada item que foi vendido.

#### Rota utilizada para encontrar um usuário, listar suas compras e filtra-las por mês e ano:

```http
  get /clients/:id || http://localhost:3333/clients/:id?month=&year=
```
Exemplo de resposta:
```bash
{
	"id": 1,
	"name": "test user",
	"document": "12345678901",
	"phones": [
		{
			"phone": "31987654321"
		},
		{
			"phone": "31999999999"
		}
	],
	"address": {
		"street": "Rua Augusta",
		"number": 123,
		"neighborhood": "Jardins",
		"city": "Sao Paulo",
		"state": "Sao Paulo",
		"zip_code": 12345678
	},
	"sale": [
		{
			"id": 1,
			"total_price": "50.00",
			"created_at": "2023-11-15T18:59:10.000+00:00",
			"product": [
				{
					"id": 1,
					"name": "product1",
					"weight": "15.00",
					"price": "20.00",
					"description": "A high-quality product with advanced features.",
					"created_at": "2023-11-15T18:59:10.000+00:00",
					"updated_at": "2023-11-15T18:59:10.000+00:00"
				},
				{
					"id": 2,
					"name": "product2",
					"weight": "8.00",
					"price": "30.00",
					"description": "Compact and affordable, suitable for everyday use.",
					"created_at": "2023-11-15T18:59:10.000+00:00",
					"updated_at": "2023-11-15T18:59:10.000+00:00"
				}
			]
		}
	]
}
```
A rota verifica se o ano tem 4 digitos e o mes tem 2, ela aceita ano e mês, só um dos dois preenchidos ou os dois vazios. Se a requisição estiver correta, a rota vai buscar um usuário por id podendo filtrar suas compras por mês e ano.

#### Rota utilizada para alterar o cadastro de um cliente:

```http
  PATCH /clients
```
Exemplo de resposta:
```bash
{
	"name": "bemobile test",
	"document": "02004513664",
	"created_at": "2023-11-15T15:29:14.835+00:00",
	"updated_at": "2023-11-15T15:29:14.835+00:00",
	"id": 1
}
```
A rota de atualização do cliente verifica se os campos estão preenchidos, se o documento tem 11 digitos, se o nome já existe ou se o documento já existe. Se tudo estiver correto, um ou mais campos do cliente serão alterados

### Outras rotas:

##
As rotas
```http
  /phones/id
  /addresses/id
  /products/id
  /clients/id
```
possuem métodos GET POST PATCH DELETE

Enquanto a rota /sales/id não possui PATCH ou DELETE
