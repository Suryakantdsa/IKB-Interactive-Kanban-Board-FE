import { useContext } from "react";
import { IDialogModalProbs } from "../interfaces/IDialogModal";
import { DialogContext } from "../App";

const DialogModal: React.FC<IDialogModalProbs> = ({}) => {
  const dialogModel = useContext(DialogContext);
  if (!dialogModel) return null;
  const { isModalOpen, setModalOpen, dialogName } = dialogModel;
  if (!isModalOpen) {
    return null;
  }
  return (
    <div className="model-overlay" onClick={() => setModalOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>{dialogName}</h1>
          <input type="text" name="" id="" placeholder="name of task" />
          <textarea name="" id="" placeholder="enter description"></textarea>
          <div className="btn-grp">
            <button className="btn">{dialogName}</button>
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
