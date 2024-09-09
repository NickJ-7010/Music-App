import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, View, Image, Text } from 'react-native';
import youtube from './YouTube';
import Animated, { useAnimatedRef, useAnimatedStyle, useScrollViewOffset, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import TrackModal from './TrackModal';
import IconRender from './IconRender';
import TrackPlayer from 'react-native-track-player';
import ImageColors from "react-native-image-colors";

const { width } = Dimensions.get('screen');

function Component ({ navigation, route }: any) {
    const [data, setData]: [any, any] = useState(undefined);
    const headerHeight = useSharedValue<number>(0);

    useEffect(() => {
        youtube.getCredits(route.params.id).then(credits => {
            // @ts-ignore
            setData(credits.data.onResponseReceivedActions[0].openPopupAction.popup.dismissableDialogRenderer);
        });
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
        opacity: Math.max(Math.min((scrollOffset.value - headerHeight.value + 200) / 100, 1), 0),
        zIndex: 11
    }));

    const headerShadowStyle = useAnimatedStyle(() => ({
        shadowColor: '#000000',
        shadowOpacity: Math.max(Math.min((scrollOffset.value - headerHeight.value + 200) / 100, 1), 0) / 2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 10
    }));

    const headerStyle = useAnimatedStyle(() => ({
        paddingTop: safeAreaInsets.top - 5,
        flexGrow: 1,
        height: 100,
        overflow: 'hidden',
        backgroundColor: '#030303',
        transform: [{ translateY: scrollOffset.value < 0 ? scrollOffset.value : 0 }],
        zIndex: 0,
    }));

    const headingStyle = useAnimatedStyle(() => ({
        paddingTop: safeAreaInsets.top,
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        zIndex: 10,
        opacity: Math.max(Math.min(1 - (scrollOffset.value - headerHeight.value + 200) / 100, 1), 0)
    }));

    const thumbnail = data ? data.metadata.musicMultiRowListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.slice(-1)[0] : undefined;

    if (data) {
        content = <>
            <Animated.Text numberOfLines={1} style={[{ fontWeight: 500 }, headerTextStyle]}>{data.metadata.musicMultiRowListItemRenderer.title.runs[0].text}</Animated.Text>
            <Animated.View onLayout={event => { headerHeight.value = event.nativeEvent.layout.height; }} style={headingStyle}>
                <Pressable style={{ alignItems: 'center' }} onPress={() => { youtube.handlePress(data.header.strapline_text_one, navigation) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#ffffff', fontSize: 13 }}>{data.metadata.musicMultiRowListItemRenderer.subtitle.runs[0].text}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {data.metadata.musicMultiRowListItemRenderer.badges ? data.metadata.musicMultiRowListItemRenderer.badges.map((badge: any) => <View key={badge.musicInlineBadgeRenderer.icon.iconType} style={{ paddingTop: 1, marginRight: 3 }}><IconRender icon={badge.musicInlineBadgeRenderer.icon.iconType} fill={"rgba(255, 255, 255, 0.6)"} width={12}></IconRender></View>) : <></>}
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 13 }}>{data.metadata.musicMultiRowListItemRenderer.secondTitle.runs.map((run: any) => run.text).join('')}</Text>
                    </View>
                </Pressable>
                <Image style={{ width: width * 0.7, height: thumbnail.height / thumbnail.width * width * 0.7, marginTop: 15, marginBottom: 15, borderRadius: 5 }} source={{ uri: thumbnail.url }} />
                <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 700, textAlign: 'center' }}>{data.metadata.musicMultiRowListItemRenderer.title.runs[0].text}</Text>
            </Animated.View>
            <View style={{ alignItems: 'flex-start', paddingLeft: 20, paddingRight: 20 }}>
                {data.sections.map((item: any) => <View key={console.log(item) + item.dismissableDialogContentSectionRenderer?.title?.runs[0]?.text} style={{ marginTop: 10 }}>
                    <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: 500, paddingTop: 10, paddingBottom: 5 }}>{item.dismissableDialogContentSectionRenderer?.title?.runs[0]?.text}</Text>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 14 }}>{item.dismissableDialogContentSectionRenderer?.subtitle?.runs.map((run: any) => run.text).join('')}</Text>
                </View>)}
            </View>
            <View style={{ height: 100 }}></View>
        </>
    }

    return <View style={{ backgroundColor: "#030303", height: "100%" }}>
        <Image blurRadius={25} style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 0.5 }} source={{ uri: data ? thumbnail.url : youtube.backgroundUrl }} />
        <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
            locations={[0.25,0.75,1]}
            colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
            style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
        </LinearGradient>
        <Animated.ScrollView ref={animatedRef} style={{ position: 'absolute', width: "100%", height: "100%" }} stickyHeaderIndices={[0]}>
            <View style={{ height: 'auto', marginBottom: -100 }}>
                <Animated.View style={headerShadowStyle}>
                    <Animated.View style={headerStyle}>
                        <Image blurRadius={25} style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 0.5 }} source={{ uri: data ? thumbnail.url : youtube.backgroundUrl }} />
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
}

export default Component;