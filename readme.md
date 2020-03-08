# tailwind-rn ![Status](https://github.com/vadimdemedes/tailwind-rn/workflows/Test/badge.svg)

> Use [Tailwind CSS](https://tailwindcss.com) in [React Native](https://reactnative.dev) projects

## Install

```
$ npm install tailwind-rn
```

## Usage

Import `tailwind-rn` module and use any of the supported utilities from [Tailwind CSS](https://tailwindcss.com) in your [React Native](https://reactnative.dev) views.

```js
import {SafeAreaView, View} from 'react-native';
import tailwind from 'tailwind-rn';

const App = () => (
	<SafeAreaView style={tailwind('h-full')}>
		<View style={tailwind('pt-12 items-center')}>
			<View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
				<Text style={tailwind('text-blue-800 font-semibold')}>
					Hello Tailwind
				</Text>
			</View>
		</View>
	</SafeAreaView>
);
```

<img src="screenshot.jpg" width="544">

`tailwind` function returns a simple object with styles, which can be used in any React Native view, such as `<View>`, `<Text>` and others.

```js
tailwind('pt-12 items-center');
//=> {
//     paddingTop: 48,
//     alignItems: 'center'
//   }
```

## API

### tailwind(classNames)

#### classNames

Type: `string[]`

Array of Tailwind CSS classes you want to generate styles for.

### getColor(color)

Get color value from Tailwind CSS color name.

```js
import {getColor} from 'tailwind-rn';

getColor('blue-500');
//=> '#ebf8ff'
```
