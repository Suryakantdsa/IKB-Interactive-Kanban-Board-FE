import { createContext, useState } from "react";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import { IDialogModal, DialogName } from "./interfaces/IDialogModal";
import { Task_GET } from "./interfaces/ITasks";
export const DialogContext = createContext<IDialogModal | null>(null);
const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dialogName, setDialogName] = useState<DialogName | undefined>();
  const [selectedTask, setSelectedTask] = useState<Task_GET | undefined>();
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
      <Home />
      <Toaster position="top-center" />
    </DialogContext.Provider>
  );
};

export default App;
