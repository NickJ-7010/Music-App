import React, { useState } from "react";
import { View, Text, Pressable, Dimensions, Image } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, State } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBarTop } from "./AnimatedTabs";
import youtube from "./YouTube";
import TrackPlayer, { usePlaybackState, useProgress, State as PlaybackState, RepeatMode } from "react-native-track-player";
import * as MCU from "@material/material-color-utilities";

const { height, width } = Dimensions.get('screen');

const snapPoints = [0, height, height * 2 - 110];
 
const Tab: any = createMaterialTopTabNavigator();

interface PlayerShelfProps {
    bottomTabBar: React.ReactNode;
}

function Component ({ bottomTabBar }: PlayerShelfProps): React.JSX.Element {
    const [stateNum, setState] = useState(0);
    const last = useSharedValue<number>(0); 
    const state = useSharedValue<number>(0);
    const offset = useSharedValue<number>(0);
    const init = useSharedValue<number>(0);
    const playerState = usePlaybackState();

    youtube.player.setState = setState;

    //{"background": "#EEECE3", "detail": "#355A1F", "platform": "ios", "primary": "#6A77AF", "secondary": "#070C06"}
    const theme = MCU.themeFromSourceColor(parseInt(youtube.player.queue[youtube.player.currentIndex]?.colors?.background.slice(1), 16)).schemes.dark;    
    const backgroundColor = theme.onPrimary;
    const containerColor = "#" + theme.primaryContainer.toString(16).slice(2);

    const pan = Gesture.Pan()
        .onBegin(() => {
            init.value = offset.value;
        })
        .onChange((event) => {
            offset.value = Math.min(Math.max(init.value + -event.translationY, snapPoints[0]), snapPoints[2]);
        })
        .onFinalize(({ velocityY }) => {
            const points = state.value ? state.value == 2 ? [snapPoints[1], snapPoints[2]] : snapPoints : [snapPoints[0], snapPoints[1]];
            const point = offset.value + -velocityY;

            const deltas = points.map((p) => Math.abs(point - p));
            const minDelta = Math.min.apply(null, deltas);

            const snapPoint = points.filter((p) => Math.abs(point - p) === minDelta)[0];

            if (Date.now() - last.value < 100) return;

            state.value = snapPoint ? snapPoint == height ? 1 : 2 : 0;
            offset.value = withSpring(snapPoint, { mass: 0.25, overshootClamping: true });
        });

    const interpolate = (start: number, end: number, pos: number): number => {
        "worklet";
        return Math.round(Math.min(Math.max((1 - pos) * start + pos * end, Math.min(start, end)), Math.max(start, end)));
    };

    const style = useAnimatedStyle(() => ({
        position: "absolute",
        width: "100%",
        bottom: -76, // 76 is the current estimate of the TabBar height, no better way to get height :/
        backgroundColor: `rgb(${interpolate(31, (backgroundColor & 0xff0000) >> 16, offset.value / height)}, ${interpolate(31, (backgroundColor & 0x00ff00) >> 8, offset.value / height)}, ${interpolate(31, (backgroundColor & 0x0000ff), offset.value / height)})`,
        height: Math.min((height - 144) / height * offset.value + 144, height)
    }));

    const shelfStyle = useAnimatedStyle(() => ({
        backgroundColor: containerColor,
        transform: [{ translateY: offset.value / height > 1 ? - (height - 52) / height * (offset.value - height) : 0 }],
        width: "100%",
        height: height - 110,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15
    })); 

    const tabBarStyle = useAnimatedStyle(() => ({
        opacity: offset.value / height < 1 ? 1 - offset.value / height : 1,
        transform: [{ translateY: offset.value / height < 1 ? offset.value / height * 76  : 76 }]
    }));

    const indicatorStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 2,
        opacity: Math.max((offset.value - height) / (height - 110), 0)
    }));

    const shelfContentStyle = useAnimatedStyle(() => ({
        flexGrow: 1,
        opacity: Math.max((offset.value - height) / (height - 110), 0)
    }));

    const topTabsStyle = useAnimatedStyle(() => ({
        paddingTop: 1,
        borderBottomColor: `rgba(255, 255, 255, ${Math.max((offset.value - height) / (height - 110) * 0.15, 0)})`,
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15
    }));
    
    const minControlStyle = useAnimatedStyle(() => ({
        display: "flex",
        flexDirection: "row",
        padding: 10,
        backgroundColor: "transparent",
        opacity: Math.max(offset.value / height < 1 ? 1 - (offset.value / height * 2) : offset.value / height > 1 ? (offset.value - height) / (height / 2) : 0, 0),
        paddingTop: offset.value / height > 1 ? (offset.value - height) / (height - 110) * 41 + 10 : 10,
    }));

    const playerContentStyle = useAnimatedStyle(() => ({
        width: "100%",
        height: height - 155,
        opacity: Math.max(offset.value / height < 1 ? 1 - (1 - offset.value / height) * 2 : offset.value / height > 1 ? 1 - (offset.value - height) / (height / 2) : 1, 0),
    }));

    return (
        <GestureHandlerRootView style={{ }}>
            <GestureDetector gesture={pan}>
                <View>
                    <Animated.View style={style}>
                        <Pressable onPress={() => { if (state.value != 1) { last.value = Date.now(); state.value = 1; offset.value = withSpring(snapPoints[1], { mass: 0.25, overshootClamping: true }); } }}>
                            <Animated.View style={minControlStyle}>
                                <View style={{ width: 5 }}></View>
                                <Image style={{ height: "auto", aspectRatio: 1, borderRadius: 4, backgroundColor: "rgba(255, 255, 255, 0.1)" }} source={{ uri: getThumbnail(youtube.player.queue[youtube.player.currentIndex]) }}></Image>
                                <View style={{ marginLeft: 10, flexGrow: 1, width: 0, justifyContent: "center" }}>
                                    <Text numberOfLines={1} style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>{youtube.player.queue[youtube.player.currentIndex]?.track?.basic_info?.title ?? 'Title'}</Text>
                                    <Text numberOfLines={1} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 500 }}>{youtube.player.queue[youtube.player.currentIndex]?.track?.basic_info?.author ?? 'Artist'}</Text>
                                </View>
                                <Pressable style={{ margin: 5, marginRight: 0, padding: playerState.state == PlaybackState.Playing ? 0 : 6 }} onPress={() => { if (playerState.state == PlaybackState.Playing) { TrackPlayer.pause() } else { TrackPlayer.play() } }}>
                                    <Svg
                                        width={playerState.state == PlaybackState.Playing ? 38 : 26}
                                        height={playerState.state == PlaybackState.Playing ? 38 : 26}
                                        viewBox={playerState.state == PlaybackState.Playing ? "0 0 24 24" : "0 0 100 100"}
                                        fill={"#ffffff"}>
                                        <Path d={playerState.state == PlaybackState.Playing ? "M9 19H7V5h2Zm8-14h-2v14h2Z" : "m20 5 70 45-70 45z"} />
                                    </Svg>
                                </Pressable>
                                <Pressable style={{ margin: 5 }} onPress={() => youtube.playerControls.next()}>
                                    <Svg
                                        width={38}
                                        height={38}
                                        viewBox='0 0 24 24'
                                        fill={"#ffffff"}>
                                        <Path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" />
                                    </Svg>
                                </Pressable>
                            </Animated.View>
                        </Pressable>
                        <Animated.View style={playerContentStyle}>
                            <View style={{ width: "100%", flexDirection: "row", paddingLeft: 5, paddingRight: 5 }}>
                                <Pressable onPress={() => { last.value = Date.now(); state.value = 0; offset.value = withSpring(snapPoints[0], { mass: 0.25, overshootClamping: true }); }} style={{ height: 50, width: 50, alignItems: "center", justifyContent: "center" }}>
                                    <Svg
                                        width={35}
                                        height={35}
                                        viewBox="0 -960 960 960"
                                        fill={"#ffffff"}>
                                        <Path d="M480-371.69 267.69-584 296-612.31l184 184 184-184L692.31-584 480-371.69Z" />
                                    </Svg>
                                </Pressable>
                                <View style={{ flexGrow: 1 }}></View>
                                <Pressable style={{ height: 50, width: 50, alignItems: "center", justifyContent: "center" }}>
                                    <Svg
                                        width={35}
                                        height={35}
                                        viewBox="0 -960 960 960"
                                        fill={"#ffffff"}>
                                        <Path d="M480-218.46q-16.5 0-28.25-11.75T440-258.46q0-16.5 11.75-28.25T480-298.46q16.5 0 28.25 11.75T520-258.46q0 16.5-11.75 28.25T480-218.46ZM480-440q-16.5 0-28.25-11.75T440-480q0-16.5 11.75-28.25T480-520q16.5 0 28.25 11.75T520-480q0 16.5-11.75 28.25T480-440Zm0-221.54q-16.5 0-28.25-11.75T440-701.54q0-16.5 11.75-28.25T480-741.54q16.5 0 28.25 11.75T520-701.54q0 16.5-11.75 28.25T480-661.54Z" />
                                    </Svg>
                                </Pressable>
                            </View>
                            <View style={{ flexGrow: 1 }}></View>
                            <View style={{ paddingRight: 30, paddingLeft: 30, width: "100%", height: width - 60 }}><Image style={{ width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 15 }} source={{ uri: getThumbnail(youtube.player.queue[youtube.player.currentIndex]) }} /></View>
                            <View style={{ flexGrow: 1 }}></View>
                            <View style={{ paddingRight: 30, paddingLeft: 30 }}>
                                <Text numberOfLines={1} style={{ color: "#ffffff", fontWeight: 700, fontSize: 26 }}>{youtube.player.queue[youtube.player.currentIndex]?.track?.basic_info?.title ?? 'Title'}</Text>
                                <Text numberOfLines={1} style={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 600, fontSize: 18 }}>{youtube.player.queue[youtube.player.currentIndex]?.track?.basic_info?.author ?? 'Artist'}</Text>
                            </View>
                            <View style={{ flexGrow: 2 }}></View>
                            <View style={{ paddingRight: 30, paddingLeft: 30 }}>
                                <ProgressView />
                            </View>
                            <View style={{ flexGrow: 1 }}></View>
                            <View style={{ paddingRight: 30, paddingLeft: 30, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Pressable onPress={() => {
                                    if (youtube.player.shuffled) {
                                        youtube.player.shuffled = false;
                                        youtube.player.queue = youtube.player.unshuffledQueue;
                                        youtube.player.unshuffledQueue = [];
                                        youtube.player.currentIndex = youtube.player.savedIndex;
                                    } else {
                                        youtube.player.shuffled = true;
                                        youtube.player.unshuffledQueue = [...youtube.player.queue];
                                        const tempQueue = youtube.player.queue;
                                        youtube.player.queue = [];
                                        youtube.player.queue.push(tempQueue.splice(youtube.player.currentIndex, 1)[0]);
                                        const length = tempQueue.length
                                        for (var i = 0; i < length; i++) {
                                            youtube.player.queue.push(tempQueue.splice(Math.floor(Math.random() * tempQueue.length), 1)[0]);
                                        };
                                        youtube.player.savedIndex = youtube.player.currentIndex;
                                        youtube.player.currentIndex = 0;
                                    }
                                    setState(Date.now());
                                }} style={{ height: 40, width: 40, borderRadius: 25, alignItems: "center", justifyContent: "center" }}>
                                    <Svg
                                        width={30}
                                        height={30}
                                        viewBox="0 0 24 24"
                                        fill={youtube.player.shuffled ? "#ffffff" : "rgba(255, 255, 255, 0.5)"}>
                                        <Path d="M18.15,13.65l3.85,3.85l-3.85,3.85l-0.71-0.71L20.09,18H19c-2.84,0-5.53-1.23-7.39-3.38l0.76-0.65 C14.03,15.89,16.45,17,19,17h1.09l-2.65-2.65L18.15,13.65z M19,7h1.09l-2.65,2.65l0.71,0.71l3.85-3.85l-3.85-3.85l-0.71,0.71 L20.09,6H19c-3.58,0-6.86,1.95-8.57,5.09l-0.73,1.34C8.16,15.25,5.21,17,2,17v1c3.58,0,6.86-1.95,8.57-5.09l0.73-1.34 C12.84,8.75,15.79,7,19,7z M8.59,9.98l0.75-0.66C7.49,7.21,4.81,6,2,6v1C4.52,7,6.92,8.09,8.59,9.98z" />
                                    </Svg>
                                </Pressable>
                                <Pressable onPress={() => youtube.playerControls.previous()} style={{ height: 50, width: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" }}>
                                    <Svg
                                        width={35}
                                        height={35}
                                        viewBox="0 0 100 100"
                                        fill={"#ffffff"}>
                                        <Path d="M80 20 40 50l40 30zM20 20h10v60H20z" />
                                    </Svg>
                                </Pressable>
                                <Pressable onPress={() => { if (playerState.state == PlaybackState.Playing) { TrackPlayer.pause() } else { TrackPlayer.play() } }} style={{ height: 75, width: 75, borderRadius: 50, backgroundColor: containerColor, alignItems: "center", justifyContent: "center" }}>
                                    <Svg
                                        width={playerState.state == PlaybackState.Playing ? 50 : 35}
                                        height={playerState.state == PlaybackState.Playing ? 50 : 35}
                                        viewBox={playerState.state == PlaybackState.Playing ? "0 0 24 24" : "0 0 100 100"}
                                        fill={"#ffffff"}>
                                        <Path d={playerState.state == PlaybackState.Playing ? "M9 19H7V5h2Zm8-14h-2v14h2Z" : "m20 5 70 45-70 45z"} />
                                    </Svg>
                                </Pressable>
                                <Pressable onPress={() => youtube.playerControls.next()} style={{ height: 50, width: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" }}>
                                    <Svg
                                        width={35}
                                        height={35}
                                        viewBox="0 0 100 100"
                                        fill={"#ffffff"}>
                                        <Path d="m10 20 50 30-50 30zM70 20h10v60H70z" />
                                    </Svg>
                                </Pressable>
                                <Pressable onPress={() => { youtube.player.loop = (youtube.player.loop + 1) % 3; TrackPlayer.setRepeatMode(youtube.player.loop == 2 ? RepeatMode.Track : RepeatMode.Off); setState(Date.now()); }} style={{ height: 40, width: 40, borderRadius: 25, alignItems: "center", justifyContent: "center" }}>
                                    <Svg
                                        width={30}
                                        height={30}
                                        viewBox="0 0 24 24"
                                        fill={youtube.player.loop ? "#ffffff" : "rgba(255, 255, 255, 0.5)"}>
                                        <Path d={youtube.player.loop == 2 ? "M13,15h-1.37v-4.52l-1.3,0.38v-1L12.83,9H13V15z M21,17L3.88,17.03l2.67-2.67l-0.71-0.71L1.99,17.5l3.85,3.85l0.71-0.71 l-2.62-2.62L22,18v-5h-1V17z M3,7l17.12-0.03l-2.67,2.67l0.71,0.71l3.85-3.85l-3.85-3.85l-0.71,0.71l2.62,2.62L2,6v5h1V7z" : "M21,13h1v5L3.93,18.03l2.62,2.62l-0.71,0.71L1.99,17.5l3.85-3.85l0.71,0.71l-2.67,2.67L21,17V13z M3,7l17.12-0.03 l-2.67,2.67l0.71,0.71l3.85-3.85l-3.85-3.85l-0.71,0.71l2.62,2.62L2,6v5h1V7z"} />
                                    </Svg>
                                </Pressable>
                            </View>
                            <View style={{ flexGrow: 2 }}></View>
                        </Animated.View>
                        <Animated.View style={shelfStyle}>
                            <View style={{ alignItems: "center", justifyContent: "center", padding: 10, paddingBottom: 5 }}><View style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", width: 35, height: 5, borderRadius: 5 }}></View></View>
                            <NavigationContainer independent={true}>
                                <Tab.Navigator sceneContainerStyle={{ backgroundColor: "transparent" }} tabBar={(props: any) => <Animated.View style={topTabsStyle}><TabBarTop {...props} /></Animated.View>} initialRouteName="UP NEXT" screenOptions={{ swipeEnabled: false, onPress: () => { last.value = Date.now(); state.value = 2; offset.value = withSpring(snapPoints[2], { mass: 0.25, overshootClamping: true }); }, indicatorStyle: indicatorStyle, tabBarIndicatorContainerStyle: { transform: [{ translateY: 1 }] }, tabBarIndicatorStyle: { backgroundColor: "#ffffff" }, tabBarLabelStyle: { fontSize: 14, fontWeight: 600 }, tabBarActiveTintColor: "#ffffff", tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)" }}>
                                    <Tab.Screen name="UP NEXT" children={() =><Animated.View style={shelfContentStyle}><UpNextComponent /></Animated.View>} />
                                    <Tab.Screen name="LYRICS" children={()=><Animated.View style={shelfContentStyle}><LyricsComponent /></Animated.View>} />
                                    <Tab.Screen name="RELATED" children={()=><Animated.View style={shelfContentStyle}><RelatedComponent /></Animated.View>} />
                                </Tab.Navigator>
                            </NavigationContainer>
                        </Animated.View>
                    </Animated.View>
                </View>
            </GestureDetector>
            <Animated.View style={tabBarStyle}>
                {bottomTabBar}
            </Animated.View>
        </GestureHandlerRootView>
    );
}

function ProgressView () {
    const duration = youtube.player.queue[youtube.player.currentIndex]?.track?.basic_info?.duration ?? 0;
    const { position, buffered } = useProgress();

    return (
        <>
            <View style={{ position: "absolute", width: width - 60, height: 2, backgroundColor: "rgba(255, 255, 255, 0.1)", marginLeft: 30 }}></View>
            <View style={{ position: "absolute", width: Math.min(buffered / (duration ? duration : 1), 1) * (width - 60), height: 2, backgroundColor: "rgba(255, 255, 255, 0.3)", marginLeft: 30 }}></View>
            <View style={{ position: "absolute", width: Math.min(position / (duration ? duration : 1), 1) * (width - 60), height: 2, backgroundColor: "#ffffff", marginLeft: 30 }}></View>
            <View style={{ position: "relative", top: -5, left: Math.min(position / (duration ? duration : 1), 1) * (width - 60) - 6, width: 12, height: 12, backgroundColor: "white", borderRadius: 8 }}></View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 600, fontSize: 14 }}>{((time: any) => { return time ? `${Math.floor(time / 60).toString()}:${Math.floor(time % 60).toString().padStart(2, '0')}` : null })(position) ?? '0:00'}</Text>
                <View style={{ flexGrow: 1 }}></View>
                <Text style={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 600, fontSize: 14 }}>{((time: any) => { return time ? `${Math.floor(time / 60).toString()}:${Math.floor(time % 60).toString().padStart(2, '0')}` : null })(duration) ?? '0:00'}</Text>
            </View>
        </>
    );
}

function UpNextComponent () {
    return (
        <View><Text>UP NEXT</Text></View>
    );
}

function LyricsComponent () {
    return (
        <View><Text>LYRICS</Text></View>
    );
}

function RelatedComponent () {
    return (
        <View><Text>RELATED</Text></View>
    );
}

function getThumbnail (obj: any) {
    return obj?.track?.basic_info?.thumbnail[0]?.url;
}

export default Component;