import { Sequelize } from 'sequelize';

const db = new Sequelize('db_payroll3', 'root', '', {
  host: "localhost",
  dialect: "mysql",
});

db.authenticate()
  .then(() => {
    console.log('Database connection established');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

export default db;

