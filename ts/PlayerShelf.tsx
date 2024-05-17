import React, { useState } from "react";
import { View, Text, Pressable, Alert, Dimensions } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBarTop } from "./AnimatedTabs";

const { height } = Dimensions.get('screen');

const snapPoints = [0, height, height * 2 - 110];
 
const Tab: any = createMaterialTopTabNavigator();

interface PlayerShelfProps {
    bottomTabBar: React.ReactNode;
}

function Component ({ bottomTabBar }: PlayerShelfProps): React.JSX.Element {
    const [page, setPage] = useState(0);
    const state = useSharedValue<number>(0);
    const offset = useSharedValue<number>(0);
    const init = useSharedValue<number>(0);
  
    const pan = Gesture.Pan()
        .onBegin(() => {
            init.value = offset.value;
        })
        .onChange((event) => {
            offset.value = Math.min(Math.max(init.value + -event.translationY, snapPoints[0]), snapPoints[2]);
        })
        .onFinalize(({ velocityY }) => {
            const points = state.value ? state.value == 2 ? [snapPoints[1], snapPoints[2]] : snapPoints : [snapPoints[0], snapPoints[1]];
            const point = offset.value + 0.5 * -velocityY;

            const deltas = points.map((p) => Math.abs(point - p));
            const minDelta = Math.min.apply(null, deltas);

            const snapPoint = points.filter((p) => Math.abs(point - p) === minDelta)[0];

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
        backgroundColor: `rgb(${interpolate(31, 18, offset.value / height)}, ${interpolate(31, 38, offset.value / height)}, ${interpolate(31, 51, offset.value / height)})`,
        height: Math.min((height - 144) / height * offset.value + 144, height)
    }));

    const shelfStyle = useAnimatedStyle(() => ({
        backgroundColor: "#244D65",
        transform: [{ translateY: offset.value / height > 1 ? height - (height - 100) / height * (offset.value - height) - 155 : height - 155 }],
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

    return (
        <GestureHandlerRootView style={{ }}>
            <GestureDetector gesture={pan}>
                <View>
                    <Animated.View style={style}>
                        <View style={{ display: "flex", flexDirection: "row", padding: 15, shadowColor: "#000000", shadowRadius: 10, shadowOpacity: 0.5, shadowOffset: { height: -10, width: 0 } }}>
                            <Text style={{ color: "#00D19D", fontSize: 32, fontWeight: 700 }}>Music App</Text>
                            <View style={{ flexGrow: 1 }}></View>
                            <Pressable style={{ marginLeft: 10 }} onPress={() => Alert.alert('title', 'message')}>
                            <Svg
                                width={38}
                                height={38}
                                viewBox='0 0 24 24'
                                fill={"#ffffff"}>
                                <Path d="M9 19H7V5h2Zm8-14h-2v14h2Z" />
                            </Svg>
                            </Pressable>
                            <Pressable style={{ marginLeft: 5 }} onPress={() => Alert.alert('title', 'message')}>
                                <Svg
                                    width={38}
                                    height={38}
                                    viewBox='0 0 24 24'
                                    fill={"#ffffff"}>
                                    <Path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z" />
                                </Svg>
                            </Pressable>
                        </View>
                        <Animated.View style={shelfStyle}>
                            <View style={{ alignItems: "center", justifyContent: "center", padding: 10, paddingBottom: 5 }}><View style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", width: 35, height: 5, borderRadius: 5 }}></View></View>
                            <NavigationContainer independent={true}>
                                <Tab.Navigator sceneContainerStyle={{ backgroundColor: "transparent" }} tabBar={TabBarTop} initialRouteName="UP NEXT" screenOptions={{ swipeEnabled: false, indicatorStyle: indicatorStyle, tabBarStyle: { backgroundColor: "transparent", paddingTop: 1, borderBottomColor: "rgba(255, 255, 255, 0.0)", borderBottomWidth: 1, marginLeft: 15, marginRight: 15 }, tabBarIndicatorContainerStyle: { transform: [{ translateY: 1 }] }, tabBarIndicatorStyle: { backgroundColor: "#ffffff" }, tabBarLabelStyle: { fontSize: 14, fontWeight: 600 }, tabBarActiveTintColor: "#ffffff", tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)" }}>
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

export default Component;