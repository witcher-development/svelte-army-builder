import { get, writable } from 'svelte/store';

import { GameClass } from '../types/client';
import { getClasses } from '../server';

export const state = writable<GameClass[]>([], () => {});
export const getState = (): GameClass[] => get(state);
const setState = (classes: GameClass[]) => state.set(classes);

export const getClassNameById = (classId: number): string => {
	const classObject = getState().find(({ id }) => id === classId);
	return classObject ? classObject.name : 'All classes';
};

export const fetchClasses = async (): Promise<GameClass[]> => {
	const response = await getClasses();
	const { data: classes } = response;

	setState(classes);
	return classes;
};
