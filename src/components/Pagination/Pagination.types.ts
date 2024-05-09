interface IPaginationProps {
	onNext: () => void;
	onPrev: () => void;
	onPageSizeChange: (pageSize: number) => void;
	pageSizeOptions: number[];
}

export type PaginationProps = Partial<IPaginationProps>;
