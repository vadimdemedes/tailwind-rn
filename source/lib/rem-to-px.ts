import emToPx from './em-to-px';

const remToPx = (value: string) => `${emToPx(value, 16)}px`;

export default remToPx;
