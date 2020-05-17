import {expectType} from 'tsd';
import tailwind, {getColor, create} from '.';

expectType<{[key: string]: string}>(tailwind('bg-blue-200'));
expectType<string>(getColor('blue-200'));
expectType<{[key: string]: string}>(create({}).tailwind('bg-blue-200'));
expectType<string>(create({}).getColor('blue-200'));
