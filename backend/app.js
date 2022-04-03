import express from 'express';
import mongoose from 'mongoose';
import todoRouter from './routes/todoRouter.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todoReact', {
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