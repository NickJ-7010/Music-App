import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, View, Image, Text } from 'react-native';
import youtube from './YouTube';
import Animated, { useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import TrackModal from './TrackModal';
import IconRender from './IconRender';

const { width } = Dimensions.get('screen');

function Component ({ navigation, route }: any) {
    const [data, setData]: [any, any] = useState(undefined);
    const [trunk, setTrunk]: [any, any] = useState(true);

    const type = route.params.type;

    useEffect(() => {
        if (!type) {
            youtube.getAlbum(route.params.id).then(album => {
                setData(album);
            });
        } else if (type == 1) {
            youtube.getPlaylist(route.params.id).then(playlist => {
                setData(playlist);
            });
        } else if (type == 2) {
            // TODO: Handle local playlist
        }
    }, []);

    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(animatedRef);

    const safeAreaInsets = useSafeAreaInsets();

    var content;

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
        height: 100
    }));

    const headingStyle = useAnimatedStyle(() => ({
        paddingTop: safeAreaInsets.top + 10,
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        transform: [{ translateY: scrollOffset.value < 0 ? scrollOffset.value : 0 }]
    }));

    if (data) {
        content = <>
            <Animated.View style={headingStyle}>
                <Pressable style={{ alignItems: 'center' }} onPress={() => youtube.handlePress(data.header.strapline_text_one.endpoint, navigation)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 14, aspectRatio: 1, borderRadius: 50, marginRight: 5 }} source={{ uri: data.header.strapline_thumbnail.contents[0].url }} />
                        <Text style={{ color: '#ffffff', fontSize: 12 }}>{data.header.strapline_text_one.text}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {data.header.subtitle_badge?.length ? data.header.subtitle_badge.map((badge: any) => <View style={{ paddingTop: 1, marginRight: 3 }}><IconRender icon={badge.icon_type} fill={"rgba(255, 255, 255, 0.6)"} width={12}></IconRender></View>) : <></>}
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}>{data.header.subtitle.text}</Text>
                    </View>
                </Pressable>
                <Image style={{ width: "60%", aspectRatio: 1, marginTop: 15, marginBottom: 15, borderRadius: 5 }} source={{ uri: data.header.thumbnail.contents[0].url }} />
                <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 700, textAlign: 'center' }}>{data.header.title.text}</Text>
                {data.header.description ? <Pressable style={{ marginTop: 10, marginBottom: 10 }} onPress={() => setTrunk(!trunk)}><Text numberOfLines={trunk ? 2 : 0} style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: 14, textAlign: 'center' }}>{data.header.description.description.text}</Text></Pressable> : <></>}
                <View style={{ flexDirection: 'row' }}>

                </View>
            </Animated.View>
            <View>
                {data.contents.map((item: any) => <View style={{ marginTop: 10 }}>
                    <ItemRender data={item} thumbnail={data.header.thumbnail.contents} navigation={navigation}></ItemRender>
                </View>)}
            </View>
            <Text style={{ color: 'rgba(255, 255, 255, 0.75)', textAlign: 'center', padding: 15 }}>{data.header.second_subtitle.text}</Text>
            {data.sections ? data.sections.map((section: any) => <>
                <Text style={{ color: 'white', fontWeight: 600, fontSize: 22, padding: 15 }}>{section.header.title.text}</Text>
                {section.contents.map((item: any) => <AlbumRender data={item} navigation={navigation}></AlbumRender>)}
            </>) : <></>}
            <View style={{ height: 100 }}></View>
        </>
    }

    return <View style={{ backgroundColor: "#030303", height: "100%" }}>
        <Image blurRadius={25} style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 0.75 }} source={{ uri: data?.header?.thumbnail?.contents?.[0]?.url ?? youtube.backgroundUrl }} />
        <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
            locations={[0.25,0.75,1]}
            colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
            style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
        </LinearGradient>
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
            <Pressable style={{ marginRight: 8 }} onPress={() => { navigation.push("Search") }}>
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

function ItemRender ({ data, thumbnail, navigation }: { data: any, thumbnail: any, navigation: any }) {
    const [isVisible, setVisible] = useState(false);

    return <>
        <TrackModal data={data} providedThumbnails={thumbnail} isVisible={isVisible} setVisible={setVisible} navigation={navigation} ></TrackModal>
        <Pressable key={'pressable' + data.id} onPress={() => youtube.handlePress(data, navigation)} onLongPress={() => setVisible(true)}>
            <View style={{ padding: 5, paddingLeft: 15, height: 60, flexDirection: "row", alignItems: "center" }}>
                <Text style={{ width: 30, color: 'white', fontWeight: 500, fontSize: 16, textAlign: 'center' }}>{data.index.text}</Text>
                <View style={{ marginLeft: 10, flexGrow: 1, width: 0 }}>
                    <Text numberOfLines={1} style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>{data.flex_columns[0].title.text}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {data.badges?.map((badge: any) => <View style={{ paddingTop: 2, marginRight: 4 }}><IconRender icon={badge.icon_type} fill={"rgba(255, 255, 255, 0.5)"} width={16}></IconRender></View>)}
                        <Text numberOfLines={1} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 500 }}>{[data.fixed_columns[0].title.text, ...data.flex_columns.slice(1).map((column: any) => column.title.text).filter((str: any) => str != undefined)].join(' • ')}</Text>
                    </View>
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
    </>
}

function AlbumRender ({ data, navigation }: { data: any, navigation: any }) {
    const [isVisible, setVisible] = useState(false);

    return <>
        <TrackModal data={data} isVisible={isVisible} setVisible={setVisible} navigation={navigation} ></TrackModal>
        <Pressable key={'pressable' + data.id} onPress={() => youtube.handlePress(data, navigation)} onLongPress={() => setVisible(true)}>
            <View style={{ margin: 5, marginLeft: 15, flexDirection: "column", alignItems: "flex-start", width: 150 }}>
                <Image width={150} height={150} style={{ borderRadius: 5, marginBottom: 5 }} source={{ uri: data.thumbnail[0].url }} />
                <Text numberOfLines={2} style={{ color: "#ffffff", fontSize: 16, fontWeight: 600 }}>{data.title.text}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {data.badges?.length ? data.badges.map((badge: any) => <View style={{ paddingTop: 2, marginRight: 4 }}><IconRender icon={badge.icon_type} fill={"rgba(255, 255, 255, 0.5)"} width={16}></IconRender></View>) : <></>}
                    <Text numberOfLines={2} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 14, fontWeight: 500 }}>{data.subtitle.text}</Text>
                </View>
            </View>
        </Pressable>
    </>
}

export default Component;