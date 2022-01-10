# Migrate from v3.x

Before you start migrating `tailwind-rn` to the latest version, make sure to read the [release notes](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.0.0) of Tailwind 3.0 first.
Then follow the [instructions](readme.md#getting-started) to set up latest `tailwind-rn`.

This document assumes you've done the steps above and describes what's needed to migrate the code to use the API from 4.x.

Here's a brief overview of what kind of changes you can expect.

Before:

```jsx
import {SafeAreaView, View, Text} from 'react-native';
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

export default App;
```

After:

```jsx
import {SafeAreaView, View, Text} from 'react-native';
import {TailwindProvider, useTailwind} from 'tailwind-rn';
import utilities from './tailwind.json';

const App = () => {
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

const Root = () => (
	<TailwindProvider utilities={utilities}>
		<App />
	</TailwindProvider>
);

export default Root;
```

## 1. Wrap your app with `TailwindProvider`

`TailwindProvider` is used to make Tailwind utilities available to children components. It's recommended to wrap your root app components with it.
It accepts `utilities` property, which should be a parsed JSON object of `tailwind.json` file contents.

```jsx
import {TailwindProvider} from 'tailwind-rn';
import utilities from './utilities.json';

const App = () => (
	<TailwindProvider utilities={utilities}>
		<MyComponent />
	</TailwindProvider>
);
```

## 2. Update how styles are applied

Following the release of Tailwind 3.0, `tailwind-rn` also supports JIT mode only.
This means that there's no `tailwind` function with a default build of Tailwind exported from `tailwind-rn`.
Instead, new `tailwind-rn` exposes a `useTailwind` React hook, which returns the `tailwind` function, similar to the one in 3.x version.

Before:

```jsx
import tailwind from 'tailwind-rn';

const MyComponent = () => {
	return <Text style={tailwind('text-blue-600')}>Hello world</Text>;
};
```

After:

```jsx
import {useTailwind} from 'tailwind-rn';

const MyComponent = () => {
	const tailwind = useTailwind();

	return <Text style={tailwind('text-blue-600')}>Hello world</Text>;
};
```

## 3. Remove code for a custom configuration

Latest `tailwind-rn` supports custom configuration of Tailwind out of the box, so there's no additional steps needed to configure it.
This means that you should remove `styles.json` file from the root of your project and delete code using the [`create`](https://github.com/vadimdemedes/tailwind-rn/blob/9f977e82910d916c5a8684eb6d8b423b6130d785/readme.md#createstyles) function, because it's no longer available.
All your custom styles will automatically become available through `useTailwind` React hook.

## 4. Remove usage of `getColor` function

There's no longer [`getColor`](https://github.com/vadimdemedes/tailwind-rn/blob/9f977e82910d916c5a8684eb6d8b423b6130d785/readme.md#getcolorcolor) function exported from `tailwind-rn`.
This means that you need to update the code to extract Tailwind colors in a different way.

Before:

```jsx
import {getColor} from 'tailwind-rn';

const MyComponent = () => {
	const color = getColor('blue-500 opacity-50');

	return <Text style={{color}}>Hello world</Text>;
};
```

After:

```jsx
import {useTailwind} from 'tailwind-rn';

const MyComponent = () => {
	const tailwind = useTailwind();
	const {color} = tailwind('text-blue-500/50');

	return <Text style={{color}}>Hello world</Text>;
};
```
