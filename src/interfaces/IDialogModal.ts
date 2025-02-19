export interface IDialogModal {
  isModalOpen?: boolean;
  setModalOpen: (open: boolean) => void;
  dialogName?: DialogName;
  setDialogName: (open?: DialogName) => void;
}
export enum DialogName {
  ADD_TASK = "Add task",
  EDIT_TASK = "Edit task",
  ADD_COLOMN = "Edd colomn",
}
export interface IDialogModalProbs {
  title?: string;
}
