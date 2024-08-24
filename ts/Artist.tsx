import React, { useEffect, useState } from 'react';
import { View, Pressable, Dimensions, Text, Image, ScrollView } from 'react-native';
import youtube from './YouTube';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import TrackModal from './TrackModal';

const { width } = Dimensions.get('screen');

function Component ({ navigation, route }: any) {
    const [data, setData]: [any, any] = useState(undefined);
    const [trunk, setTrunk]: [any, any] = useState(true);

    useEffect(() => {
        youtube.getArtist(route.params.id).then(artist => {
            setData(artist);
        });
    }, []);

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(animatedRef);

    const safeAreaInsets = useSafeAreaInsets();

    var content;

    const imageStyle = useAnimatedStyle(() => ({
        position: "absolute",
        top: 0,
        width: width,
        height: width - Math.min(scrollOffset.value, 0),
        opacity: 0.75 - Math.max(scrollOffset.value / width, 0)
    }));

    const textStyle = useAnimatedStyle(() => ({
        fontSize: 42,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 32,
        height: 'auto',
        opacity: (250 - Math.abs(scrollOffset.value)) / 250
    }));

    const headerTextStyle = useAnimatedStyle(() => ({
        width: "70%",
        paddingLeft: 60,
        color: '#ffffff',
        fontSize: 20,
        opacity: (scrollOffset.value - 175) / 100
    }));

    const headerStyle = useAnimatedStyle(() => ({
        paddingTop: safeAreaInsets.top - 5,
        flexGrow: 1,
        height: 100,
        backgroundColor: scrollOffset.value > width - 100 ? '#000000' : 'transparent',
        borderBottomWidth: 1,
        borderColor: `rgba(42,42,42,${(scrollOffset.value - 250) / 20})`
    }));

    const profileImageStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        bottom: 100,
        left: width / 2 - width / 5,
        width: width * 2 / 5,
        aspectRatio: 1,
        borderRadius: 1000,
        opacity: (250 - Math.abs(scrollOffset.value)) / 250
    }));

    if (data) {
        content = <>
            <View style={{ width: "100%", aspectRatio: 1, flexDirection: 'column-reverse' }}>
                <LinearGradient
                    start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
                    locations={[0.25,0.75,1]}
                    colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
                    style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
                </LinearGradient>
                {data.header.foreground_thumbnail ? <Animated.Image style={profileImageStyle} source={{ uri: data.header.foreground_thumbnail[0].url }} /> : <></>}
                <Animated.Text style={[{ fontWeight: 700 }, textStyle]}>{data.header.title.text}</Animated.Text>
            </View>
            <View style={{ backgroundColor: '#000000' }}>
                {data.sections.map((section: any) => <>
                    <Text style={{ color: 'white', fontWeight: 600, fontSize: 22, padding: 15 }}>{section.header?.title?.text ?? section.title.text}</Text>
                    {section.type == 'MusicShelf' ? <View style={{ flexDirection: 'column' }}>
                        {section.contents.map((item: any) => <ItemRender section={section} data={item} navigation={navigation}></ItemRender>)}
                    </View> : <ScrollView horizontal={true}>
                        {section.contents.map((item: any) => <ItemRender section={section} data={item} navigation={navigation}></ItemRender>)}
                    </ScrollView>}
                    
                </>)}
                {data.header.description ? <>
                    <Text style={{ color: 'white', fontWeight: 500, fontSize: 28, paddingLeft: 15, marginBottom: 20 }}>About</Text>
                    <Text numberOfLines={trunk ? 6 : 0} style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400, fontSize: 15, paddingLeft: 15, paddingRight: 15, marginBottom: 20 }}>{data.header.description.text}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Pressable onPress={() => setTrunk(!trunk)}>
                            <Svg
                                width={32}
                                height={32}
                                viewBox='0 -960 960 960'
                                fill={"#ffffff"}>
                                <Path d={trunk ? "M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" : "M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"} />
                            </Svg>
                        </Pressable>
                    </View>
                </> : <></>}
            </View>
            <View style={{ height: 75 }}></View>
        </>
    }

    return <View style={{ backgroundColor: "#030303", height: "100%" }}>
        <Animated.Image style={imageStyle} source={{ uri: data && data.header.thumbnail.length != 0 ? data.header.thumbnail.length ? data.header.thumbnail[0].url : data.header.thumbnail.contents[0].url : youtube.backgroundUrl }} />
        {!data ? <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
            locations={[0.25,0.75,1]}
            colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
            style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
        </LinearGradient> : <></>}
        <Animated.ScrollView ref={animatedRef} style={{ position: 'absolute', width: "100%", height: "100%" }} stickyHeaderIndices={[0]}>
            <View style={{ height: 'auto', marginBottom: -100 }}>
                <Animated.View style={headerStyle}>
                    <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                        <Animated.Text numberOfLines={1} style={[{ fontWeight: 500 }, headerTextStyle]}>{data?.header?.title?.text}</Animated.Text>
                    </View>
                </Animated.View>
            </View>
            {content}
        </Animated.ScrollView>
        <View style={{ position: 'absolute', paddingTop: safeAreaInsets.top + 10, flexDirection: 'row', maxWidth: 'auto' }}>
            <Pressable style={{ paddingLeft: 8 }} onPress={() => navigation.pop()}>
                <Svg
                    width={32}
                    height={32}
                    viewBox='0 -960 960 960'
                    fill={"#ffffff"}>
                    <Path d="M560-267.69 347.69-480 560-692.31 588.31-664l-184 184 184 184L560-267.69Z" />
                </Svg>
            </Pressable>
        </View>
        <View style={{ position: 'absolute', right: 0, paddingTop: safeAreaInsets.top + 15, flexDirection: 'row' }}>
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
    </View>
}

