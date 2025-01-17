# Pokemon Project

This project is a frontend application built with React.js to display various information related to Pokémon. It allows users to view data about Pokémon, their attributes, and stats.

## Hosted on the website :
  link: https://Thirisha12.github.io/Pokemo

## Tech Stack

- **Frontend**:
  - **React.js**: JavaScript library for building user interfaces.
  - **Axios**: For making HTTP requests to fetch Pokémon data.
  - **gh-pages**: For deploying the app to GitHub Pages.

- **Development Tools**:
  - **Node.js**: JavaScript runtime for building and running the app.
  - **npm**: Package manager to install dependencies and run scripts.

## Pre-requisite

Before running the application locally, ensure you have the following installed on your system:

1. **Node.js** (version 14 or higher) - Install from [Node.js official website](https://nodejs.org/).
2. **npm** - Comes installed with Node.js. You can verify the installation by running `npm -v` in your terminal.

## Migration & Seed Database Steps

- **Note**: This app fetches Pokémon data from an external API or static files. If you are using a backend server or a database, you would follow these steps:

  1. **Database Migration**:
     - Create the necessary tables using migrations (this applies if you have a backend API with a database).
     - You can use any migration tool for your backend setup (e.g., Sequelize, TypeORM, or Knex for Node.js backend).
  
  2. **Seed Database**:
     - Populate your database with initial data, such as Pokémon data, using seed scripts or manual insertion.

    Example:
    ```bash
    npx sequelize-cli db:migrate   # Example for Sequelize migrations
    npx sequelize-cli db:seed:all  # Example for Sequelize seed data
    ```

    **Note**: If you're fetching data from an external API, this step may not be needed.

## Running the App

### Setup Instructions:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/thirisha12/Pokemo.git
    cd Pokemo
    ```

2. **Navigate to the frontend directory**:

    ```bash
    cd frontend
    ```

3. **Install dependencies**:

    Run the following command to install the required dependencies:

    ```bash
    npm install
    ```

4. **Run the app locally**:

    Start the app in development mode:

    ```bash
    npm start
    ```

    This will start the development server, and you can open the app in your browser by visiting:

    ```
    http://localhost:3000
    ```

### Deployment

To deploy the app to GitHub Pages, run:

```bash
npm run deploy
