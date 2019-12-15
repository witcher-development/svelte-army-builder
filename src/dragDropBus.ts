import {
	state as drag,
	getState as getDrag,
	setDrag,
	resetDrag,
} from './store/dragDrop';
import { setDragNodeCoors, resetDragNodeCoors } from './store/dragNode';
import { getState as getCards } from './store/cards';
import { setCard, removeCard } from './store/deck';

const onMouseDown = (e) => {
	const cardNode = e.path.find(
		(node) => node.classList && node.classList.contains('card'),
	);
	if (cardNode) {
		const cardId = +cardNode.getAttribute('data-card-id');
		const isDeckCard = cardNode.getAttribute('data-deck-card') === 'true';

		setDrag({
			isDragOn: true,
			cardId,
			dragFromDeck: isDeckCard,
		});
	}
};

const onDropToDeck = (index: number) => {
	const cardId = getDrag().cardId;
	const card = getCards().find(({ id }) => cardId === id);

	if (card) {
		setCard(index, card);
	} else {
		alert('error');
	}
};

const onDropOut = () => {
	const id = getDrag().cardId;
	removeCard(id);
};

const onMouseUp = ({ target }) => {
	if (getDrag().isDragOn) {
		if (target.classList.contains('deck__card-drop-target')) {
			const targetIndex = +target.getAttribute('data-deck-index');
			onDropToDeck(targetIndex);
		}

		if (
			target.classList.contains('cards__drop-target') &&
			getDrag().dragFromDeck
		) {
			onDropOut();
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

drag.subscribe(({ isDragOn }) => {
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
