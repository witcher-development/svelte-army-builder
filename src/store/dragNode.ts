import { get, writable } from 'svelte/store';

import { DragNodeCoors } from "../types/client";

const dragNodeInitCoors: DragNodeCoors = {
	x: -100,
	y: -100,
};
export const state = writable(dragNodeInitCoors);

export const getState = (): DragNodeCoors => get(state);

export const setDragNodeCoors = (coors: DragNodeCoors) => {
	state.set(coors);
};

export const resetDragNodeCoors = () => {
	state.set(dragNodeInitCoors);
};
