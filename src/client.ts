import axois from 'axios';
import authData from '../api_key.json';

const authUrl = `https://eu.battle.net/oauth/token?client_id=${authData.id}&client_secret=${authData.secret}&grant_type=client_credentials`;
const baseURL = 'https://eu.api.blizzard.com/data/wow/';
let token = '';

const client = axois.create({
	baseURL,
});

client.interceptors.request.use(async (config) => {
	if (!token) {
		await getAccessToken();
	}

	const params = {
		region: 'eu',
		namespace: 'static-eu',
		locale: 'en_US',
		access_token: token,
	};

	config.params = config.params || params;

	return config;
});

export const getAccessToken = async () => {
	const data = await axois.get(authUrl);
	token = data.data.access_token;
};

export const login = (characterId) => {
	return new Promise(resolve => {
		setTimeout(() => {

		}, 1000)
	});
};
