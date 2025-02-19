import { useContext } from "react";
import ColomnIcon from "../assets/ColomnIcon";
import TaskIcon from "../assets/TaskIcon";
import { DialogContext } from "../App";
import { DialogName } from "../interfaces/IDialogModal";

const NavBar = () => {
  const dialogModel = useContext(DialogContext);
  if (!dialogModel) return null;
  const { setDialogName, setModalOpen } = dialogModel;

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
        <button
          className="btn colomn"
          onClick={() => {
            setModalOpen(true);
            setDialogName(DialogName.ADD_COLOMN);
          }}
        >
          <span>
            <ColomnIcon />
          </span>
          <span className="show-hide">Add colomn</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
