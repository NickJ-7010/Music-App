import React, { Fragment, useEffect, useState } from 'react';
import { Dimensions, Pressable, View, Image, Text, ScrollView } from 'react-native';
import youtube from '../YouTube';
import Animated, { useAnimatedRef, useAnimatedStyle, useScrollViewOffset, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import TrackModal from './TrackModal';
import IconRender from './IconRender';
import TrackPlayer from 'react-native-track-player';
import { getPalette } from '@somesoap/react-native-image-palette';

const { width } = Dimensions.get('screen');

function Component ({ navigation, route }: any) {
    const [data, setData]: [any, any] = useState(undefined);
    const [trunk, setTrunk]: [any, any] = useState(true);
    const [isVisible, setVisible] = useState(false);
    const headerHeight = useSharedValue<number>(0); 

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
        position: 'absolute',
        top: safeAreaInsets.top + 13.5,
        width: "80%",
        paddingLeft: 60,
        color: '#ffffff',
        fontSize: 20,  
        transform: [{ translateY: scrollOffset.value }],
        opacity: Math.max(Math.min((scrollOffset.value - headerHeight.value + (safeAreaInsets.top * 2 + 100)) / (safeAreaInsets.top + 50), 1), 0),
        zIndex: 11
    }));

    const headerShadowStyle = useAnimatedStyle(() => ({
        shadowColor: '#000000',
        shadowOpacity: Math.max(Math.min((scrollOffset.value - headerHeight.value + safeAreaInsets.top * 2 + 100) / (safeAreaInsets.top + 50), 1), 0) / 2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 10
    }));

    const headerStyle = useAnimatedStyle(() => ({
        paddingTop: safeAreaInsets.top - 5,
        flexGrow: 1,
        height: safeAreaInsets.top + 50,
        overflow: 'hidden',
        backgroundColor: '#030303',
        transform: [{ translateY: scrollOffset.value < 0 ? scrollOffset.value : 0 }],
        zIndex: 0,
    }));

    const headingStyle = useAnimatedStyle(() => ({
        paddingTop: safeAreaInsets.top + 10,
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        zIndex: 10,
        opacity: Math.max(Math.min(1 - (scrollOffset.value - headerHeight.value + (safeAreaInsets.top * 2 + 100)) / (safeAreaInsets.top + 50), 1), 0),
        transform: [{ translateY: scrollOffset.value < 0 ? scrollOffset.value : 0 }],
    }));

    if (data) {
        content = <>
            <Animated.Text key={1} numberOfLines={1} style={[{ fontWeight: 500 }, headerTextStyle]}>{data?.header?.title?.text}</Animated.Text>
            <Animated.View key={2} onLayout={event => { headerHeight.value = event.nativeEvent.layout.height; }} style={headingStyle}>
                {data.header.strapline_thumbnail ? <Pressable style={{ alignItems: 'center' }} onPress={() => { youtube.handlePress(data.header.strapline_text_one, navigation) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 14, aspectRatio: 1, borderRadius: 50, marginRight: 5 }} source={{ uri: youtube.getThumbnail(data.header.strapline_thumbnail.contents, 14).url }} />
                        <Text style={{ color: '#ffffff', fontSize: 12 }}>{data.header.strapline_text_one.text}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {data.header.subtitle_badge?.length ? data.header.subtitle_badge.map((badge: any) => <View key={badge.icon_type} style={{ paddingTop: 1, marginRight: 3 }}><IconRender icon={badge.icon_type} fill={"rgba(255, 255, 255, 0.6)"} width={12}></IconRender></View>) : <></>}
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}>{data.header.subtitle.text}</Text>
                    </View>
                </Pressable> : <View style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#ffffff', fontSize: 12 }}>{data.header.strapline_text_one.text}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {data.header.subtitle_badge?.length ? data.header.subtitle_badge.map((badge: any) => <View key={badge.icon_type} style={{ paddingTop: 1, marginRight: 3 }}><IconRender icon={badge.icon_type} fill={"rgba(255, 255, 255, 0.6)"} width={12}></IconRender></View>) : <></>}
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}>{data.header.subtitle.text}</Text>
                    </View>
                </View>}
                <Image style={{ width: width * 0.7, height: data.header.thumbnail.contents[0].height / data.header.thumbnail.contents[0].width * width * 0.7, marginTop: 15, marginBottom: 15, borderRadius: 5 }} source={{ uri: youtube.getThumbnail(data.header.thumbnail.contents, width * 0.7).url }} />
                <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 700, textAlign: 'center' }}>{data.header.title.text}</Text>
                {data.header.description ? <Pressable style={{ marginTop: 10, marginBottom: 10 }} onPress={() => setTrunk(!trunk)}><Text numberOfLines={trunk ? 2 : 0} style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: 14, textAlign: 'center' }}>{data.header.description.description.text}</Text></Pressable> : <></>}
                <View style={{ flexDirection: 'row', width: "100%", marginTop: 15, alignItems: "center", justifyContent: "space-between" }}>
                    <Pressable onPress={() => console.log('Download playlist')} style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: "rgba(255, 255, 255, 0.1)", alignItems: "center", justifyContent: "center" }}>
                        <Svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill={"#ffffff"}>
                            <Path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z" />
                        </Svg>
                    </Pressable>
                    <Pressable onPress={() => console.log('Add to library')} style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: "rgba(255, 255, 255, 0.1)", alignItems: "center", justifyContent: "center" }}>
                        <Svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill={"#ffffff"}>
                            <Path d="M4,20h14v1H3V6h1V20z M18,10h-4V6h-1v4H9v1h4v4h1v-4h4V10z M21,3v15H6V3H21z M20,4H7v13h13V4z" />
                        </Svg>
                    </Pressable>
                    <Pressable onPress={async () => {
                        enqueueList(data);
                    }} style={{ height: 60, width: 60, borderRadius: 50, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center" }}>
                        <Svg
                            width={22}
                            height={22}
                            viewBox={"0 0 100 100"}
                            fill={'#000000'}>
                            <Path d="m20 5 70 45-70 45z" />
                        </Svg>
                    </Pressable>
                    <Pressable onPress={() => console.log('Open Share Sheet')} style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: "rgba(255, 255, 255, 0.1)", alignItems: "center", justifyContent: "center" }}>
                        <Svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill={"#ffffff"}>
                            <Path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z" />
                        </Svg>
                    </Pressable>
                    <Pressable onPress={() => setVisible(true)} style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: "rgba(255, 255, 255, 0.1)", alignItems: "center", justifyContent: "center" }}>
                        <Svg
                            width={24}
                            height={24}
                            viewBox="0 -960 960 960"
                            fill={"#ffffff"}>
                            <Path d="M480-218.46q-16.5 0-28.25-11.75T440-258.46q0-16.5 11.75-28.25T480-298.46q16.5 0 28.25 11.75T520-258.46q0 16.5-11.75 28.25T480-218.46ZM480-440q-16.5 0-28.25-11.75T440-480q0-16.5 11.75-28.25T480-520q16.5 0 28.25 11.75T520-480q0 16.5-11.75 28.25T480-440Zm0-221.54q-16.5 0-28.25-11.75T440-701.54q0-16.5 11.75-28.25T480-741.54q16.5 0 28.25 11.75T520-701.54q0 16.5-11.75 28.25T480-661.54Z" />
                        </Svg>
                    </Pressable>
                </View>
            </Animated.View>
            <View key={3}>
                {data.contents.map((item: any, index: number) => <View key={item.id} style={{ marginTop: 10 }}>
                    <ItemRender data={item} queue={data} index={index} thumbnail={data.header.thumbnail.contents} navigation={navigation}></ItemRender>
                </View>)}
            </View>
            <Text key={4} style={{ color: 'rgba(255, 255, 255, 0.75)', textAlign: 'center', padding: 15 }}>{data.header.second_subtitle.text}</Text>
            {data.sections ? data.sections.map((section: any, index: number) => <Fragment key={index}>
                <Text style={{ color: 'white', fontWeight: 600, fontSize: 22, padding: 15 }}>{section.header.title.text}</Text>
                <ScrollView horizontal={true}>
                    {section.contents.map((item: any) => <AlbumRender key={item.id} data={item} navigation={navigation}></AlbumRender>)}
                </ScrollView>
            </Fragment>) : <></>}
            <View key={5} style={{ height: 100 }}></View>
        </>
    }

    return <>
        {data ? <TrackModal data={data.header} itemList={data.header.buttons.find((button: any) => button.type == 'Menu').items} navigation={navigation} isVisible={isVisible} setVisible={setVisible} /> : <></>}
        <View style={{ backgroundColor: "#030303", height: "100%" }}>
            <Image blurRadius={25} style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 0.5 }} source={{ uri: data?.header?.thumbnail?.contents ? youtube.getThumbnail(data?.header?.thumbnail?.contents, width).url : youtube.backgroundUrl }} />
            <LinearGradient
                start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
                locations={[0.25,0.75,1]}
                colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
                style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
            </LinearGradient>
            <Animated.ScrollView ref={animatedRef} style={{ position: 'absolute', width: "100%", height: "100%" }} stickyHeaderIndices={[0]}>
                <View style={{ height: 'auto', marginBottom: -safeAreaInsets.top - 50 }}>
                    <Animated.View style={headerShadowStyle}>
                        <Animated.View style={headerStyle}>
                            <Image blurRadius={25} style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 0.5 }} source={{ uri: data?.header?.thumbnail?.contents ? youtube.getThumbnail(data?.header?.thumbnail?.contents, width).url : youtube.backgroundUrl }} />
                            <LinearGradient
                                start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
                                locations={[0.25,0.75,1]}
                                colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
                                style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
                            </LinearGradient>
                        </Animated.View>
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
    </>
}

