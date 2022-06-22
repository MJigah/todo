import express from 'express';
import mongoose from 'mongoose';
import todoRouter from './routes/todoRouter.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:3000/todoReact', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/', (req, res) => {
    res.send("Server has started");
})

app.use('/api/todos', todoRouter)

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
})