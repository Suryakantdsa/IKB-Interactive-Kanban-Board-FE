import React, { createContext, useEffect, useState } from "react";
import "../App.css";
import { IDialogModal, DialogName } from "../interfaces/IDialogModal";
import DialogModal from "./DialogModal";
import NavBar from "./NavBar";
import { getAllTasks, updateTask } from "../utils/api";
import { StatusEnum, Task_GET } from "../interfaces/ITasks";
import TaskCard from "./TaskCard";
import toast from "react-hot-toast";

export const DialogContext = createContext<IDialogModal | null>(null);

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dialogName, setDialogName] = useState<DialogName | undefined>();
  const [selectedTask, setSelectedTask] = useState<Task_GET | undefined>();
  const [tasks, setTasks] = useState<{
    toDo: Task_GET[];
    inProgress: Task_GET[];
    completed: Task_GET[];
  }>({
    toDo: [],
    inProgress: [],
    completed: [],
  });

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setTasks(res as any);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragStart = (e: React.DragEvent, task: Task_GET, colomn: string) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    e.dataTransfer.setData("colomn", colomn);
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const onDrop = async (e: React.DragEvent, targetColomn: string) => {
    e.preventDefault();

    const task = JSON.parse(e.dataTransfer.getData("task"));
    const sourceColomn = e.dataTransfer.getData("colomn");
    if (!task || !sourceColomn) return;
    console.log(targetColomn);
    let newStatus;
    switch (targetColomn) {
      case "toDo":
        newStatus = StatusEnum.TODO;
        break;
      case "inProgress":
        newStatus = StatusEnum.INPROGRESS;
        break;
      case "completed":
        newStatus = StatusEnum.COMPLETED;
        console.log(newStatus);
        break;
      default:
        newStatus = StatusEnum.TODO;
    }
    try {
      const updateTaskWithNewStatus = { ...task, status: newStatus };
      await toast.promise(updateTask(task._id, updateTaskWithNewStatus), {
        loading: "Updating task status...",
        success: "Task status updated successfully!",
        error: "Failed to update task status.",
      });
      setTasks((previousTasks) => {
        let updatedTasks = { ...previousTasks };
        //removing the task from source colomn
        updatedTasks[sourceColomn as keyof typeof tasks] = updatedTasks[
          sourceColomn as keyof typeof tasks
        ].filter((t) => t._id !== task._id);
        //updating the task in targetColomn
        updatedTasks[targetColomn as keyof typeof tasks].push(task);

        return updatedTasks;
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  return (
    <DialogContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        dialogName,
        setDialogName,
        selectedTask,
        setSelectedTask,
      }}
    >
      <div className="app">
        <NavBar />
        <div className="parent">
          <div
            className="child to-do-colomn"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "toDo")}
          >
            <h3>To Do</h3>
            {tasks.toDo.map((task, i) => (
              <div
                className="task"
                key={task.title + i}
                draggable
                onDragStart={(e) => onDragStart(e, task, "toDo")}
              >
                <TaskCard
                  _id={task._id}
                  title={task.title}
                  description={task.description}
                  createdAt={task.createdAt}
                  status={task.status}
                  onEdit={() => console.log("Edit task", task)}
                />
              </div>
            ))}
          </div>
          <div
            className="child inprogress-colomn"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "inProgress")}
          >
            <h3>In progress</h3>
            {tasks.inProgress.map((task, i) => (
              <div
                className="task"
                key={task.title + i}
                draggable
                onDragStart={(e) => onDragStart(e, task, "inProgress")}
              >
                <TaskCard
                  _id={task._id}
                  title={task.title}
                  description={task.description}
                  createdAt={task.createdAt}
                  status={task.status}
                  onEdit={() => console.log("Edit task", task)}
                />
              </div>
            ))}
          </div>
          <div
            className="child completed-colomn"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "completed")}
          >
            <h3>Completed</h3>
            {tasks.completed.map((task, i) => (
              <div
                className="task"
                key={task.title + i}
                draggable
                onDragStart={(e) => onDragStart(e, task, "completed")}
              >
                <TaskCard
                  _id={task._id}
                  title={task.title}
                  description={task.description}
                  createdAt={task.createdAt}
                  status={task.status}
                  onEdit={() => console.log("Edit task", task)}
                />
              </div>
            ))}
          </div>
        </div>
        <DialogModal />
      </div>
    </DialogContext.Provider>
  );
};

export default Home;
