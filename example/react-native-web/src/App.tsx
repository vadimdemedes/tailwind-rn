import {SafeAreaView, View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const App = () => {
	const {tailwind} = useTailwind();

	return (
		<SafeAreaView style={tailwind('h-full')}>
			<View style={tailwind('pt-12 items-center')}>
				<View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
					<Text style={tailwind('text-blue-800 font-semibold m-1 text-blue-800')}>
						Hello Tailwind
					</Text>
				</View>
			</View>
			<Text style={tailwind('pt-12 text-4xl font-light text-center mb-4')}>
				Active Breakpoint Indicator
			</Text>
			<View style={tailwind('flex-row justify-center items-center')}>
				<Text
					style={tailwind(
						'font-semibold m-1 text-blue-800 text-4xl md:text-xs lg:text-xs xl:text-xs 2xl:text-xs'
					)}
				>
					sm
				</Text>
				<Text
					style={tailwind(
						'font-semibold m-1 text-blue-800 text-xs md:text-4xl lg:text-xs xl:text-xs 2xl:text-xs'
					)}
				>
					md
				</Text>
				<Text
					style={tailwind(
						'font-semibold m-1 text-blue-800 text-xs md:text-xs lg:text-4xl xl:text-xs 2xl:text-xs'
					)}
				>
					lg
				</Text>
				<Text
					style={tailwind(
						'font-semibold m-1 text-blue-800 text-xs md:text-xs lg:text-xs xl:text-4xl 2xl:text-xs'
					)}
				>
					xl
				</Text>
				<Text
					style={tailwind(
						'font-semibold m-1 text-blue-800 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-4xl'
					)}
				>
					2xl
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default App;
