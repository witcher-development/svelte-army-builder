import { get, writable } from 'svelte/store';

import { Drag } from "../types/client";

const dragInitState: Drag = {
	isDragOn: false,
	cardId: 0,
	dragFromDeck: false,
};

export const state = writable(dragInitState);

export const getState = (): Drag => get(state);

export const setDrag = (partOfDrag: Partial<Drag>) => {
	state.update((drag) => ({ ...drag, ...partOfDrag }));
};

export const resetDrag = () => {
	state.set(dragInitState);
};
