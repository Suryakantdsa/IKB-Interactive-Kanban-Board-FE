import React, { createContext, useEffect, useState } from "react";
import "../App.css";
import { IDialogModal, DialogName } from "../interfaces/IDialogModal";
import DialogModal from "./DialogModal";
import NavBar from "./NavBar";
import { getAllTasks } from "../utils/api";
import { Task_GET } from "../interfaces/ITasks";

export const DialogContext = createContext<IDialogModal | null>(null);

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dialogName, setDialogName] = useState<DialogName | undefined>();
  const [tasks, setTasks] = useState<{
    toDo: Task_GET[];
    inProgress: Task_GET[];
    completed: Task_GET[];
  }>({
    toDo: [],
    inProgress: [],
    completed: [],
  });

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const res = await getAllTasks(); // Call the API
      setTasks(res as any); // Directly set the response without modification
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragStart = (e: React.DragEvent, task: string, colomn: string) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("colomn", colomn);
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const onDrop = (e: React.DragEvent, targetColomn: string) => {
    e.preventDefault();

    const task = e.dataTransfer.getData("task");
    const sourceColomn = e.dataTransfer.getData("colomn");
    if (!task || !sourceColomn) return;

    setTasks((previousTasks) => {
      let updatedTasks = { ...previousTasks };
      //removing the task from source colomn
      updatedTasks[sourceColomn as keyof typeof tasks] = updatedTasks[
        sourceColomn as keyof typeof tasks
      ].filter((t) => t.title !== task);
      //updating the task in targetColomn
      updatedTasks[targetColomn as keyof typeof tasks].push({
        title: "task3",
        description: "task 3descriptipon",
      });

      return updatedTasks;
    });
  };
  return (
    <DialogContext.Provider
      value={{ isModalOpen, setModalOpen, dialogName, setDialogName }}
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
                onDragStart={(e) => onDragStart(e, task.title, "toDo")}
              >
                {task.title}
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
                onDragStart={(e) => onDragStart(e, task.title, "inProgress")}
              >
                {task.title}
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
                onDragStart={(e) => onDragStart(e, task.title, "completed")}
              >
                {task.title}
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