function ItemRender ({ data, queue, index, thumbnail, navigation }: { data: any, queue: any, index: number, thumbnail: any, navigation: any }) {
    const [isVisible, setVisible] = useState(false);

    return <>
        {data.item_type == 'unknown' ? <></> : <TrackModal data={data} providedThumbnails={thumbnail} isVisible={isVisible} setVisible={setVisible} navigation={navigation} />}
        <Pressable key={'pressable' + data.id} style={data.item_type == 'unknown' ? { opacity: 0.5 } : { }} onPress={() => { if (data.item_type != 'unknown') enqueueList(queue, index) }} onLongPress={() => setVisible(true)}>
            <View style={{ padding: 5, paddingLeft: 15, height: 60, flexDirection: "row", alignItems: "center" }}>
                {data.index ?
                    <Text style={{ width: 30, color: 'white', fontWeight: 500, fontSize: 16, textAlign: 'center' }}>{data.index.text}</Text> : 
                    <Image width={50} height={data.thumbnail.contents[0].height / data.thumbnail.contents[0].width * 50} style={{ borderRadius: 3 }} source={{ uri: youtube.getThumbnail(data.thumbnail.contents, 50).url }} />}
                <View style={{ marginLeft: 10, flexGrow: 1, width: 0 }}>
                    <Text numberOfLines={1} style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>{data.flex_columns[0].title.text}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {data.badges?.map((badge: any) => <View key={badge.icon_type} style={{ paddingTop: 2, marginRight: 4 }}><IconRender icon={badge.icon_type} fill={"rgba(255, 255, 255, 0.5)"} width={16}></IconRender></View>)}
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
        <TrackModal data={data} isVisible={isVisible} setVisible={setVisible} navigation={navigation} />
        <Pressable key={'pressable' + data.id} onPress={() => youtube.handlePress(data, navigation)} onLongPress={() => setVisible(true)}>
            <View style={{ margin: 5, marginLeft: 15, flexDirection: "column", alignItems: "flex-start", width: 150 }}>
                <Image width={150} height={150} style={{ borderRadius: 5, marginBottom: 5 }} source={{ uri: youtube.getThumbnail(data.thumbnail, 150).url }} />
                <Text numberOfLines={2} style={{ color: "#ffffff", fontSize: 16, fontWeight: 600 }}>{data.title.text}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {data.badges?.length ? data.badges.map((badge: any) => <View style={{ paddingTop: 2, marginRight: 4 }}><IconRender icon={badge.icon_type} fill={"rgba(255, 255, 255, 0.5)"} width={16}></IconRender></View>) : <></>}
                    <Text numberOfLines={2} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 14, fontWeight: 500 }}>{data.subtitle.text}</Text>
                </View>
            </View>
        </Pressable>
    </>
}

