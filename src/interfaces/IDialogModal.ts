import { Task_GET } from "./ITasks";

export interface IDialogModal {
  isModalOpen?: boolean;
  setModalOpen: (open: boolean) => void;
  dialogName?: DialogName;
  setDialogName: (open?: DialogName) => void;
  selectedTask?: Task_GET;
  setSelectedTask: (data?: Task_GET) => void;
}
export enum DialogName {
  ADD_TASK = "Add task",
  EDIT_TASK = "Edit task",
  DELETE_TASK = "Delete task",
  ADD_COLOMN = "Edd colomn",
}
export interface IDialogModalProbs {
  title?: string;
}
