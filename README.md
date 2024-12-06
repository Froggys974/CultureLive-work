# Rental Culture Live

Welcome to the Rental Culture Live application! This guide will help you set up and run the application using Docker Compose or npm.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/) (if you plan to run the app without Docker)
- [PostgreSQL](https://www.postgresql.org/download/) (if you plan to run the app without Docker)

## Getting Started

### Running with Docker Compose

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Froggys974/CultureLive-work.git
    cd CultureLive-work
    ```

2.  **Create and configure environment variables**:

        Create a `.env` file in the root directory and add the following variables (look in .env.example):

    ```env

    NODE_ENV=dev
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    ```

3.  **Build and start the Docker containers**:

    ```bash
    docker-compose up -d
    ```

    This will start the application, PostgreSQL, and Adminer. The PostgreSQL container will initialize the database and insert data from the provided SQL files.

4.  **Wait for the data insertion to complete**:

    The data insertion process might take a few minutes. You can check the logs to see when it's done:

    ```bash
    docker-compose logs -f database
    ```

5.  **Restart the Docker containers**:

    Once the data insertion is complete, restart the Docker containers to ensure everything is set up correctly:

    ```bash
    docker-compose down
    docker-compose up -d
    ```

6.  **Access the application**:

    - **Application**: [http://localhost:3000](http://localhost:3000)
    - **Adminer**: 808[http://localhost:0](http://localhost:8080)

    Use the following credentials to log in to Adminer:

    - **System**: PostgreSQL
    - **Server**: `postgres_db`
    - **Username**: `YourUserName`
    - **Password**: `YourPassWord`
    - **Database**: `rentalCultureLive`

### Running with npm

1. **Clone the repository**:

   ```bash
    git clone https://github.com/Froggys974/CultureLive-work.git
    cd CultureLive-work
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create and configure environment variables**:

   Create a `.env` file in the root directory and add the following variables (look in .env.example):

    ```env

    NODE_ENV=dev
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    DB_HOST=your_db_host
    DB_PORT=your_db_port
   ```

4. **Ensure PostgreSQL is running**:

   Make sure PostgreSQL is installed and running on your machine. Create the database if it doesn't exist and add data:

   ```bash
   psql -U postgres -c "CREATE DATABASE rentalCultureLive;"
   psql -U postgres -d rentalCultureLive -f dbDataFile/postgres-sakila-schema.sql
   ```

5. **Run the application**:

   ```bash
   npm run start:dev
   ```

6. **Access the application**:

   - **Application**: [http://localhost:3000](http://localhost:3000)

## Additional Resources

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

---

Thank you for using Rental Culture Live! We hope this guide helps you get started quickly. If you have any questions or run into any issues, feel free to reach out to our support channels.
