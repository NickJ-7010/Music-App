import React from 'react';
import {
    Image,
    Keyboard,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
} from 'react-native';
import youtube from './YouTube'
import Svg, { Path } from 'react-native-svg';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Component ({ navigation }: any) {
    const [focused, setFocused] = React.useState(true);
    const [suggestions, setSuggestions]: [any[], any] = React.useState([ ]);
    const [results, setResults]: [any, any] = React.useState({ });
    const [more, setMore] = React.useState('');
    const [text, setText] = React.useState('');

    const safeAreaInsets = useSafeAreaInsets();

    var content;

    if (focused) {
        if (suggestions.length) {
            content =
            <View>
                {suggestions[0].contents.map((item: any) => <Pressable key={item.suggestion.text} style={{ alignItems: "center", padding: 10, flexDirection: "row" }} onPress={() => { Keyboard.dismiss(); setText(item.endpoint.payload.query); youtube.getSearchSuggestions(item.endpoint.payload.query).then((data: any) => { setSuggestions(data) }); youtube.getSearch(text).then(data => { setResults(data); }); setFocused(false); }}>
                    <Svg
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        style={{ marginLeft: 10, marginRight: 20 }}
                        fill={"#ffffff"}>
                        <Path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                    </Svg>
                    {item.suggestion.runs.map((run: any) => <Text key={run.text} style={{ color: "#ffffff", fontSize: 16, fontWeight: run.bold ? "bold" : "regular" }}>{run.text}</Text>)}
                    <View style={{ flexGrow: 1 }}></View>
                    <Svg
                        width={24}
                        height={24}
                        viewBox='0 -960 960 960'
                        style={{ marginLeft: 10, marginRight: 10 }}
                        fill={"#ffffff"}>
                        <Path d="m712.46-268.46-404-403.23V-300h-40v-440h440v40H336.77L740-296l-27.54 27.54Z" />
                    </Svg>
                </Pressable>)}
                <Pressable style={{ height: "100%" }} onPress={() => { Keyboard.dismiss(); }}></Pressable>
            </View>
        } else {
            content = <Pressable style={{ height: "100%" }} onPress={() => { navigation.pop(); }}></Pressable>
        }
    } else if (text.length) {
        content =
        <Stack.Navigator initialRouteName="Results" screenOptions={{ contentStyle: { backgroundColor: "transparent" }, headerShown: false }}>
            <Stack.Screen name="Results" children={()=><Tab.Navigator sceneContainerStyle={{ backgroundColor: "transparent" }} screenOptions={{ tabBarStyle: { backgroundColor: "transparent" }, tabBarIndicatorStyle: { backgroundColor: "#ffffff" }, tabBarLabelStyle: { fontSize: 14, fontWeight: 600 }, tabBarActiveTintColor: "#ffffff", tabBarInactiveTintColor: "#888888" }}>
                <Tab.Screen name="YT MUSIC" children={()=><SearchResults results={results} />} />
                <Tab.Screen name="LIBRARY" children={()=><LibraryResults text={text} />} />
            </Tab.Navigator>} />
            <Stack.Screen name="MoreResults" children={()=><SearchResults results={results} />} />
        </Stack.Navigator>
    }

    return (
        <View style={{ backgroundColor: "#030303", height: "100%" }}>
            <Image style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 0.75 }} source={{ uri: youtube.backgroundUrl }} />
            <LinearGradient
                start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
                locations={[0,0.75,1]}
                colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
                style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
            </LinearGradient>
            <SafeAreaView style={{ paddingTop: safeAreaInsets.top }}>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                    <View style={{ width: 8 }}></View>
                    <Pressable onPress={() => { navigation.pop() }}>
                        <Svg
                            width={32}
                            height={32}
                            viewBox='0 -960 960 960'
                            fill={"#ffffff"}>
                            <Path d="M560-267.69 347.69-480 560-692.31 588.31-664l-184 184 184 184L560-267.69Z" />
                        </Svg>
                    </Pressable>
                    <View style={{ width: 16 }}></View>
                    <TextInput
                        style={{ color: "#ffffff", flexGrow: 1, fontSize: 16, backgroundColor: "rgba(0, 0, 0, 0.35)", paddingLeft: 10, paddingRight: 10, padding: 5, borderRadius: 50 }}
                        placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
                        autoFocus={true}
                        value={text} 
                        clearButtonMode="while-editing"
                        onChangeText={(value) => { setText(value); youtube.getSearchSuggestions(value).then((data: any) => { setSuggestions(data) }); }}
                        onBlur={() => { setFocused(false); youtube.getSearch(text).then(data => { setResults(data); }); }}
                        onFocus={() => setFocused(true)}
                        placeholder="Search YouTube Music"
                        keyboardType="web-search"
                    />
                    <View style={{ width: 12 }}></View>
                    <Pressable style={{ backgroundColor: "rgba(0, 0, 0, 0.35)", paddingLeft: 8, paddingRight: 8, borderRadius: 32 }} onPress={() => { navigation.push("Search") }}>
                        <Svg
                            width={32}
                            height={32}
                            viewBox='0 -960 960 960'
                            fill={"#ffffff"}>
                            <Path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z" />
                        </Svg>
                    </Pressable>
                    <View style={{ width: 12 }}></View>
                </View>
            </SafeAreaView>
            {content}
        </View>
    );
}

interface SearchResultsProps {
    results: any
}

function SearchResults ({ results }: SearchResultsProps) {
    return (
        <View style={{ height: "100%" }}>
            <Text style={{ color: "#ffffff" }}>Text</Text>
        </View>
    );
}

interface MoreResultsProps {
    results: any,
    
}

function MoreResults ({ results }: MoreResultsProps) {
    return (
        <View style={{ height: "100%" }}><Text style={{ color: "#ffffff" }}>Text</Text></View>
    );
}

interface LibraryResultsProps {
    text: string
}

function LibraryResults ({ text }: LibraryResultsProps) {
    const [results, setResults]: [any, any] = React.useState({ });
    
    console.log('text')

    return (
        <View style={{ height: "100%" }}><Text style={{ color: "#ffffff" }}>{text}</Text></View>
    );
}

export default Component;