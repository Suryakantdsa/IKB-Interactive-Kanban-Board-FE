import { useContext, useState } from "react";
import { DialogName, IDialogModalProbs } from "../interfaces/IDialogModal";
import { createTask } from "../utils/api";
import { DialogContext } from "./Home";
import toast from "react-hot-toast";

const DialogModal: React.FC<IDialogModalProbs> = ({}) => {
  const [titie, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [colomn, setColomn] = useState("");
  const dialogModel = useContext(DialogContext);
  if (!dialogModel) return null;
  const { isModalOpen, setModalOpen, dialogName } = dialogModel;
  if (!isModalOpen) {
    return null;
  }

  const handleSave = async () => {
    if (dialogName === DialogName.ADD_TASK) {
      const res = await toast.promise(
        createTask({ title: titie, description: desc }),
        {
          loading: "Creating task",
          success: "Task created sucessfully",
          error: "something went wrong, plz try again",
        }
      );
      // alert(JSON.stringify(res));
    }
  };
  return (
    <div className="model-overlay" onClick={() => setModalOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>{dialogName}</h1>
          <input
            type="text"
            placeholder="name of task"
            value={titie}
            onChange={(e) => {
              dialogName === DialogName.ADD_TASK
                ? setTitle(e.target.value)
                : dialogName === DialogName.ADD_COLOMN
                ? setColomn(e.target.value)
                : null;
            }}
          />
          {dialogName === DialogName.ADD_TASK ? (
            <textarea
              placeholder="enter description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
          ) : null}
          <div className="btn-grp">
            <button className="btn" onClick={() => handleSave()}>
              {dialogName}
            </button>
            <button
              className="btn cancel-btn"
              onClick={() => setModalOpen(!isModalOpen)}
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
