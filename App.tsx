import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Svg, { Path } from "react-native-svg";
import Home from './ts/Home';
import Library from './ts/Library';
import Settings from './ts/Settings';
import PlayerShelf from './ts/PlayerShelf';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={(props) => (
                <PlayerShelf bottomTabBar={<BottomTabBar {...props} />} />
            )} screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#212121', borderTopColor: "rgba(255, 255, 255, .15)", borderTopWidth: 1 }, tabBarLabelStyle: { fontSize: 15 }, tabBarActiveTintColor: "#00D19D" }}>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({ color, size }) => <Svg
                        width={size}
                        height={size}
                        viewBox='0 0 24 24'
                        fill={color}>
                        <Path d={color == "#00D19D" ? "M4,10V21h6V15h4v6h6V10L12,3Z" : "M12,4.33l7,6.12V20H15V14H9v6H5V10.45l7-6.12M12,3,4,10V21h6V15h4v6h6V10L12,3Z"} />
                    </Svg>}} />
                <Tab.Screen name="Library" component={Library} options={{
                    tabBarIcon: ({ color, size }) => <Svg
                        width={size}
                        height={size}
                        viewBox='0 0 24 24'
                        fill={color}>
                        <Path d={color == "#00D19D" ? "M18,21H3V6h1v14h14V21z M21,3v15H6V3H21z M16,6h-3v5.28C12.7,11.11,12.37,11,12,11c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2V8 h2V6z" : "M16,6v2h-2v5c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2c0.37,0,0.7,0.11,1,0.28V6H16z M18,20H4V6H3v15h15V20z M21,3H6v15h15V3z M7,4h13v13H7V4z"} />
                    </Svg>}} />
                <Tab.Screen name="Settings" component={Settings} options={{
                    tabBarIcon: ({ color, size }) => <Svg
                        width={size}
                        height={size}
                        viewBox={color == "#00D19D" ? '0 -960 960 960' : '0 0 24 24' }
                        fill={color}>
                        <Path d={color == "#00D19D" ? "m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z" : "M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4 S14.21,8,12,8L12,8z M13.22,3l0.55,2.2l0.13,0.51l0.5,0.18c0.61,0.23,1.19,0.56,1.72,0.98l0.4,0.32l0.5-0.14l2.17-0.62l1.22,2.11 l-1.63,1.59l-0.37,0.36l0.08,0.51c0.05,0.32,0.08,0.64,0.08,0.98s-0.03,0.66-0.08,0.98l-0.08,0.51l0.37,0.36l1.63,1.59l-1.22,2.11 l-2.17-0.62l-0.5-0.14l-0.4,0.32c-0.53,0.43-1.11,0.76-1.72,0.98l-0.5,0.18l-0.13,0.51L13.22,21h-2.44l-0.55-2.2l-0.13-0.51 l-0.5-0.18C9,17.88,8.42,17.55,7.88,17.12l-0.4-0.32l-0.5,0.14l-2.17,0.62L3.6,15.44l1.63-1.59l0.37-0.36l-0.08-0.51 C5.47,12.66,5.44,12.33,5.44,12s0.03-0.66,0.08-0.98l0.08-0.51l-0.37-0.36L3.6,8.56l1.22-2.11l2.17,0.62l0.5,0.14l0.4-0.32 C8.42,6.45,9,6.12,9.61,5.9l0.5-0.18l0.13-0.51L10.78,3H13.22 M14,2h-4L9.26,4.96c-0.73,0.27-1.4,0.66-2,1.14L4.34,5.27l-2,3.46 l2.19,2.13C4.47,11.23,4.44,11.61,4.44,12s0.03,0.77,0.09,1.14l-2.19,2.13l2,3.46l2.92-0.83c0.6,0.48,1.27,0.87,2,1.14L10,22h4 l0.74-2.96c0.73-0.27,1.4-0.66,2-1.14l2.92,0.83l2-3.46l-2.19-2.13c0.06-0.37,0.09-0.75,0.09-1.14s-0.03-0.77-0.09-1.14l2.19-2.13 l-2-3.46L16.74,6.1c-0.6-0.48-1.27-0.87-2-1.14L14,2L14,2z"} />
                    </Svg>}} />
            </Tab.Navigator>
        </NavigationContainer>
        //<>
        //    <StatusBar
        //        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        //        backgroundColor={backgroundStyle.backgroundColor}
        //    />
        //    <View style={{ display: "flex", flexDirection: "row", padding: 10 }}>
        //        <Text style={{ color: "#ff0000", fontSize: 32 }}>Music App</Text>
        //        <View style={{ flexGrow: 1 }}></View>
        //        <Pressable onPress={() => Alert.alert('title', 'message')} style={{ backgroundColor: "#007AFF", width: 40, height: 40, borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
        //            <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>S</Text>
        //        </Pressable>
        //    </View>
        //    <NavigationContainer>
        //        <Stack.Navigator initialRouteName="Home">
        //            <Stack.Screen name="Home" component={Home} />
        //        </Stack.Navigator>
        //    </NavigationContainer>
        //</>
    );
}

//const styles = StyleSheet.create({
//    sectionContainer: {
//        marginTop: 32,
//        paddingHorizontal: 24,
//    },
//    sectionTitle: {
//        fontSize: 24,
//        fontWeight: '600',
//    },
//    sectionDescription: {
//        marginTop: 8,
//        fontSize: 18,
//        fontWeight: '400',
//    },
//    highlight: {
//        fontWeight: '700',
//    },
//});

export default App;
