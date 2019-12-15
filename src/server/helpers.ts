import { Response } from "../types/server";

export const createResponse = <T>(data: T, message?: string): Response<T> => ({
	data,
	status: !message,
	message,
});

export const akaDBRequest = <T>(payload): Promise<T> => {
	return new Promise<T>((resolve, reject) => {
		setTimeout(() => {
			payload(resolve, reject);
		}, 1000);
	});
};
