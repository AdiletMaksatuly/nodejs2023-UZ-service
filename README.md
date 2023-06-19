# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## How to start application

1. Clone the repository

```
git clone https://github.com/AdiletMaksatuly/nodejs2023-UZ-service.git
```

2. Go to repo directory

```
cd nodejs2023-UZ-service
```

3. Rename .env.example file to .env
4. Run docker with docker-compose

```
docker-compose up -d
```

5. Run tests to check if everything is working

```
npm run test
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
