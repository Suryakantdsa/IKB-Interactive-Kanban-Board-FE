import { useContext, useEffect, useState } from "react";
import { DialogName, IDialogModalProbs } from "../interfaces/IDialogModal";
import { createTask, deleteTask, updateTask } from "../utils/api";
import toast from "react-hot-toast";
import { DialogContext } from "../App";

const DialogModal: React.FC<IDialogModalProbs> = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);
  const dialogModel = useContext(DialogContext);
  if (!dialogModel) return null;
  const { isModalOpen, setModalOpen, dialogName, selectedTask } = dialogModel;
  useEffect(() => {
    if (selectedTask && selectedTask._id) {
      setTitle(selectedTask.title);
      setDesc(selectedTask.description);
      setTaskId(selectedTask._id);
    }
  }, [selectedTask]);

  const handleSave = async () => {
    try {
      let res;
      if (dialogName === DialogName.ADD_TASK) {
        res = await toast.promise(createTask({ title, description: desc }), {
          loading: "Creating task...",
          success: "Task created successfully!",
          error: "Something went wrong, please try again.",
        });
        setDesc("");
        setTitle("");
      } else if (dialogName === DialogName.EDIT_TASK && taskId) {
        res = await toast.promise(
          updateTask(taskId, { title, description: desc }),
          {
            loading: "Updating task...",
            success: "Task updated successfully!",
            error: "Failed to update task, please try again.",
          }
        );
        setDesc("");
        setTitle("");
      } else if (dialogName === DialogName.DELETE_TASK && taskId) {
        res = await toast.promise(deleteTask(taskId), {
          loading: "Deleting task...",
          success: "Task deleted successfully!",
          error: "Failed to delete task, please try again.",
        });
        localStorage.setItem("deleted_task", JSON.stringify(selectedTask));
        setDesc("");
        setTitle("");
      }
      onSave(res.task);
      setModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (!isModalOpen) {
    return null;
  }
  return (
    <div
      className="model-overlay"
      onClick={() => {
        setModalOpen(!isModalOpen);
        setDesc("");
        setTitle("");
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>{dialogName}</h1>
          {dialogName === DialogName.DELETE_TASK ? (
            <p>Are you sure you want to delete this task?</p>
          ) : (
            <>
              <input
                type="text"
                placeholder="name of task"
                value={title}
                onChange={(e) => {
                  if (
                    dialogName === DialogName.ADD_TASK ||
                    dialogName === DialogName.EDIT_TASK
                  ) {
                    setTitle(e.target.value);
                  }
                }}
              />
              {dialogName === DialogName.ADD_TASK ||
              dialogName === DialogName.EDIT_TASK ? (
                <textarea
                  placeholder="enter description"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                ></textarea>
              ) : null}
            </>
          )}
          <div className="btn-grp">
            <button className="btn" onClick={() => handleSave()}>
              {dialogName}
            </button>
            <button
              className="btn cancel-btn"
              onClick={() => {
                setModalOpen(!isModalOpen);
                setDesc("");
                setTitle("");
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogModal;
