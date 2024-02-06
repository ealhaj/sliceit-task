# Auth & Quote API

### Required Environment:
To run this application, you need to have the following software installed on your machine:
- Node.js (version 18 or higher)
- Yarn
- Docker

### Run Postgres Database:
1. **Execute the docker command to install the latest postgres image** (You will need docker desktop to be installed.)
    ```
    docker run --publish 5432:5432 --name postgres -e POSTGRES_PASSWORD=<password> -d postgres
    ```

### Installation:
1. **Install dependencies using Yarn**
    ```bash
    yarn install
2. **Start the server on the port 3000**
    ```bash
    yarn start
3. **Run the database migrations** (You will need postgres database running and configure ENV variables within the `.env` file)
    ```
    yarn migrations:run
    ```