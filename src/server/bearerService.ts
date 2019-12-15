import { Token } from "../types/server";

const createUserToken = (playerId: number): Token => {
	const today = new Date();
	const expiredDate = new Date(today);
	expiredDate.setDate(expiredDate.getDate() + 1);

	return {
		playerId,
		token: true,
		expiredDate
	}
};
const verifyUserToken = (token: Token): boolean => {
	return token;
};
