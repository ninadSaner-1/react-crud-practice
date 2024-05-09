import { IUser } from "../../App.data";
import { ModalProps } from "../Modal/Modal.types";

export interface EditUserModalProps extends Omit<ModalProps, "children"> {
	onUpdateUser?: (user: IUser) => void;
	user: IUser | null;
}
 