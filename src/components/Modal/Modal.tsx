import styles from "./Modal.module.scss";
import { ModalProps } from "./Modal.types.ts";
import { useState } from "react";

const Modal = ({
	open,
	children,
	onClose = () => { },
	closeOnBackdrop = false,
}: ModalProps) => {
	const handleBackdropClick = (event: MouseEvent) => {
		if (event.target !== event.currentTarget) return;

		// event.stopPropagation();

		closeOnBackdrop && onClose();
	};

	if (!open) return null;

	return (
		<div className={styles.Modal__Backdrop} onClick={handleBackdropClick}>
			<div className={styles.Modal}>
				<span className={styles.Modal__Close} onClick={onClose}>
					x
				</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;
