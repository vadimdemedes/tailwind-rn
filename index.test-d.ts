import {expectType} from 'tsd';
import tailwind, {getColor} from '.';

expectType<{[key: string]: string}>(tailwind('bg-blue-200'));
expectType<string>(getColor('blue-200'));
