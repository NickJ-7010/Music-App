import React from 'react';
import {
    Keyboard,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';
import youtube from './YouTube'
import Svg, { Path } from 'react-native-svg';

function Component ({ navigation }: any) {
    const [focused, setFocused] = React.useState(true);
    const [suggestions, setSuggestions]: [any[], any] = React.useState([ ]);
    const [text, setText] = React.useState('');

    var content;

    if (focused) {
        if (suggestions.length) {
            content =
            <View>
                {suggestions[0].contents.map((item: any) => <Pressable style={{ alignItems: "center", padding: 10, flexDirection: "row" }} onPress={() => { Keyboard.dismiss(); setText(item.endpoint.payload.query); youtube.getSearchSuggestions(item.endpoint.payload.query).then((data: any) => { setSuggestions(data) }); setFocused(false); }}>
                    <Svg
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        style={{ marginLeft: 10, marginRight: 20 }}
                        fill={"#ffffff"}>
                        <Path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                    </Svg>
                    {item.suggestion.runs.map((run: any) => <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: run.bold ? "bold" : "regular" }}>{run.text}</Text>)}
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
        <View>
            <Text style={{ color: "#fff", fontSize: 20 }}>Search Results Here</Text>
        </View>
    }

    return (
        <View style={{ backgroundColor: "#030303", height: "100%" }}>
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
                    style={{ color: "#ffffff", flexGrow: 1, fontSize: 16, backgroundColor: "#212121", paddingLeft: 10, paddingRight: 10, padding: 5, borderRadius: 50 }}
                    autoFocus={true}
                    value={text} 
                    clearButtonMode="while-editing"
                    onChangeText={(value) => { setText(value); youtube.getSearchSuggestions(value).then((data: any) => { setSuggestions(data) }); }}
                    onBlur={() => setFocused(false)}
                    onFocus={() => setFocused(true)}
                    placeholder="Search YouTube Music"
                    keyboardType="web-search"
                />
                <View style={{ width: 12 }}></View>
                <Pressable style={{ backgroundColor: "#212121", paddingLeft: 8, paddingRight: 8, borderRadius: 32 }} onPress={() => { navigation.push("Search") }}>
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
            {content}
        </View>
    );
}

interface SearchResultsProps {
    text: string
}

function SearchResults ({ text }: SearchResultsProps) {
    const [Results, setResults]: [any[], any] = React.useState([ ]);
    
};

export default Component;