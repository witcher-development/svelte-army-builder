import { Response } from "../types";

export const createResponse = <T>(data: T, message?: string): Response<T> => ({
	data,
	status: !message,
	message,
});

export const akaDBRequest = (payload): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			payload(resolve, reject);
		}, 1000);
	});
};
