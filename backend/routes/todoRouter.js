import express from "express";
import expressAsyncHandler from "express-async-handler";
import Todo from "../model/todo.js";

const todoRouter = express.Router();

todoRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const allTodos = await Todo.find({});
    if (allTodos) {
      res.send(allTodos);
    } else {
      res.send("No Todo activities Found!!");
    }
  })
);

todoRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Todo.remove({});
    const createdTodo = await Todo.insertMany([
      {
        text: "Wash Clothes",
        active: true,
      },
      {
        text: "Walk Dogs",
        active: true,
      },
      {
        text: "Do other Chores",
        active: false,
      },
      {
        text: "Prepare Breakfast!",
        active: true,
      },
    ]);
    res.send(createdTodo);
  })
);

todoRouter.get(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {
    const updatedTodo = await Todo.findById(req.params.id);
    updatedTodo.active = !updatedTodo.active;
    updatedTodo.save();
    res.send(updatedTodo);
  })
);

todoRouter.get(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    const findTodo = await Todo.findById(req.params.id);
    if(!findTodo){
      res.send({message: "success"})
    }
  })
);

todoRouter.post(
  "/new",
  expressAsyncHandler(async (req, res) => {
    const todo = new Todo(req.body);
    const newTodo = await todo.save();
    res.send(newTodo);
  })
);

export default todoRouter;
