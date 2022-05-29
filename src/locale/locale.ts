import ru from './messages/ru.json';
import en from './messages/en.json';
import zh from './messages/zh.json';

enum Locale {
	RU = 'RU',
	EN = 'EN',
	ZH = 'ZH',
}

const messages = {
	ru,
	en,
	zh,
};

const availableLangs = [Locale.EN];

export { availableLangs, messages, Locale };
