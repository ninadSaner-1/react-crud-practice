import axios from "../../axios.instance";
import { IUser } from "../App.data";

export const getUsers = async () => {
	try {
		const { data, status } = await axios.get("/users");

		if (status !== 200) throw "";

		return data;
	} catch (error) {
		throw new Error("Could not fetch users");
	}
};

export const deleteUser = async (id: number) => {
	try {
		const { data, status } = await axios.delete(`/users/${id}`);

		if (status !== 200) throw "";

		return data;
	} catch (error) {
		throw new Error("Could not delete user");
	}
};
export const updateUser = async (id: number, user: IUser) => {
	try {
		const { data, status } = await axios.put(`/users/${id}`, user);

		if (status !== 200) throw "";

		return data;
	} catch (error) {
		throw new Error("Could not update user");
	}
};
