import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { COLORS, WELCOMEMESSAGE } from '../constants';

dayjs.extend(utc);

export const preventNegativeValue = (n: number): number =>
	Math.abs(n) >= 1 ? Math.abs(n) : 1;

export const getRandomColor = (): string => {
	const keys = Object.keys(COLORS);

	return keys[Math.floor(Math.random() * keys.length)];
};

export const getLineType = (type: string, width: number): number[] => {
	switch (type) {
		case 'default':
			return [];
		case 'dashed':
			return [width * 3, width * 2];
		case 'dotted':
			return [width, width * 2];
		default:
			return [];
	}
};

export const getUtcTime = (): string => dayjs.utc().format();

export const getLocalTime = (UtcTime: string): string =>
	dayjs.utc(UtcTime).local().format('HH:mm');

export const getCurrentTime = (): string => getLocalTime(getUtcTime());

export const getWelcomeMessage = (): string[] => Array.from(WELCOMEMESSAGE);
