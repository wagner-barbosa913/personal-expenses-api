# Sistema de Despesas Pessoais (Node.js)

## 1. Descrição do Projeto

Este projeto implementa uma API RESTful para gerenciamento de despesas pessoais, desenvolvida em Node.js. A aplicação permite registrar, listar, atualizar e remover despesas, além de fornecer funcionalidades de resumo e totalização. A arquitetura segue o padrão MVC (Model-View-Controller) para organização do código, utilizando Express.js para as rotas e persistência de dados em memória.

**Objetivo da API:**
- Fornecer uma interface para a gestão de despesas pessoais.
- Demonstrar a implementação de uma API RESTful com Node.js e Express.js.
- Aplicar o padrão de arquitetura MVC.

**Tecnologias Utilizadas:**
- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework web para Node.js, utilizado para construir a API.
- **JavaScript (ES6+)**: Linguagem de programação.

## 2. Como Executar o Projeto

Para executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório (se aplicável) ou navegue até a pasta do projeto:**

    ```bash
    cd personal-expenses-api
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

O servidor estará rodando em `http://localhost:3000`.

## 3. Rotas da API

A API disponibiliza as seguintes rotas:

| Método | Rota                          | Descrição                                         |
| :----- | :---------------------------- | :------------------------------------------------ |
| `POST`   | `/expenses`                   | Cria uma nova despesa                             |
| `GET`    | `/expenses`                   | Lista todas as despesas (com filtros opcionais)   |
| `GET`    | `/expenses/:id`               | Busca uma despesa específica pelo ID              |
| `PUT`    | `/expenses/:id`               | Atualiza uma despesa existente pelo ID            |
| `DELETE` | `/expenses/:id`               | Remove uma despesa existente pelo ID              |
| `GET`    | `/expenses/summary/total`     | Retorna o valor total de todas as despesas        |
| `GET`    | `/expenses/summary/category`  | Retorna o total das despesas agrupado por categoria |

## 4. Modelo de Dados

A entidade principal da API é a **Despesa** (`Expense`), com a seguinte estrutura:

| Campo       | Tipo     | Descrição                               |
| :---------- | :------- | :-------------------------------------- |
| `id`        | `string` | Identificador único da despesa (gerado automaticamente) |
| `title`     | `string` | Título/nome da despesa (obrigatório)    |
| `amount`    | `number` | Valor da despesa (deve ser maior que zero) |
| `category`  | `string` | Categoria da despesa                    |
| `date`      | `string` | Data da despesa (formato `YYYY-MM-DD`, não pode ser no futuro) |
| `description` | `string` | Descrição opcional da despesa           |
| `createdAt` | `string` | Data e hora de criação da despesa (ISO 8601) |

## 5. Exemplos de Requisições (com `curl`)

### 5.1. Criar Despesa (`POST /expenses`)

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "Almoço", "amount": 35.75, "category": "Alimentação", "date": "2026-05-01", "description": "Almoço no restaurante"}' http://localhost:3000/expenses
```

### 5.2. Listar Todas as Despesas (`GET /expenses`)

```bash
curl http://localhost:3000/expenses
```

### 5.3. Listar Despesas por Categoria (`GET /expenses?category=Alimentação`)

```bash
curl "http://localhost:3000/expenses?category=Alimentação"
```

### 5.4. Listar Despesas por Data (`GET /expenses?date=2026-05-01`)

```bash
curl "http://localhost:3000/expenses?date=2026-05-01"
```

### 5.5. Buscar Despesa por ID (`GET /expenses/:id`)

(Assumindo que `exp_1` é um ID válido)

```bash
curl http://localhost:3000/expenses/exp_1
```

### 5.6. Atualizar Despesa (`PUT /expenses/:id`)

(Assumindo que `exp_1` é um ID válido)

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"amount": 40.00, "description": "Almoço com colega"}' http://localhost:3000/expenses/exp_1
```

### 5.7. Remover Despesa (`DELETE /expenses/:id`)

(Assumindo que `exp_1` é um ID válido)

```bash
curl -X DELETE http://localhost:3000/expenses/exp_1
```

### 5.8. Total de Despesas (`GET /expenses/summary/total`)

```bash
curl http://localhost:3000/expenses/summary/total
```

### 5.9. Total de Despesas por Categoria (`GET /expenses/summary/category`)

```bash
curl http://localhost:3000/expenses/summary/category
```
