import React from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';
import Svg, { Path } from "react-native-svg"

type topBarProps = {
    navigation: any;
};

function Component ({ navigation }: topBarProps) {
    return (
        <View style={{ flexDirection: "row", padding: 20, paddingTop: 10, marginBottom: 10 }}>
            <Text style={{ color: "#1DB954", fontSize: 32, fontWeight: 700 }}>Music App</Text>
            <View style={{ flexGrow: 1 }}></View>
            <Pressable onPress={() => { navigation.push('Search') }}>
                <Svg
                    width={38}
                    height={38}
                    viewBox='0 0 24 24'
                    fill={"#ffffff"}>
                    <Path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                </Svg>
            </Pressable>
        </View>
    );
}

export default Component;