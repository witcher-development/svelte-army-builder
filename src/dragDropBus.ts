import { get } from 'svelte/store';
import {
	dragStore,
	setDrag,
	resetDrag,
	setDragNodeCoors,
	resetDragNodeCoors,
	cardsStore,
	setCard,
} from './store';

const onMouseDown = (e) => {
	const cardNode = e.path.find(
		(node) => node.classList && node.classList.contains('card'),
	);
	if (cardNode) {
		const cardId = +cardNode.getAttribute('data-card-id');

		setDrag({
			isDragOn: true,
			cardId,
		});
	}
};

const onDropToDeck = (index: number) => {
	const cardId = get(dragStore).cardId;
	const card = get(cardsStore).find(({ id }) => cardId === id);

	if (card) {
		setCard(index, card);
	} else {
		alert('error');
	}
};

const onMouseUp = ({ target }) => {
	if (get(dragStore).isDragOn) {
		if (target.classList.contains('deck__card-drop-target')) {
			const targetIndex = +target.getAttribute('data-deck-index');
			console.log(targetIndex);
			onDropToDeck(targetIndex);
		}

		resetDrag();
		resetDragNodeCoors();
	}
};

const onMouseMove = (e) => {
	setDragNodeCoors({
		x: e.clientX,
		y: e.clientY,
	});
};

dragStore.subscribe(({ isDragOn }) => {
	if (isDragOn) {
		document.addEventListener('mousemove', onMouseMove);
	} else {
		document.removeEventListener('mousemove', onMouseMove);
	}
});

export const setDragDropHandlers = () => {
	document.addEventListener('mousedown', onMouseDown);
	document.addEventListener('mouseup', onMouseUp);
};

export const removeDragDropHandlers = () => {
	document.removeEventListener('mousedown', onMouseDown);
	document.removeEventListener('mouseup', onMouseUp);
};
