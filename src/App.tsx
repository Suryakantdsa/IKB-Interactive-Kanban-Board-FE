import React, { createContext, useState } from "react";
import "./App.css";
import DialogModal from "./components/DialogModal";
import NavBar from "./components/NavBar";
import { DialogName, IDialogModal } from "./interfaces/IDialogModal";
export const DialogContext = createContext<IDialogModal | null>(null);

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dialogName, setDialogName] = useState<DialogName | undefined>();
  const [tasks, setTasks] = useState({
    toDo: ["task1", "task2", "tsak3"],
    inProgress: ["inprogress task1"],
    completed: ["complted1 task1"],
  });

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
      ].filter((t) => t !== task);
      //updating the task in targetColomn
      updatedTasks[targetColomn as keyof typeof tasks].push(task);

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
                key={task + i}
                draggable
                onDragStart={(e) => onDragStart(e, task, "toDo")}
              >
                {task}
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
                key={task + i}
                draggable
                onDragStart={(e) => onDragStart(e, task, "inProgress")}
              >
                {task}
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
                key={task + i}
                draggable
                onDragStart={(e) => onDragStart(e, task, "completed")}
              >
                {task}
              </div>
            ))}
          </div>
        </div>
        <DialogModal />
      </div>
    </DialogContext.Provider>
  );
};

export default App;
