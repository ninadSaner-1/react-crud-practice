import styles from "./Loader.module.scss";
import { LoaderProps } from "./Loader.types.ts";

const Loader = ({}: LoaderProps) => {
	return (
		<div className={styles.LoaderContainer}>
			<div className={styles.Loader}></div>
		</div>
	);
};

export default Loader;
