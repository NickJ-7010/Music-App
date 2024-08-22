import React from 'react';
import {
    StatusBar,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './Search';
import Artist from './Artist';
import Playlist from './Playlist';

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
                <Stack.Screen name="Artist" component={Artist} />
                <Stack.Screen name="Playlist" component={Playlist} />
            </Stack.Navigator>
        </>
    );
}

export default Component;