async function enqueueList (data: any, index?: number) {
    const infoList: any[] = [];

    let colors: any;

    if (data.url) {
        colors = await getPalette(youtube.getThumbnail(data.header.thumbnail.contents, 50).url);
    }

    var i = 0;
    var comp = 0;
    data.contents.forEach(async (item: any) => {
        if (item.item_type != 'unknown') {
            const store = i;
            infoList[i] = undefined;
            if (colors) {
                infoList[i] = {
                    colors,
                    track: {
                        title: item.title,
                        author: data.header.strapline_text_one.text,
                        thumbnail: data.header.thumbnail.contents,
                        duration: item.duration.seconds,
                        id: item.menu?.items?.find((item: any) => item.endpoint?.payload?.browseId?.startsWith('MPTC'))?.endpoint?.payload?.browseId?.slice(4) ?? item.id
                    }
                };
            } else {
                infoList[store] = [{
                    colors: await getPalette(youtube.getThumbnail(item.thumbnail, 50).url),
                    track: {
                        title: item.title,
                        author: item.authors.map((author: any) => author.name).join(),
                        thumbnail: item.thumbnail.contents,
                        duration: item.duration.seconds,
                        id: item.menu?.items?.find((item: any) => item.endpoint?.payload?.browseId?.startsWith('MPTC'))?.endpoint?.payload?.browseId?.slice(4) ?? item.id
                    }
                }];
                comp++;
                if (comp == i) {
                    youtube.resetPlayer();
                    youtube.player.queue = infoList;
                    youtube.player.currentIndex = index ?? 0;
                    youtube.player.jumpPlayer(1);
                    youtube.player.setState(Date.now());
                    youtube.playerControls.play();
                }
            }
            i++;
        }
    });

    if (colors) {
        youtube.resetPlayer();
        youtube.player.queue = infoList;
        youtube.player.currentIndex = index ?? 0;
        youtube.playerControls.play();
        youtube.player.jumpPlayer(1);
        youtube.player.setState(Date.now());
    }
}

export default Component;