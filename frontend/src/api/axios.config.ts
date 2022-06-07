import axios from 'axios';
import { API_URL } from './url';

export const axiosConfig = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