function ItemRender ({ section, data, navigation }: { section: any, data: any, navigation: any }) {
    const [isVisible, setVisible] = useState(false);

    return section.type == 'MusicShelf' ? <>
        <TrackModal data={data} isVisible={isVisible} setVisible={setVisible} navigation={navigation} ></TrackModal>
        <Pressable key={'pressable' + data.id} onPress={() => youtube.handlePress(data, navigation)} onLongPress={() => setVisible(true)}>
            <View style={{ padding: 7, paddingLeft: 15, height: 69, flexDirection: "row", alignItems: "center" }}>
                <Image width={55} height={data.thumbnail.contents[0].height / data.thumbnail.contents[0].width * 55} style={{ borderRadius: 3 }} source={{ uri: data.thumbnail.contents[0].url }} />
                <View style={{ marginLeft: 15, flexGrow: 1, width: 0 }}>
                    <Text numberOfLines={1} style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>{data.flex_columns[0].title.text}</Text>
                    <Text numberOfLines={1} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 500 }}>{data.flex_columns.slice(1).map((column: any) => column.title.text).join(' • ')}</Text>
                </View>
                <Pressable onPress={() => setVisible(true)} onLongPress={() => setVisible(true)} style={{ height: "100%", paddingLeft: 5, paddingRight: 5 }}>
                    <View style={{ flexGrow: 1, justifyContent: "center" }}>
                        <Svg
                            width={24}
                            height={24}
                            viewBox='0 -960 960 960'
                            fill={"#ffffff"}>
                            <Path d="M480-218.46q-16.5 0-28.25-11.75T440-258.46q0-16.5 11.75-28.25T480-298.46q16.5 0 28.25 11.75T520-258.46q0 16.5-11.75 28.25T480-218.46ZM480-440q-16.5 0-28.25-11.75T440-480q0-16.5 11.75-28.25T480-520q16.5 0 28.25 11.75T520-480q0 16.5-11.75 28.25T480-440Zm0-221.54q-16.5 0-28.25-11.75T440-701.54q0-16.5 11.75-28.25T480-741.54q16.5 0 28.25 11.75T520-701.54q0 16.5-11.75 28.25T480-661.54Z" />
                        </Svg>
                    </View>
                </Pressable>
            </View>
        </Pressable>
    </> : <>
        <TrackModal data={data} isVisible={isVisible} setVisible={setVisible} navigation={navigation} ></TrackModal>
        <Pressable key={'pressable' + data.id} onPress={() => youtube.handlePress(data, navigation)} onLongPress={() => setVisible(true)}>
            <View style={{ margin: 5, marginLeft: 15, flexDirection: "column", alignItems: data.item_type == 'artist' ? "center" : "flex-start", width: data.subtitle.runs[0].text == 'Album' ? 200 : data.item_type == 'video' ? data.thumbnail[0].width / data.thumbnail[0].height * 150 : 150 }}>
                <Image width={data.subtitle.runs[0].text == 'Album' ? 200 : data.item_type == 'video' ? data.thumbnail[0].width / data.thumbnail[0].height * 150 : 150} height={data.item_type ==  'video' ? 150 : data.thumbnail[0].height / data.thumbnail[0].width * (data.subtitle.runs[0].text == 'Album' ? 200 : 150)} style={{ borderRadius: data.item_type == 'artist' ? 1000 : 8, marginBottom: 5 }} source={{ uri: data.thumbnail[0].url }} />
                <Text numberOfLines={2} style={{ color: "#ffffff", fontSize: 16, fontWeight: 600 }}>{data.title.text}</Text>
                <Text numberOfLines={2} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 14, fontWeight: 500 }}>{data.subtitle.text}</Text>
            </View>
        </Pressable>
    </>
}

export default Component;