import React from "react";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { ParamListBase, Route, TabNavigationState } from "@react-navigation/native";
import { Animated, Easing, I18nManager, Platform, Text, View, useAnimatedValue } from "react-native";
import { TabBar } from "react-native-tab-view";
import { GetTabWidth, Props } from "react-native-tab-view/lib/typescript/src/TabBarIndicator";
import ReAnimated from "react-native-reanimated";

export function TabBarTop({
    state,
    navigation,
    descriptors,
    ...rest
}: any) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
  
    const activeColor = "#ffffff";
    const inactiveColor = "rgba(255, 255, 255, 0.6)"

    return (
        <TabBar
            {...rest}
            navigationState={state}
            scrollEnabled={focusedOptions.tabBarScrollEnabled}
            bounces={focusedOptions.tabBarBounces}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            pressColor={focusedOptions.tabBarPressColor}
            pressOpacity={focusedOptions.tabBarPressOpacity}
            tabStyle={focusedOptions.tabBarItemStyle}
            indicatorStyle={[
                { backgroundColor: "#ffffff" },
                focusedOptions.tabBarIndicatorStyle,
            ]}
            gap={focusedOptions.tabBarGap}
            android_ripple={focusedOptions.tabBarAndroidRipple}
            indicatorContainerStyle={focusedOptions.tabBarIndicatorContainerStyle}
            contentContainerStyle={focusedOptions.tabBarContentContainerStyle}
            style={[{ backgroundColor: "red" }, focusedOptions.tabBarStyle]} // Should be transparent
            getAccessibilityLabel={({ route }: any) =>
                descriptors[route.key].options.tabBarAccessibilityLabel
            }
            getTestID={({ route }: any) => descriptors[route.key].options.tabBarTestID}
            onTabPress={({ route, preventDefault }: any) => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });
              
                if (event.defaultPrevented) {
                    preventDefault();
                }
            }}
            onTabLongPress={({ route }: any) =>
                navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                })
            }
            renderIcon={({ route, focused, color }: any) => {
                const { options } = descriptors[route.key];

                if (options.tabBarShowIcon === false) {
                    return null;
                }
              
                if (options.tabBarIcon !== undefined) {
                    const icon = options.tabBarIcon({ focused, color });

                    return (
                        <View style={[{height: 24, width: 24}, options.tabBarIconStyle]}>{icon}</View>
                    );
                }
              
                return null;
            }}
            renderLabel={({ route, focused, color }: any) => {
                const { options } = descriptors[route.key];

                if (options.tabBarShowLabel === false) {
                    return null;
                }
              
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : (route as Route<string>).name;
              
                if (typeof label === 'string') {
                    return (
                        <Text
                            style={[{ textAlign: 'center', textTransform: 'uppercase', fontSize: 13, margin: 4, backgroundColor: 'transparent' }, { color }, options.tabBarLabelStyle]}
                            allowFontScaling={options.tabBarAllowFontScaling}>
                            {label}
                        </Text>
                    );
                }
              
                const children =
                    typeof options.tabBarLabel === 'string'
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;
              
                return label({ focused, color, children });
            }}
            renderBadge={({ route }: any) => {
                const { tabBarBadge } = descriptors[route.key].options;

                return tabBarBadge?.() ?? null;
            }}
            renderIndicator={({ navigationState: state, ...rest }: any) => {
                return focusedOptions.tabBarIndicator ? (
                    focusedOptions.tabBarIndicator({
                        state: state as TabNavigationState<ParamListBase>,
                        ...rest,
                    })
                ) : (
                    <ReAnimated.View style={focusedOptions.indicatorStyle}>
                        <TabBarIndicator navigationState={state} {...rest} />
                    </ReAnimated.View>
                );
            }}
        />
    );
}

function TabBarIndicator<T extends IndicatorRoute>({
    getTabWidth,
    layout,
    navigationState,
    position,
    width,
    gap,
    style,
}: Props<T>) {
    const isIndicatorShown = React.useRef(false);
    const isWidthDynamic = width === 'auto';

    const opacity = useAnimatedValue(isWidthDynamic ? 0 : 1);

    const indicatorVisible = isWidthDynamic
        ? layout.width &&
            navigationState.routes
                .slice(0, navigationState.index)
                .every((_, r) => getTabWidth(r))
        : true;

    React.useEffect(() => {
        const fadeInIndicator = () => {
            if (
                !isIndicatorShown.current &&
                isWidthDynamic &&
                // We should fade-in the indicator when we have widths for all the tab items
                indicatorVisible
            ) {
                isIndicatorShown.current = true;

                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 150,
                    easing: Easing.in(Easing.linear),
                    useNativeDriver: true,
                }).start();
            }
        };

        fadeInIndicator();

        return () => opacity.stopAnimation();
    }, [indicatorVisible, isWidthDynamic, opacity]);

    const { routes } = navigationState;

    const transform = [];

    if (layout.width) {
        const translateX = routes.length > 1 ? getTranslateX(position, routes, getTabWidth, gap) : 0;

        transform.push({ translateX: translateX });
    }

    if (width === 'auto') {
        const inputRange = routes.map((_, i) => i);
        const outputRange = inputRange.map(getTabWidth);

        transform.push(
            {
                scaleX: routes.length > 1 ? position.interpolate({
                    inputRange,
                    outputRange,
                    extrapolate: 'clamp',
                }) : outputRange[0],
            },
            { translateX: 0.5 }
        );
    }

    return (
        <Animated.View
            style={[
                {
                    backgroundColor: '#ffeb3b',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    height: 2
                },
                // @ts-ignore
                { width: width === 'auto' ? 1 : width },
                // If layout is not available, use `left` property for positioning the indicator
                // This avoids rendering delay until we are able to calculate translateX
                // If platform is macos use `left` property as `transform` is broken at the moment.
                // See: https://github.com/microsoft/react-native-macos/issues/280
                layout.width && Platform.OS !== 'macos'
                    ? { left: 0 }
                    : { left: `${(100 / routes.length) * navigationState.index}%` },
                { transform },
                width === 'auto' ? { opacity: opacity } : null,
                style,
            ]}
        />
    );
}

const getTranslateX = (
    position: Animated.AnimatedInterpolation<number>,
    routes: IndicatorRoute[],
    getTabWidth: GetTabWidth,
    gap?: number
) => {
    const inputRange = routes.map((_, i) => i);

    // every index contains widths at all previous indices
    const outputRange = routes.reduce<number[]>((acc, _, i) => {
        if (i === 0) return [0];
        return [...acc, acc[i - 1] + getTabWidth(i - 1) + (gap ?? 0)];
    }, []);

    const translateX = position.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp',
    });

    return Animated.multiply(translateX, I18nManager.isRTL ? -1 : 1);
};

type IndicatorRoute = {
    key: string;
    icon?: string;
    title?: string;
    accessible?: boolean;
    accessibilityLabel?: string;
    testID?: string;
};