import { useEffect, useReducer } from "react";
import { IUser } from "./App.data";
import styles from "./App.module.scss";
import {
	appReducer,
	deleteUser,
	editUser,
	getUsers,
	initialState,
} from "./App.state";
import { Button } from "./components/Button/Button";
import DeleteUserModal from "./components/DeleteUserModal/DeleteUserModal";
import EditUserModal from "./components/EditUserModal/EditUserModal";
import Loader from "./components/Loader/Loader";
import Pagination from "./components/Pagination/Pagination";
import Table from "./components/Table/Table";
import { ITableColumn } from "./components/Table/Table.types";

export const App = () => {
	const columns: ITableColumn<IUser>[] = [
		{
			key: "name",
			label: "Name",
		},
		{
			key: "email",
			label: "Email",
		},
	];
	const pageSizeOptions = [5, 10, 15];

	// Two args
	// 1. reducer function
	// 	  - state, action
	// 	  - return new state
	// 2. initial state
	const [
		{
			users,
			selectedUser,
			showDeleteModal,
			editModalOpen,
			pageNumber,
			pageSize,
			showLoader,
		},
		dispatch,
	] = useReducer(appReducer, initialState);

	const start = pageNumber * pageSize;
	const end = start + pageSize;
	const usersToDisplay = users.slice(start, end);

	type AssertIsDefined = <T>(value: T) => asserts value is NonNullable<T>;
	const assertIsDefined: AssertIsDefined = (value) => {
		if (value === undefined || value === null)
			throw new Error("Undefined value found");
	};

	const handleOnDelete = (user: IUser) =>
		dispatch({ type: "SHOW_DELETE_MODAL", data: user });
	const onConfirmDelete = () =>
		selectedUser && deleteUser(dispatch, selectedUser.id);
	const onDeleteClose = () => dispatch({ type: "HIDE_DELETE_MODAL" });
	const handleOnEdit = (user: IUser) =>
		dispatch({
			type: "SHOW_EDIT_MODAL",
			data: user,
		});
	const onEditClose = () => dispatch({ type: "HIDE_EDIT_MODAL" });
	const handleOnUpdateUser = (updatedUser: IUser) =>
		selectedUser &&
		editUser(dispatch, { ...updatedUser, id: selectedUser.id });
	const handleOnNext = () => dispatch({ type: "NEXT_PAGE" });
	const handleOnPrev = () => dispatch({ type: "PREV_PAGE" });
	const handleOnPageSizeChange = (pageSize: number) =>
		dispatch({ type: "CHANGE_PAGE_SIZE", data: pageSize });

	useEffect(() => {
		getUsers(dispatch);
	}, []);

	return (
		<>
			{showLoader && <Loader />}
			<div className={styles.App}>
				<div className={styles.TableContainer}>
					<Table
						columns={columns}
						data={usersToDisplay}
						renderActions={(row) => (
							<div className={styles.Table__Actions}>
								<Button onClick={() => handleOnEdit(row)}>
									Edit
								</Button>
								<Button
									className="Btn__Danger"
									onClick={() => handleOnDelete(row)}
								>
									Delete
								</Button>
							</div>
						)}
					/>
				</div>
				<Pagination
					pageSizeOptions={pageSizeOptions}
					onNext={handleOnNext}
					onPrev={handleOnPrev}
					onPageSizeChange={handleOnPageSizeChange}
				/>

				{/* Modals */}
				<DeleteUserModal
					open={showDeleteModal}
					onClose={onDeleteClose}
					closeOnBackdrop={true}
					onConfirmDelete={onConfirmDelete}
				/>
				<EditUserModal
					open={editModalOpen}
					onClose={onEditClose}
					closeOnBackdrop={true}
					onUpdateUser={handleOnUpdateUser}
					user={selectedUser}
				/>
			</div>
		</>
	);
};
