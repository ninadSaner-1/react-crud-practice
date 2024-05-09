import styles from "./Button.module.scss";
import { IButtonProps } from "./Button.type";

export const Button = ({ children, className, ...props }: IButtonProps) => {
	return (
		<button className={`${className} ${styles.Button}`} {...props}>
			{children}
		</button>
	);
};

