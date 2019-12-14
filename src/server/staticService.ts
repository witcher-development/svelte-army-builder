// @ts-ignore
import Jaina from 'assets/players/Jaina.png';
// @ts-ignore
import Malfurion from 'assets/players/Malfurion.png';
// @ts-ignore
import Rexxar from 'assets/players/Rexxar.png';

const classesDB = [
	{
		id: 2,
		name: 'Druid',
	},
	{
		id: 3,
		name: 'Hunter',
	},
	{
		id: 4,
		name: 'Mage',
	},
	{
		id: 5,
		name: 'Paladin',
	},
	{
		id: 6,
		name: 'Priest',
	},
	{
		id: 7,
		name: 'Rogue',
	},
	{
		id: 8,
		name: 'Shaman',
	},
	{
		id: 9,
		name: 'Warlock',
	},
	{
		id: 10,
		name: 'Warrior',
	},
	{
		id: 12,
		name: 'Neutral',
	},
];
const charactersDB = [
	{
		id: 1,
		name: 'Jaina',
		image: Jaina,
	},
	{
		id: 2,
		name: 'Malfurion',
		image: Malfurion,
	},
	{
		id: 3,
		name: 'Rexxar',
		image: Rexxar,
	},
];

const getCharacterClass = (characterId: number): number => {
	if (characterId === 1) {
		return 4;
	} else if (characterId === 2) {
		return 2;
	} else if (characterId === 3) {
		return 3;
	}
	return 0;
};

export const getClasses = () => {};

export const getCharacters = () => {};
