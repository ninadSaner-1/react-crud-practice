import { Dispatch, useState } from "react";
import { IUser } from "./App.data";
import { IAppAction, IAppState } from "./App.types";
import * as userService from "./services/user.service";

export const initialState: IAppState = {
	users: [],
	selectedUser: null,
	showDeleteModal: false,
	editModalOpen: false,
	pageNumber: 0,
	pageSize: 5,
	showLoader: false,
};

// 1. create reducer fn
// state - passed by dispatch fn, is the current/latest state
// action - passed to dispatch fn explicitly, tells us what to do for that action
export const appReducer = (state: IAppState, action: IAppAction): IAppState => {
	switch (action.type) {
		case "GET_USERS":
			return { ...state, users: action.data };
		case "SHOW_DELETE_MODAL":
			return {
				...state,
				selectedUser: action.data,
				showDeleteModal: true,
			};
		case "HIDE_DELETE_MODAL":
			return { ...state, selectedUser: null, showDeleteModal: false };
		case "HIDE_EDIT_MODAL":
			return { ...state, editModalOpen: false, selectedUser: null };
		case "SHOW_EDIT_MODAL":
			return { ...state, editModalOpen: true, selectedUser: action.data };
		case "HANDLE_PAGE_NUMBER":
			return { ...state, pageNumber: action.data };
		case "HANDLE_PAGE_SIZE":
			return { ...state, pageSize: action.data };
		case "SHOW_LOADER":
			return { ...state, showLoader: true };
		case "HIDE_LOADER":
			return { ...state, showLoader: false };
		case "NEXT_PAGE":
			let maxPageNumber = Math.floor(state.users.length / state.pageSize);

			if (state.users.length % state.pageSize === 0) maxPageNumber--;

			if (state.pageNumber === maxPageNumber) return { ...state };

			return { ...state, pageNumber: state.pageNumber + 1 };
		case "PREV_PAGE":
			if (state.pageNumber === 0) return { ...state };

			return { ...state, pageNumber: state.pageNumber - 1 };
		case "CHANGE_PAGE_SIZE":
			return { ...state, pageNumber: 0, pageSize: action.data };

		case "GET_USERS_PENDING":
			return { ...state, showLoader: true };
		case "GET_USERS_SUCCESS":
			return { ...state, showLoader: false, users: action.data };
		case "GET_USERS_FAILED":
			return { ...state, showLoader: false };

		case "EDIT_USER_PENDING":
			return { ...state, showLoader: true };
		case "EDIT_USER_SUCCESS":
			if (!state.selectedUser) {
				return {
					...state,
					showLoader: false,
					selectedUser: null,
					editModalOpen: false,
				};
			}

			const usersClone = state.users.map((user) =>
				user.id === state.selectedUser!.id
					? { ...user, ...action.data }
					: user
			);
			
			return {
				...state,
				showLoader: false,
				selectedUser: null,
				editModalOpen: false,
				users: usersClone,
			};
		case "EDIT_USER_FAILED":
			return {
				...state,
				showLoader: false,
				selectedUser: null,
				editModalOpen: false,
			};

		case "DELETE_USER_PENDING":
			return { ...state, showLoader: true };
		case "DELETE_USER_SUCCESS":
			if (!state.selectedUser) {
				return {
					...state,
					showLoader: false,
					selectedUser: null,
					showDeleteModal: false,
				};
			}

			const updatedUsers = state.users.filter(
				(user) => user.id !== state.selectedUser!.id
			);

			return {
				...state,
				showLoader: false,
				selectedUser: null,
				showDeleteModal: false,
				users: updatedUsers,
			};
		case "DELETE_USER_FAILED":
			return {
				...state,
				showLoader: false,
				selectedUser: null,
				showDeleteModal: false,
			};

		default:
			return state;
	}
};

// Dummy useReducer

const useReducer = (reducer: any, initialState: any) => {
	const [latestState, setLatestState] = useState(initialState);

	const dispatcher = (action: any) => {
		const newState = reducer(latestState, action);
		setLatestState(newState);
		// rerenders the component
	};

	return [latestState, dispatcher];
};

export const getUsers = async (dispatch: Dispatch<IAppAction>) => {
	try {
		dispatch({ type: "GET_USERS_PENDING" });

		const users = await userService.getUsers();

		dispatch({ type: "GET_USERS_SUCCESS", data: users });
	} catch (err) {
		dispatch({ type: "GET_USERS_FAILED" });
	}
};

export const editUser = async (dispatch: Dispatch<IAppAction>, user: IUser) => {
	try {
		dispatch({ type: "EDIT_USER_PENDING" });

		await userService.updateUser(user.id, user);

		dispatch({ type: "EDIT_USER_SUCCESS", data: user });
	} catch (err) {
		dispatch({ type: "EDIT_USER_FAILED" });
	}
};

export const deleteUser = async (
	dispatch: Dispatch<IAppAction>,
	id: number
) => {
	try {
		dispatch({ type: "DELETE_USER_PENDING" });

		await userService.deleteUser(id);

		dispatch({ type: "DELETE_USER_SUCCESS", data: id });
	} catch (err) {
		dispatch({ type: "DELETE_USER_FAILED" });
	}
};
