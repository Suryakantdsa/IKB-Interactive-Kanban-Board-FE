import TImeIcon from "../assets/TImeIcon";
import EditIcon from "../assets/EditIcon";
import "../App.css"; // Import CSS file
import { Task_GET } from "../interfaces/ITasks";
import { useContext } from "react";
import { DialogName } from "../interfaces/IDialogModal";
import DeleteIcon from "../assets/DeleteIcon";
import { DialogContext } from "../App";

interface TaskCardProps extends Task_GET {
  // onEdit: () => void;
}

const TaskCard = ({
  _id,
  title,
  description,
  createdAt,
  status,
}: TaskCardProps) => {
  const dialogModel = useContext(DialogContext);
  if (!dialogModel) return null;
  const { setDialogName, setModalOpen, setSelectedTask } = dialogModel;

  return (
    <div className="task-card">
      <div className="task-header">
        <h4 className="task-title">{title}</h4>
        <div>
          <button
            onClick={() => {
              setModalOpen(true);
              setDialogName(DialogName.EDIT_TASK);
              setSelectedTask({
                _id,
                title,
                description,
                createdAt,
                status,
              });
            }}
            className="edit-btn"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => {
              setModalOpen(true);
              setDialogName(DialogName.DELETE_TASK);
              setSelectedTask({
                _id,
                title,
                description,
                createdAt,
                status,
              });
            }}
            className="delete-btn"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      <p className="task-desc">{description}</p>

      <div className="task-footer">
        <button className="date-btn">
          <TImeIcon />
          <span style={{ fontWeight: "bold" }}>
            {createdAt
              ? new Date(createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "No Date"}
          </span>
        </button>
        <span className={`status ${status?.toLowerCase()}`}>{status}</span>
      </div>
    </div>
  );
};

export default TaskCard;
