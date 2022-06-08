import axios from 'axios';
import { HTTP_URL } from './urls';

export const axiosConfig = axios.create({
	baseURL: HTTP_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
