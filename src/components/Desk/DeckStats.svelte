<script lang="ts">
	import { state } from '../../store/deck';
	import { state as player } from '../../store/player';

	const getNotNullCards = (cards) => cards.filter((card) => card);

	let averageMana;
	const getAverage = () => {
		const cards = getNotNullCards($state);
		if (!cards.length) return 0;

		return (
			cards.reduce((summary, { manaCost }) => summary + manaCost, 0) /
			cards.length
		);
	};
	$: averageMana = getAverage($state);

	let type;
	const getType = () => {
		const cards = getNotNullCards($state);
		if (!cards.length) return 'Empty';

		let summaryAttack = 0;
		let summaryHealth = 0;

		cards.forEach(({ attack, health }) => {
			summaryAttack += attack;
			summaryHealth += health;
		});

		if (summaryHealth > summaryAttack) {
			return 'Tank';
		} else if (summaryAttack > summaryHealth) {
			return 'Damager';
		} else {
			return 'Balanced';
		}
	};
	$: type = getType($state);

	let spec;
	const getSpec = () => {
		const cards = getNotNullCards($state);
		if (!cards.length) return 0;

		const specCard = cards.filter(({ classId }) => classId === $player.classId);
		return (100 / cards.length) * specCard.length;
	};
	$: spec = getSpec($state);

	let conclusion;
	const getConclusion = () => {
		const number = Math.floor(Math.random() * 5);

		let text;
		if (number === 0) {
			text = "It's baby's deck";
		} else if (number === 1) {
			text = 'Have mercy!';
		} else if (number === 2) {
			text = 'Not bad';
		} else if (number === 3) {
			text = 'This is serious';
		} else {
			text = 'Blood!!!';
		}

		return {
			text,
			number,
		};
	};
	$: conclusion = getConclusion($state);
</script>

<style type="text/scss">
	.stats {
		height: 62px;

		padding: 26px 10px 0;

		&__list {
			display: flex;
			justify-content: space-between;
			align-items: center;

			width: 100%;
			height: 100%;

			margin: 0;
			padding: 0;

			list-style: none;
		}

		&__item {
			display: flex;

			p {
				color: #e0e0e0;
			}

			span {
				margin-left: 5px;

				&.low,
				&.tank {
					color: #f5000c;
				}

				&.medium,
				&.damager {
					color: #fce100;
				}

				&.high,
				&.balanced {
					color: #388e3c;
				}
			}
		}

		&__conclusion {
			display: flex;
			flex-direction: column;
			align-items: center;

			padding-top: 36px;

			color: #fff;

			&-title {
				margin-top: 17px;
				font-size: 18px;
			}

			&-text {
				margin-bottom: 10px;
				font-size: 22px;
			}
		}

		&__face {
			&_wrap {
				width: 200px;
				height: 200px;

				position: relative;
				overflow: hidden;

				border-radius: 6px;
				box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.8);
			}

			width: calc(100% * 5);
			height: 100%;

			position: absolute;
			top: 0;
			left: 0;

			background-image: url(assets/difficulty-levels.jpg);
			background-size: contain;

			transition: left 0.3s ease-out;
		}
	}
</style>

<div class="stats">
	{#if getNotNullCards($state).length}
		<ul class="stats__list">
			<li class="stats__item stats__item_spec">
				<p>Specialization</p>
				<span class={spec > 66.6 ? 'high' : spec > 33.3 ? 'medium' : 'low'}>
					{spec.toFixed(2)}%
				</span>
			</li>
			<li class="stats__item stats__item_type">
				<p>Type</p>
				<span class={type.toLowerCase()}>{type}</span>
			</li>
			<li class="stats__item stats__item_mana">
				<p>Average mana cost</p>
				<span class={averageMana > 3 && averageMana < 7 ? 'high' : 'low'}>
					{averageMana.toFixed(2)}
				</span>
			</li>
		</ul>
	{/if}
	{#if getNotNullCards($state).length === 4}
		<div class="stats__conclusion">
			<p class="stats__conclusion-title">Blazkowicz says:</p>
			<p class="stats__conclusion-text">{conclusion.text}</p>
			<div class="stats__face_wrap">
				<div class="stats__face" style="left: -{conclusion.number}00%;" />
			</div>
		</div>
	{/if}
</div>
