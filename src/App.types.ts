import { IUser } from "./App.data";

export interface IAppState {
	users: IUser[];
	showDeleteModal: boolean;
	editModalOpen: boolean;
	pageNumber: number;
	pageSize: number;
	showLoader: boolean;
	selectedUser: IUser | null
}

export interface IAppAction {
	type: string;
	data?: any;
}
