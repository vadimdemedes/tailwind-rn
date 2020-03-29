# tailwind-rn ![Status](https://github.com/vadimdemedes/tailwind-rn/workflows/test/badge.svg)

> Use [Tailwind CSS](https://tailwindcss.com) in [React Native](https://reactnative.dev) projects

All styles are generated from Tailwind CSS source and not hard-coded, which makes it easy to keep this module up-to-date with latest changes in Tailwind CSS itself.

![](header.jpg)

## Install

```
$ npm install tailwind-rn
```

## Usage

Import `tailwind-rn` module and use any of the [supported utilities](#supported-utilities) from [Tailwind CSS](https://tailwindcss.com) in your [React Native](https://reactnative.dev) views.

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

## Supported Utilities

### Layout

- [Display](https://tailwindcss.com/docs/display) (only `hidden` and `flex`)
- [Overflow](https://tailwindcss.com/docs/overflow) (only `overflow-hidden`, `overflow-scroll` and `overflow-visible`)
- [Position](https://tailwindcss.com/docs/position) (only `relative` and `absolute`)
- [Top / Right / Bottom / Left](https://tailwindcss.com/docs/top-right-bottom-left) (all except `*-auto`)
- [Z-Index](https://tailwindcss.com/docs/z-index) (all except `z-auto`)

### Flexbox

- [Flex Direction](https://tailwindcss.com/docs/flex-direction)
- [Flex Wrap](https://tailwindcss.com/docs/flex-wrap)
- [Align Items](https://tailwindcss.com/docs/align-items)
- [Align Content](https://tailwindcss.com/docs/align-content)
- [Align Self](https://tailwindcss.com/docs/align-self)
- [Justify Content](https://tailwindcss.com/docs/justify-content)
- [Flex](https://tailwindcss.com/docs/flex)
- [Flex Grow](https://tailwindcss.com/docs/flex-grow)
- [Flex Shrink](https://tailwindcss.com/docs/flex-shrink)

### Spacing

- [Padding](https://tailwindcss.com/docs/padding)
- [Margin](https://tailwindcss.com/docs/margin)

### Sizing

- [Width](https://tailwindcss.com/docs/width) (all except `w-auto` and `w-screen`)
- [Min-Width](https://tailwindcss.com/docs/min-width)
- [Max-Width](https://tailwindcss.com/docs/max-width)
- [Height](https://tailwindcss.com/docs/height) (all except `h-auto` and `h-screen`)
- [Min-Height](https://tailwindcss.com/docs/min-height) (all except `min-h-screen`)
- [Max-Height](https://tailwindcss.com/docs/max-height) (only `max-h-full`)

### Typography

- [Font Size](https://tailwindcss.com/docs/font-size)
- [Font Style](https://tailwindcss.com/docs/font-style)
- [Font Weight](https://tailwindcss.com/docs/font-weight)
- [Letter Spacing](https://tailwindcss.com/docs/letter-spacing)
- [Line Height](https://tailwindcss.com/docs/line-height) (only fixed line-heights)
- [Text Align](https://tailwindcss.com/docs/text-align)
- [Text Color](https://tailwindcss.com/docs/text-color)
- [Text Decoration](https://tailwindcss.com/docs/text-decoration)
- [Text Transform](https://tailwindcss.com/docs/text-transform)

### Backgrounds

- [Background Color](https://tailwindcss.com/docs/background-color)

### Borders

- [Border Color](https://tailwindcss.com/docs/border-color)
- [Border Style](https://tailwindcss.com/docs/border-style)
- [Border Width](https://tailwindcss.com/docs/border-width)
- [Border Radius](https://tailwindcss.com/docs/border-radius)

### Effects

- [Opacity](https://tailwindcss.com/docs/opacity)

### Interactivity

- [Pointer Events](https://tailwindcss.com/docs/pointer-events)

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
