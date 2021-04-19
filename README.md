![typext_cover](https://user-images.githubusercontent.com/56441371/112768034-52dbed80-8ff0-11eb-8a72-5190c56f1090.png)

## Requisitos necessários para o funcionamento do software

- Para executar o projeto será necessário a instalação do **NodeJS** e **Docker**.

### Instalação do NodeJS Linux

- Execute os comandos abaixo no terminal:

**Ubuntu**
```bash
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Debian, as root**
```bash
curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs
```

### Instalação do NodeJS Windows

- Acesse o site do [NodeJS](https://nodejs.org/en/) e baixe a versão LTS:

![image](https://user-images.githubusercontent.com/56441371/112771142-d7366c80-9000-11eb-93e4-5a7bcbcb232f.png)


### Instalação do Docker 

- Para instalar o Docker Engine, acesse o site do [Docker](https://docs.docker.com/engine/install) e escolha a distribuição da sua preferência. 
- Siga todos os passos listados.
- Por fim, para que não precise utilizar o sudo, execute os comandos presentes [nessa página](https://docs.docker.com/engine/install/linux-postinstall).


### Container Docker

- Agora deve-se criar um container com a imagem do PostgreSQL, executando:

```bash
# No lugar de your-password adicione a senha que desejar

docker run --name postgres -e POSTGRES_PASSWORD=your-password -e POSTGRES_DB=typext -p 5432:5432 -d postgres
```

- Neste momento seu container desse estar executando. Para confirmar execute:

```bash
docker ps
```

- Caso não tenha iniciado, execute:

```bash
docker start postgres
```

- E para parar o container, execute:

```bash
docker stop postgres
```


### Iniciando a aplicação

- Após fazer o clone do projeto, execute ```yarn``` ou ```npm install``` para instalar todas as dependências necessárias para que o projeto funcione.
- Agora os arquivos com variaǘeis ambiente (*.env*) e de conexão com o banco de dados (*ormconfig.json*) devem ser criados na raiz do projeto, dessa forma:

![image](https://user-images.githubusercontent.com/57918707/115161576-f01cc580-a074-11eb-89b4-6e52f54c5dd5.png)


- Adicione o seguinte conteúdo em cada um deles:

**.env**
```env
# Application
APP_SECRET=typext

APP_WEB_URL=http://localhost:3000
APP_API_URL=http://localhost:3333

#Mail
MAIL_DRIVER=ethereal
```

**ormconfig.json**
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "your-password",
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

- Feito isso, as migrations precisarão ser executadas para que as tabelas sejam criadas no banco de dados. Para isso, utilize o comando abaixo:

```bash
yarn typeorm migration:run

# ou

npm typeorm migration:run
```

- Para a criação do primeiro usuário será necessário rodar o comando:

```
npm run seed:admin 

# ou 

yarn seed:admin
```

> Esse usuário tem os valores defalt: 

> email: **admin@typext.com.br**

> password: **admin**


- Neste momento o servidor pode ser iniciado com o comando:
```bash
yarn dev:server

# ou

npm run dev:server
```

- A seguinte mensagem mostra que o servidor foi iniciado:

![image](https://user-images.githubusercontent.com/57918707/115161682-70dbc180-a075-11eb-9f8c-53460f053067.png)

### Testando a aplicação

- Para executar os testes, utilize o comando abaixo:

```bash
yarn test

# ou

npm test
```

O seguinte relatório aparecerá no terminal:

![image](https://user-images.githubusercontent.com/57918707/115161751-c7e19680-a075-11eb-8a46-3642e9885664.png)
