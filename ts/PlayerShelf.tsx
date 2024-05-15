import React from "react";
import { View, Text, Pressable, Alert, Dimensions } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

interface PlayerShelfProps {
    bottomTabBar: React.ReactNode;
}

const snapPoint = (
    value: number,
    velocity: number,
    points: ReadonlyArray<number>
): number => {
    "worklet";
    const point = value + 0.5 * velocity;
    const deltas = points.map((p) => Math.abs(point - p));
    const minDelta = Math.min.apply(null, deltas);
    return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};

const { height, width } = Dimensions.get('screen');

const snapPointsY = [0, height];

function Component ({ bottomTabBar }: PlayerShelfProps): React.JSX.Element {
    const state = useSharedValue<number>(0);
    const offset = useSharedValue<number>(0);
    const init = useSharedValue<number>(0);
  
    const pan = Gesture.Pan()
        .onBegin(() => {
            init.value = offset.value;
        })
        .onChange((event) => {
            console.log((height - 68) / height * offset.value + 68 + " " + height);
            offset.value = init.value + -event.translationY;
        })
        .onFinalize(({ velocityY }) => {
            const snapPointY = snapPoint(offset.value, -velocityY, snapPointsY);

            state.value = 0;
            offset.value = withSpring(snapPointY, { overshootClamping: true });
            //console.log(offset.value);
        });

    const style = useAnimatedStyle(() => ({
        position: "absolute",
        width: "100%",
        bottom: 0,
        backgroundColor: `rgb(0, ${Math.round(offset.value / height * 200)}, 255)`,
        height: (height - 68) / height * offset.value + 68
    }));

    const shelfStyle = useAnimatedStyle(() => ({
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        transform: [{ translateY: height - 155 }],
        width: "100%",
        height: height - 110,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15
    })); 

    const tabBarStyle = useAnimatedStyle(() => ({
        opacity: offset.value / height < 1 ? 1 - offset.value / height : 1,
        maxHeight: offset.value / height >= 1 ? 0 : 100,
        transform: [{ translateY: offset.value / height < 1 ? offset.value / height * 100 : 100 }]
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
                        <Animated.View style={shelfStyle}></Animated.View>
                    </Animated.View>
                </View>
            </GestureDetector>
            <Animated.View style={tabBarStyle}>
                {bottomTabBar}
            </Animated.View>
        </GestureHandlerRootView>
    );
}

export default Component;