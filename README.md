# 📝 API Task

API REST para gerenciamento de **usuários** e **tarefas**, construída com **NestJS** e **Prisma ORM**.  
Ideal para aprender e praticar arquitetura limpa, serviços e repositórios usando TypeScript.

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) — Framework Node.js para construir APIs escaláveis
- [Prisma](https://www.prisma.io/) — ORM para banco de dados
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática para JavaScript
- [Node.js](https://nodejs.org/) — Ambiente de execução
- [PostgreSQL] — Banco de dados (dependendo de como está configurado no `schema.prisma`)

---

---

## ⚙️ Instalação e Uso

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/api-task.git
cd api-task

# 2. Instale as dependências
npm install

# 3. Configure o banco de dados no .env
cp .env.example .env
# Ajuste DATABASE_URL no arquivo .env

# 4. Execute as migrações
npx prisma migrate dev

# 5. Inicie a aplicação
npm run start:dev

A API estará disponível em:
👉 http://localhost:3000

📌 Endpoints
👤 Usuários

| Método | Rota         | Descrição               |
| ------ | ------------ | ----------------------- |
| GET    | `/users`     | Lista todos os usuários |
| GET    | `/users/:id` | Busca um usuário por ID |
| POST   | `/users`     | Cria um novo usuário    |
| PATCH  | `/users/:id` | Atualiza um usuário     |
| DELETE | `/users/:id` | Deleta um usuário       |

✅ Tasks

| Método | Rota         | Descrição             |
| ------ | ------------ | --------------------- |
| GET    | `/tasks`     | Lista todas as tasks  |
| GET    | `/tasks/:id` | Busca uma task por ID |
| POST   | `/tasks`     | Cria uma nova task    |
| PATCH  | `/tasks/:id` | Atualiza uma task     |
| DELETE | `/tasks/:id` | Deleta uma task       |

🧪 Exemplos de Requisição

POST /users
Content-Type: application/json
{
  "name": "Adriano",
  "email": "adriano@example.com"
}

- Resposta

{
  "id": "clx1234567890",
  "name": "Adriano",
  "email": "adriano@example.com",
  "createdAt": "2025-09-25T14:20:30.000Z"
}

🛠️ Scripts

| Comando             | Descrição                         |
| ------------------- | --------------------------------- |
| `npm run start`     | Inicia a aplicação em modo normal |
| `npm run start:dev` | Inicia em modo desenvolvimento    |
| `npx prisma studio` | Abre interface do Prisma Studio   |

