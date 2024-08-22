import React, { useEffect, useState } from 'react';
import { View, Image, SafeAreaView, Pressable, Text } from 'react-native';
import youtube from './YouTube';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Component ({ navigation, route }: any) {
    const [data, setData]: [any, any] = useState(undefined);

    useEffect(() => {
        youtube.getArtist(route.params.id).then(artist => {
            console.log(JSON.stringify(artist));
            setData(artist);
        });
    }, []);

    const safeAreaInsets = useSafeAreaInsets();

    var content;

    if (data) {
        content = <View>
            <Text style={{ fontWeight: 700, fontSize: 42, color: 'white', textAlign: 'center', marginTop: 185}}>{data.header.title.text}</Text>
        </View>
    }

    return <View style={{ backgroundColor: "#030303", height: "100%" }}>
        <Image style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 0.75 }} source={{ uri: data && data.header.thumbnail.length != 0 ? data.header.thumbnail.length ? data.header.thumbnail[0].url : data.header.thumbnail.contents[0].url : youtube.backgroundUrl }} />
        <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
            locations={[0.25,0.75,1]}
            colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
            style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
        </LinearGradient>
        <SafeAreaView style={{ paddingTop: safeAreaInsets.top }}>
            <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
                <View style={{ width: 8 }}></View>
                <Pressable onPress={() => navigation.pop()}>
                    <Svg
                        width={32}
                        height={32}
                        viewBox='0 -960 960 960'
                        fill={"#ffffff"}>
                        <Path d="M560-267.69 347.69-480 560-692.31 588.31-664l-184 184 184 184L560-267.69Z" />
                    </Svg>
                </Pressable>
                <View style={{ flexGrow: 1 }}></View>
                <Pressable style={{ marginRight: 14 }} onPress={() => { console.log('Open Share Sheet') }}>
                    <Svg
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill={"#ffffff"}>
                        <Path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z" />
                    </Svg>
                </Pressable>
                <Pressable style={{ marginRight: 8, marginLeft: 14 }} onPress={() => { navigation.push("Search") }}>
                    <Svg
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill={"#ffffff"}>
                        <Path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z" />
                    </Svg>
                </Pressable>
                <View style={{ width: 12 }}></View>
            </View>
        </SafeAreaView>
        {content}
    </View>
}

export default Component;