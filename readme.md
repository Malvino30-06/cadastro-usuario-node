# Cadastro de Usuários - API REST com Node.js

Este projeto é uma API simples de cadastro de usuários desenvolvida com Node.js e Express. Eu desenvolvi com foco no aprendizado de boas práticas como modularização, uso de middlewares personalizados e implementação de controle de requisições (Rate Limiting).

---

## 🚀 Funcionalidades

- ✅ Cadastro de novos usuários
- ✅ Listagem de usuários cadastrados
- ✅ Middleware inteligente para log de requisições (data, método, rota)
- ✅ Middleware de limitação de requisições por IP (Rate Limiter)

---

## 🛠 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)

---

## ⚙️ Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/Malvino30-06/cadastro-usuario-node.git
```

2. Acesse a pasta do projeto:
```bash
cd cadastro-usuario-node
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor:
```bash
node src/server.js
```

A API estará rodando em: `http://localhost:3000`

---

## 📫 Testando com Insomnia

### 📍 Rota: Cadastrar usuário
- Método: `POST`
- URL: `http://localhost:3000/api/usuarios`
- Body (JSON):
```json
{
  "nome": "Kaique",
  "email": "kaique@example.com"
}
```
### 📍 Rota: Listar usuários
- Método: `GET`
- URL: `http://localhost:3000/api/usuarios`

### 📍 Rota: Atualizar usuários
- Método: `PUT`
- URL: `http://localhost:3000/api/usuarios/:id`

### 📍 Rota: Deletar usuários
- Método: `DELETE`
- URL: `http://localhost:3000/api/usuarios/:id`

---

## 📁 Estrutura de Pastas

```
src/
├── controllers/
│   └── userController.js        # Controlador para gerenciar a lógica de usuários
├── db/
│   └── connection.js            # Configuração e conexão com o banco de dados
├── middleware/
│   ├── rateLimiter.js           # Middleware para limitar requisições por IP
│   └── requestLogger.js         # Middleware para log inteligente de requisições
├── routes/
│   └── userRoutes.js        # Rotas de usuário (cadastro e listagem)
├── app.js                   # Configuração do app e middlewares
└── server.js                # Ponto de entrada da aplicação
```

---

## 🧠 Possíveis Melhorias Futuras

- Integração com banco de dados (MongoDB, PostgreSQL, etc)
- Validação de dados com Joi ou Yup
- Adição de autenticação com JWT
- Testes unitários com Jest ou Supertest

---

## 📄 Licença

Este projeto está sob a licença MIT.
