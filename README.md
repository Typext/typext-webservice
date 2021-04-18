![typext_cover](https://user-images.githubusercontent.com/56441371/112768034-52dbed80-8ff0-11eb-8a72-5190c56f1090.png)

As principais ferramentas e tecnologias que utilizamos para desenvolver o back-end do projeto foram

- TypeScript
- Express
- Typeorm
- Postgres
- Docker

### Como rodar o desafio

Após clonar o repositório será necessário criar um arquivo com o nome **.env** e dentro desse arquivo colocar as seguintes informações:

```
# Application
APP_SECRET=a78df09a8jad09d0am

APP_WEB_URL=http://localhost:3000
APP_API_URL=http://localhost:3333

#Mail
MAIL_DRIVER=ethereal
```

Também será necessário um criar um arquivo com o nome **ormconfig.json** e dentro desse arquivo colocar as seguintes informações:

```
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "typext",
  "database": "typext",
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
```

Em seguida será necessário criar uma database no postgres, caso queira usar o Docker o comando é:

```docker run --name typext -e POSTGRES_PASSWORD=typext -p 5432:5432 -d postgres```

Assim o container do docker estará criado, porém ainda será preciso criar a database, para isso insira o comando:

```docker exec -it typext psql -U postgres --password```

Insira a senha ```typext``` e crie a database com o comando ```create database typext;```

Assim o seu banco de dados com o docker estará configurado para o projeto, insira ```\q``` para sair

Feito isso será necessário instalar as dependências do projeto com o comando:

```npm install``` ou ```yarn```

Agora precisamos rodar as migration utilizando o typeorm com o comando:

```npm run typeorm migration:run``` ou ```yarn typeorm migration:run```

Feito tudo isso já podemos rodar o nosso projeto com o comando:

```npm run dev:server``` ou ```yarn dev:server```

Com o servidor rodando é possível acessar a documentação no navegador com a url http://localhost:3333/api-docs
