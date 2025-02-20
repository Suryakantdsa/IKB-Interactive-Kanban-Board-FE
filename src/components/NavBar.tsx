import { useContext } from "react";
import TaskIcon from "../assets/TaskIcon";
import { DialogName } from "../interfaces/IDialogModal";
import { DialogContext } from "../App";
import UndoIcon from "../assets/UndoIcon";
import toast from "react-hot-toast";
import { updateTask } from "../utils/api";
import { Task_GET } from "../interfaces/ITasks";

const NavBar = () => {
  const dialogModel = useContext(DialogContext);
  if (!dialogModel) return null;
  const { setDialogName, setModalOpen } = dialogModel;
  const handleUndo = async () => {
    let data = localStorage.getItem("deleted_task");
    if (!data) return;

    const deletedTask = JSON.parse(data) as Task_GET;
    if (!deletedTask._id) {
      return null;
    }
    try {
      await toast.promise(updateTask(deletedTask._id, deletedTask), {
        loading: "Undoing task...",
        success: "Task undo successfully!",
        error: "Failed to undo task, please try again.",
      });
      localStorage.removeItem("deleted_task");
      window.location.reload();
    } catch (error) {
      console.error("internal error", error);
    }
  };

  return (
    <nav className="navbar">
      <div>
        <p className="logo">IKP</p>
        <span className="logo-name">Interactive Kanban Board</span>
      </div>
      <div className="btn-grp">
        <button
          className="btn"
          onClick={() => {
            setModalOpen(true);
            setDialogName(DialogName.ADD_TASK);
          }}
        >
          <span>
            <TaskIcon />
          </span>
          <span className="show-hide">Add task</span>
        </button>
        {localStorage.getItem("deleted_task") && (
          <button className="btn colomn" onClick={handleUndo}>
            <span>
              {/* <ColomnIcon /> */}
              <UndoIcon />
            </span>
            <span className="show-hide">Undo </span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
