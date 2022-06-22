import express from 'express';
import mongoose from 'mongoose';
import todoRouter from './routes/todoRouter.js'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:3000/todoReact', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

app.get('/', (req, res) => {
    res.send("Server has started");
})

app.use('/api/todos', todoRouter)

//Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
    );
  } else {
      app.get('*', (req, res) => res.send('Please set to production environment'))
  }

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
})