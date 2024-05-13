import React from 'react';
import {
    StatusBar,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './Search';

const Stack = createNativeStackNavigator();

function Component ({ children }: any) {
    const backgroundStyle = {
        backgroundColor: true ? "#030303" : "#fff",
        height: "100%"
    };

    return (
        <>
            <StatusBar
                barStyle={true ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <Stack.Navigator initialRouteName="Default" screenOptions={{ animation: "fade_from_bottom", headerShown: false }}>
                <Stack.Screen name="Default" component={children} />
                <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
        </>
    );
}

export default Component;