Task Management App with Express
Este é um API construída com Node.js, Typescript, Express, Prisma, Swagger e JWT para gerenciamento de tarefas.
LINK DA API https://github.com/satinP/express-todo-list

Entidades
Tarefa
Atributos: ID, title, description.
Inicialização
Configure seu ambiente criando um arquivo .env (você pode copiar o conteúdo de .env.example e colá-lo no novo arquivo).
Rode o comando npm i.
Certifique-se de que o Docker está em execução e execute npm run setup no terminal.
Para iniciar a aplicação, execute npm run start.
Para acessar a documentação da API, acesse http://localhost:3000/api.
Acessar banco de dados
É possível verificar os dados salvos no banco através do Terminal do container docker, basta acessar o terminal do container "express-todo-list-db-*" e rodar os comandos:

psql -d taskdb -U admin para acessar o banco de dados. OBS: devem estar de acordo com o configurado no .env
select * from public."Task"; para acessar os dados salvos no banco Task
Rotas
Tarefas (Tasks)
POST /tasks

Cria uma nova tarefa.
GET /tasks

Retorna todas as tarefas.
GET /tasks/longest-description

Retorna a tarefa com a maior descrição.
GET /tasks/average-conclusion

Retorna a média de conclusão das tarefas.
GET /tasks/id

Retorna uma tarefa por ID.
PATCH /tasks/id

Atualiza uma tarefa por ID.
DELETE /tasks/id

Deleta uma tarefa por ID.