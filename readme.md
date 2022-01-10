# tailwind-rn ![Status](https://github.com/vadimdemedes/tailwind-rn/workflows/test/badge.svg)

> Use [Tailwind CSS](https://tailwindcss.com) in [React Native](https://reactnative.dev) projects

All styles are generated directly from Tailwind's output, so they're always up-to-date with the latest Tailwind.

- [x] JIT mode
- [x] Responsive breakpoints (e.g. `sm`, `md`, `lg`)
- [x] Supports custom configuration

![](header.jpg)

## Install

```
$ npm install tailwind-rn
$ npm install --save-dev tailwindcss
```

Alternatively, run the following command to automatically add `tailwind-rn` to your React Native project:

```
$ npx setup-tailwind-rn
```

## Getting Started

<details>
	<summary>Manual setup</summary>

    ### Manual setup

    1. Install `tailwind-rn`.

    ```
    $ npm install tailwind-rn
    ```

    2. Install Tailwind and `concurrently`.

    ```
    $ npm install --save-dev tailwindcss concurrently
    ```

    3. Create Tailwind config and necessary files.

    ```
    $ npx tailwindcss init
    $ echo '@tailwind utilities;' > input.css
    ```

    4. Add scripts to compile Tailwind styles to package.json.

    ```diff
    {
    	"scripts": {
    +		"build:tailwind": "tailwindcss --input input.css --output tailwind.css --no-autoprefixer && tailwind-rn",
    +		"dev:tailwind": "concurrently "tailwindcss --input input.css --output tailwind.css --no-autoprefixer --watch" "tailwind-rn --watch"
    	}
    }
    ```

</details>

## Usage

Use `useTailwind` React hook and apply any of the [supported utilities](#supported-utilities) from [Tailwind](https://tailwindcss.com) in your [React Native](https://reactnative.dev) views.

```jsx
import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const Hello = () => {
	const tailwind = useTailwind();

	return (
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
};

export default Hello;
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
- [Font Variant Numeric](https://tailwindcss.com/docs/font-variant-numeric) (only `oldstyle-nums`, `lining-nums`, `tabular-nums` and `proportional-nums`)
- [Letter Spacing](https://tailwindcss.com/docs/letter-spacing) (must be used with font size utilities)
- [Line Height](https://tailwindcss.com/docs/line-height) (only fixed line-heights)
- [Text Align](https://tailwindcss.com/docs/text-align)
- [Text Color](https://tailwindcss.com/docs/text-color) (all except `text-current`)
- [Text Opacity](https://tailwindcss.com/docs/text-opacity)
- [Text Decoration](https://tailwindcss.com/docs/text-decoration)
- [Text Transform](https://tailwindcss.com/docs/text-transform)

### Backgrounds

- [Background Color](https://tailwindcss.com/docs/background-color)
- [Background Opacity](https://tailwindcss.com/docs/background-opacity)

### Borders

- [Border Color](https://tailwindcss.com/docs/border-color)
- [Border Opacity](https://tailwindcss.com/docs/border-opacity)
- [Border Style](https://tailwindcss.com/docs/border-style) (all except `border-current`)
- [Border Width](https://tailwindcss.com/docs/border-width)
- [Border Radius](https://tailwindcss.com/docs/border-radius)

### Effects

- [Opacity](https://tailwindcss.com/docs/opacity)

### Interactivity

- [Pointer Events](https://tailwindcss.com/docs/pointer-events)
