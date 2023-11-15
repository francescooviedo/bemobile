# Sistema de Gerenciamento

## Autenticação de Usuário

### Cadastro de Usuário (Signup)
- [x] Endpoint: `/signup`

### Login com JWT de Usuário Cadastrado (Login)
- [x] Endpoint: `/login`

## Clientes

### Listar Todos os Clientes Cadastrados (Index)
- [x] Endpoint: `/clientes`
- [x] Retorna: Apenas dados principais ordenados pelo ID.

### Detalhar um Cliente e Suas Vendas (Show)
- [x] Endpoint: `/clientes/{id}`
- [x] Retorna: Detalhes do cliente e vendas, ordenadas pelas mais recentes. Possibilidade de filtrar vendas por mês e ano.

### Adicionar um Cliente (Store)
- [x] Endpoint: `/clientes`
- [x] Método: `POST`

### Editar um Cliente (Update)
- [x] Endpoint: `/clientes/{id}`
- [x] Método: `PUT`

### Excluir um Cliente e Suas Vendas (Delete)
- [x] Endpoint: `/clientes/{id}`
- [x] Método: `DELETE`

## Produtos

### Listar Todos os Produtos Cadastrados (Index)
- [x] Endpoint: `/produtos`
- [x] Retorna: Apenas dados principais ordenados alfabeticamente.

### Detalhar um Produto (Show)
- [x] Endpoint: `/produtos/{id}`

### Criar um Produto (Store)
- [x] Endpoint: `/produtos`
- [x] Método: `POST`

### Editar um Produto (Update)
- [x] Endpoint: `/produtos/{id}`
- [x] Método: `PUT`

### Exclusão Lógica de um Produto (Delete)
- [x] Endpoint: `/produtos/{id}`
- [x] Método: `DELETE`

## Vendas

### Registrar Venda de 1 Produto a 1 Cliente (Store)
- [x] Endpoint: `/vendas`
- [x] Método: `POST`
