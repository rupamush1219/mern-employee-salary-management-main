import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize';
import FileUpload from 'express-fileupload';
import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js';

dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db });

(async function init() {
  try {
    await db.authenticate();
    console.log('Database connected');
    await store.sync();
  } catch (error) {
    console.error('Error initializing database or session store:', error);
    process.exit(1);
  }
})();

app.use(session({
  secret: process.env.SESS_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'];
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

app.use(UserRoute);
app.use(AuthRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error", error: err.message });
});

const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});