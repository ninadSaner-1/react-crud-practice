import { Button } from "../Button/Button.tsx";
import Modal from "../Modal/Modal.tsx";
import styles from "./DeleteUserModal.module.scss";
import { DeleteUserModalProps } from "./DeleteUserModal.types";

const DeleteUserModal = ({
	open,
	closeOnBackdrop,
	onClose,
	onConfirmDelete = () => {}
}: DeleteUserModalProps) => {
	return (
		<Modal open={open} closeOnBackdrop={closeOnBackdrop} onClose={onClose}>
			<div className={styles.DeleteUserModal}>
				<div className={styles.DeleteUserModal_Title}>
					<p>Are you sure you want to delete the user?</p>
				</div>
				<div className={styles.DeleteUserModal__Actions}>
					<Button onClick={onClose}>Cancel</Button>
					<Button className="Btn__Danger" onClick={onConfirmDelete}>Yes</Button>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteUserModal;
