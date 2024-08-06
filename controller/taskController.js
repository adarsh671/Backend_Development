import { Task } from "../models/taskSchema.js";

export const addTask = async (req, res, next) => {
  const { title, description } = req.body;
  const createdBy = req.user.id;
  if (!title || !description) {
    return next(
      res.status(400).json({
        success: false,
        message: "Please provide both title and description",
      })
    );
  }
  const task = await Task.create({ title, description, createdBy });
  res.status(200).json({
    success: true,
    message: "Task Created",
  });
};

export const getTask = async (req, res, next) => {
  const tasks = await Task.find({ createdBy: req.user._id });
  res.status(200).json({
    success: true,
    tasks,
  });
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(
      res.status(404).json({
        success: false,
        message: "Task is not found",
      })
    );
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task Deleted",
  });
};

export const updateTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(
      res.status(404).json({
        success: false,
        message: "Task is not found",
      })
    );
  }
  const { title, description } = req.body;
  const updatedTask=await Task.findByIdAndUpdate(req.params.id,{title,description},
    {
      new:true,
      runValidators:true,
      useFindAndModify:false
    }
  )
  res.status(200).json({
    success:true,
    message:"Task Updated"
  })
};
