import { get, writable } from 'svelte/store';

interface GameClass {
	id: number;
	name: string;
}

export const state = writable<GameClass[]>([], () => {});
export const getState = (): GameClass[] => get(state);
export const getClassNameById = (classId: number): string => {
	const classObject = get(state).find(({ id }) => id === classId);
	return classObject ? classObject.name : 'All classes';
};
