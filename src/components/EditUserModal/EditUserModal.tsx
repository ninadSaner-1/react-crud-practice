import { IUser } from "../../App.data.tsx";
import { Button } from "../Button/Button.tsx";
import Modal from "../Modal/Modal.tsx";
import styles from "./EditUserModal.module.scss";
import { EditUserModalProps } from "./EditUserModal.types.ts";
import { FormEvent, useState } from "react";

const EditUserModal = ({
	open,
	closeOnBackdrop,
	onClose,
	onUpdateUser = () => {},
	user,
}: EditUserModalProps) => {
	if (!user) return null;

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const formRecord: Record<string, string> = {};
		// const formRecord: Partial<IUser> = {};

		for (const [key, value] of formData.entries()) {
			formRecord[key] = value as string;
		}
		console.log(formRecord);

		onUpdateUser(formRecord as unknown as IUser);
	};

	return (
		<Modal open={open} closeOnBackdrop={closeOnBackdrop} onClose={onClose}>
			<div className={styles.EditUserModal}>
				<div className={styles.EditUserModal__Title}>
					<h3>Edit User</h3>
				</div>
				<div className={styles.EditUserModal__Body}>
					<form
						className={styles.EditUserModal__Body__Form}
						onSubmit={handleFormSubmit}
					>
						<div className={styles.EditUserModal__Body__Form_Field}>
							<label
								htmlFor="name"
								className={
									styles.EditUserModal__Body__Form_Field__Label
								}
							>
								Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="Enter Name"
								required
								className={
									styles.EditUserModal__Body__Form_Field__Input
								}
								defaultValue={user.name}
								/>
						</div>
						<div className={styles.EditUserModal__Body__Form_Field}>
							<label
								htmlFor="email"
								className={
									styles.EditUserModal__Body__Form_Field__Label
								}
							>
								Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Enter Email"
								required
								className={
									styles.EditUserModal__Body__Form_Field__Input
								}
								defaultValue={user.email}
							/>
						</div>
						<div className={styles.EditUserModal__Actions}>
							<Button onClick={onClose} className="Btn__Danger">
								Cancel
							</Button>
							<Button
							// onClick={() =>
							// 	onUpdateUser({ id: -1, name, email })
							// }
							>
								Update
							</Button>
						</div>
					</form>
				</div>
			</div>
		</Modal>
	);
};

export default EditUserModal;
