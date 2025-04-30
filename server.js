import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import  cors  from "cors";
import mongoose from 'mongoose';


const app = express();
config();

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
};


connectDB();


const PORT = process.env.PORT ;

const allowedOrigins = [
  'http://localhost:5173',
   'https://taskmanager-frontend-two.vercel.app',
    'https://taskmanager-frontend-9q6t9qida-rishabh7068s-projects.vercel.app',
    'https://taskmanager-frontend-git-main-rishabh7068s-projects.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to Task ManagerApp!');
});

app.use("/api/auth", authRoutes);
app.use('/api/task', taskRoutes);


app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
