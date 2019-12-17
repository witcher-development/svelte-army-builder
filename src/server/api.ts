import axois from 'axios';
import authData from '../../api_key.json';

const authUrl = `https://eu.battle.net/oauth/token?client_id=${authData.id}&client_secret=${authData.secret}&grant_type=client_credentials`;
const baseURL = 'https://eu.api.blizzard.com/hearthstone/';
let token = '';

export const client = axois.create({
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

	config.params = config.params ? Object.assign(config.params, params) : params;

	return config;
});

const getAccessToken = async () => {
	const data = await axois.get(authUrl);
	token = data.data.access_token;
};
