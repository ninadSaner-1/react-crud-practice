import styles from "./Pagination.module.scss";
import { PaginationProps } from "./Pagination.types.ts";

const Pagination = ({
	onNext = () => {},
	onPageSizeChange = (pageSize: number) => {},
	onPrev = () => {},
	pageSizeOptions = [10, 20, 50],
}: PaginationProps) => {
	return (
		<div className={styles.pagination}>
			<span className={styles.arrow} onClick={onPrev}>
				&lt;
			</span>
			<select
				className={styles.pager}
				onChange={(e) => onPageSizeChange(Number(e.target.value))}
				defaultValue={pageSizeOptions[0]}
			>
				{pageSizeOptions.map((option, index) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			<span className={styles.arrow} onClick={onNext}>
				&gt;
			</span>	
		</div>
	);
};

export default Pagination;
