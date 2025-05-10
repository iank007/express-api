import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import { Sequelize } from 'sequelize'; // ORM

const host = process.env.DB_HOST || 'localhost'
const port = process.env.DB_PORT || 3306
const user = process.env.DB_USER || 'root'
const password = process.env.DB_PASS || ''
const database = process.env.DB_NAME || 'tugas7'

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  port: port,
});

export default sequelize;
