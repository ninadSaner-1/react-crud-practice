import { ModalProps } from "../Modal/Modal.types";

 export interface DeleteUserModalProps extends Omit<ModalProps, "children"> {
	onConfirmDelete?: () => void
 } 
