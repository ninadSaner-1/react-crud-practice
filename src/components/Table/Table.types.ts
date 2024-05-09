import { HTMLAttributes } from "react";
export interface TableProps<T> extends HTMLAttributes<HTMLTableElement> {
	columns: ITableColumn<T>[];
	data: T[];
	renderActions?: (row: T) => JSX.Element;
}

export interface ITableColumn<T> {
	key: keyof T;
	label: string;
}
