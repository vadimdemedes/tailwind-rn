import {expectType} from 'tsd';
import tailwind, {getColor, create} from '.';

expectType<Record<string, string>>(tailwind('bg-blue-200'));
expectType<string>(getColor('blue-200'));
expectType<Record<string, string>>(create({}).tailwind('bg-blue-200'));
expectType<string>(create({}).getColor('blue-200'));
expectType<string>(create({}).getColor('blue-200 opacity-50'));
