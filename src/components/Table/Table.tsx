import { render } from "sass";
import { IUser } from "../../App.data.tsx";
import styles from "./Table.module.scss";
import { TableProps } from "./Table.types.ts";

const Table = <T extends NonNullable<unknown>>({
	columns,
	data,
	renderActions,
	...tableProps
}: TableProps<T>) => {
	return (
		<div className={styles.Table__Container}>
			<table className={styles.Table}>
				<thead className={styles.Table__Head}>
					<tr className={styles.Table__Head__Row}>
						{columns.map((column) => (
							<th
								key={column.key as string}
								className={styles.Table__Header__Cell}
							>
								{column.label}
							</th>
						))}
						{renderActions && (
							<th className={styles.Table__Header__Cell}>
								Actions
							</th>
						)}
					</tr>
				</thead>
				<tbody className={styles.Table__Body}>
					{data.length <= 0 && (
						<tr className={styles.Table__Body__Row}>
							<td
								colSpan={columns.length + (renderActions ? 1: 0)}
								className={`${styles.Table__Body__Cell} ${styles.Table__Body__Cell__No_Records}`}
							>
								No Records Found!
							</td>
						</tr>
					)}
					{data.map((row, index) => (
						<tr
							key={`row${index}`}
							className={styles.Table__Body__Row}
						>
							{columns.map((column, i) => (
								<td
									key={`row${index}col${i}`}
									className={styles.Table__Body__Cell}
								>
									{row[column.key]}
								</td>
							))}
							{renderActions && (
								<td className={styles.Table__Body__Cell}>
									{renderActions(row)}
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
