import React, { useEffect, useState } from "react";
import "../App.css";
import DialogModal from "./DialogModal";
import NavBar from "./NavBar";
import { getAllTasks, updateTask } from "../utils/api";
import { StatusEnum, Task_GET } from "../interfaces/ITasks";
import TaskCard from "./TaskCard";
import toast from "react-hot-toast";

const Home = () => {
  const [tasks, setTasks] = useState<Task_GET[]>([]);

  // const {  } = dialogModel;
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
        break;
      default:
        newStatus = StatusEnum.TODO;
    }
    try {
      const updateTaskWithNewStatus = { ...task, status: newStatus };
      const res = await toast.promise(
        updateTask(task._id, updateTaskWithNewStatus),
        {
          loading: "Updating task status...",
          success: "Task status updated successfully!",
          error: "Failed to update task status.",
        }
      );
      setTasks((previousTasks) => {
        //removing the task from source colomn
        let updatedTasks = previousTasks.filter((t) => t._id !== task._id);
        //updating the task in targetColomn
        updatedTasks.push(res.task);

        return updatedTasks;
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  return (
    <div>
      <div className="app">
        <NavBar />
        <div className="parent">
          <div
            className="child to-do-colomn"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "toDo")}
          >
            <h2>To Do</h2>
            {tasks
              .filter((tasks) => tasks.status === StatusEnum.TODO)
              .map((task, i) => (
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
                  />
                </div>
              ))}
          </div>
          <div
            className="child inprogress-colomn"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "inProgress")}
          >
            <h2>In progress</h2>
            {tasks
              .filter((task) => task.status === StatusEnum.INPROGRESS)
              .map((task, i) => (
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
                  />
                </div>
              ))}
          </div>
          <div
            className="child completed-colomn"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "completed")}
          >
            <h2>Done</h2>
            {tasks
              .filter((task) => task.status === StatusEnum.COMPLETED)
              .map((task, i) => (
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
                  />
                </div>
              ))}
          </div>
        </div>
        <DialogModal
          onSave={(res: Task_GET) => {
            setTasks((previousTask) => {
              let updatedTask = previousTask.filter((t) => t._id !== res._id);
              updatedTask.push(res);
              return updatedTask;
            });
          }}
        />
      </div>
    </div>
  );
};

export default Home;
