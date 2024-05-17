import React from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import youtube from './YouTube'
import Svg, { Path } from 'react-native-svg';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

function Component ({ navigation }: any) {
    const [focused, setFocused] = React.useState(true);
    const [suggestions, setSuggestions]: [any[], any] = React.useState([ ]);
    const [results, setResults]: [any, any] = React.useState({ });
    const [filter, setFilter] = React.useState('');
    const [text, setText] = React.useState('');

    const safeAreaInsets = useSafeAreaInsets();

    var content;

    if (focused) {
        if (suggestions.length) {
            content =
            <View>
                {suggestions[0].contents.map((item: any) => <Pressable key={item.suggestion.text} style={{ alignItems: "center", padding: 10, flexDirection: "row" }} onPress={() => { Keyboard.dismiss(); setFilter(''); setText(item.endpoint.payload.query); youtube.getSearchSuggestions(item.endpoint.payload.query).then(setSuggestions); if (text.length) youtube.getSearch(item.endpoint.payload.query).then(setResults); setFocused(false); }}>
                    <Svg
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        style={{ marginLeft: 10, marginRight: 20 }}
                        fill={"#ffffff"}>
                        <Path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                    </Svg>
                    {item.suggestion.runs.map((run: any) => <Text key={run.text + item.suggestion.text} style={{ color: "#ffffff", fontSize: 16, fontWeight: run.bold ? "bold" : "regular" }}>{run.text}</Text>)}
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
                <Pressable style={{ height: "100%" }} onPress={() => Keyboard.dismiss()}></Pressable>
            </View>
        } else {
            content = <Pressable style={{ height: "100%" }} onPress={() => navigation.pop()}></Pressable>
        }
    } else if (text.length) {
        if (!filter.length) {
            content =
            <Tab.Navigator sceneContainerStyle={{ backgroundColor: "transparent" }} screenOptions={{ swipeEnabled: false, tabBarStyle: { backgroundColor: "transparent", paddingTop: 1, borderBottomColor: "rgba(255, 255, 255, 0.15)", borderBottomWidth: 1 }, tabBarIndicatorContainerStyle: { transform: [{ translateY: 1 }] }, tabBarIndicatorStyle: { backgroundColor: "#ffffff" }, tabBarLabelStyle: { fontSize: 14, fontWeight: 600 }, tabBarActiveTintColor: "#ffffff", tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)" }}>
                <Tab.Screen name="YT MUSIC" children={()=><SearchResults results={results} applyFilter={setFilter} />} />
                <Tab.Screen name="LIBRARY" children={()=><LibraryResults text={text} />} />
            </Tab.Navigator>
        } else {
            content = <MoreResults startingResults={results} filter={filter} applyFilter={setFilter} />
        }
    }

    return (
        <View style={{ backgroundColor: "#030303", height: "100%" }}>
            <Image style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 0.75 }} source={{ uri: youtube.backgroundUrl }} />
            <LinearGradient
                start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
                locations={[0.25,0.75,1]}
                colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
                style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
            </LinearGradient>
            <SafeAreaView style={{ paddingTop: safeAreaInsets.top }}>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                    <View style={{ width: 8 }}></View>
                    <Pressable onPress={() => navigation.pop()}>
                        <Svg
                            width={32}
                            height={32}
                            viewBox='0 -960 960 960'
                            fill={"#ffffff"}>
                            <Path d="M560-267.69 347.69-480 560-692.31 588.31-664l-184 184 184 184L560-267.69Z" />
                        </Svg>
                    </Pressable>
                    <View style={{ justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.35)", paddingLeft: 10, paddingRight: 3, flexGrow: 1, borderRadius: 50, marginLeft: 16, marginRight: 12 }}>
                        <TextInput
                            style={{ color: "#ffffff", fontSize: 16, }}
                            placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
                            autoFocus={true}
                            value={text} 
                            clearButtonMode="while-editing"
                            onChangeText={(value) => { setText(value); youtube.getSearchSuggestions(value).then(setSuggestions); }}
                            onSubmitEditing={() => { if (text.length) { setFilter(""); youtube.getSearch(text).then(setResults); } }}
                            onBlur={() => setFocused(false)}
                            onFocus={() => setFocused(true)}
                            placeholder="Search YouTube Music"
                            keyboardType="web-search"
                        />
                    </View>
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
    results: any;
    applyFilter: Function;
}

function SearchResults ({ results, applyFilter }: SearchResultsProps) {
    if (results.header) {
        return (
            <ScrollView>
                <ScrollView horizontal={true} style={{ padding: 10, paddingBottom: 0 }} contentContainerStyle={{ paddingRight: 20 }} showsHorizontalScrollIndicator={false}>
                    {results.header.chips.map((chip: any) => <Pressable key={chip.text} onPress={() => applyFilter(chip.text)} style={{ margin: 5, backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.125)", borderWidth: 1, borderRadius: 7.5, padding: 10, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: 600 }}>{chip.text}</Text>
                    </Pressable>)}
                </ScrollView>
                {results.contents.map((shelf: any) => shelf.type == "MusicShelf" ?
                <View key={shelf.title.text}>
                    <Pressable onPress={() => applyFilter(shelf.title.text)} style={{ padding: 15, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: 700 }}>{shelf.title.text}</Text>
                        <View style={{ flexGrow: 1 }}></View>
                        <View style={{ borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.25)", padding: 3, paddingLeft: 8, paddingRight: 8, borderRadius: 50 }}><Text style={{ color: "#ffffff", fontWeight: 600 }}>More</Text></View>
                    </Pressable>
                    {shelf.contents.map((item: any) => <View key={item.id} style={{ padding: 5, paddingLeft: 15, flexDirection: "row", alignItems: "center" }}>
                        <Image width={50} height={50} style={{ borderRadius: 3 }} source={{ uri: item.thumbnail.contents[0].url }} />
                        <View style={{ marginLeft: 10, flexGrow: 1, width: 0 }}>
                            <Text numberOfLines={1} style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>{item.flex_columns[0].title.text}</Text>
                            <Text numberOfLines={1} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 500 }}>{item.flex_columns.slice(1).map((column: any) => column.title.text).join(' • ')}</Text>
                        </View>
                        <Pressable onPress={() => { console.log(item.id); }} style={{ height: "100%", paddingLeft: 5, paddingRight: 5 }}>
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
                    </View>)}
                </View> :
                <View key={shelf.title.text}>
                    <View style={{ padding: 15 }}>
                        <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: 700 }}>{shelf.header.title.text}</Text>
                    </View>
                    <View style={{ marginLeft: 15, marginRight: 15, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 5 }}>
                        {((content: any) => { return shelf.contents ? <>
                            <View style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 5 }}>{content}</View>
                            <View style={{ padding: 15, paddingTop: 0, paddingRight: 10 }}>{shelf.contents.map((item: any) => item.type == "Message" ? <Text key={item.text.text} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 500, marginTop: 15 }}>{item.text.text}</Text> :
                                <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center" }}>
                                <Image width={50} height={50} style={{ borderRadius: 3 }} source={{ uri: item.thumbnail.contents[0].url }} />
                                <View style={{ marginLeft: 10, flexGrow: 1, width: 0 }}>
                                    <Text numberOfLines={1} style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>{item.flex_columns[0].title.text}</Text>
                                    <Text numberOfLines={1} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 500 }}>{item.flex_columns.slice(1).map((column: any) => column.title.text).join(' • ')}</Text>
                                </View>
                                <Pressable onPress={() => { console.log(item.id); }} style={{ height: "100%", paddingLeft: 5, paddingRight: 5 }}>
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
                            </View>)}</View>
                        </> : content })(
                        <View style={{ padding: 15, paddingRight: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image width={50} height={50} style={{ borderRadius: 3 }} source={{ uri: shelf.thumbnail.contents[0].url }} />
                                <View style={{ marginLeft: 10, flexGrow: 1, width: 0 }}>
                                    <Text numberOfLines={1} style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>{shelf.title.text}</Text>
                                    <Text numberOfLines={1} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 500 }}>{shelf.subtitle.text}</Text>
                                </View>
                                <Pressable onPress={() => { console.log(shelf.title.text); }} style={{ height: "100%", paddingLeft: 5, paddingRight: 5 }}>
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
                            <View style={{ flexDirection: "row", marginTop: 15, marginRight: 5 }}>
                                <Pressable style={{ backgroundColor: "#ffffff", borderRadius: 50, flexGrow: 1, width: 0, padding: 5, alignItems: "center" }}>
                                    <Text style={{ fontWeight: 700 }}>{shelf.buttons[0].text}</Text>
                                </Pressable>
                                <View style={{ width: 15 }}></View>
                                <Pressable style={{ borderColor: "rgba(255, 255, 255, 0.25)", borderWidth: 1, borderRadius: 50, flexGrow: 1, width: 0, padding: 5, alignItems: "center" }}>
                                    <Text style={{ color: "#ffffff", fontWeight: 700 }}>{shelf.buttons[1].text}</Text>
                                </Pressable>
                            </View>
                        </View>)}
                    </View>
                </View>)}
            </ScrollView>
        );
    } else {
        return (
            <View style={{ height: "100%", alignItems: "center" }}>
                <View style={{ flexGrow: 1 }}></View>
                <Svg
                    width={52}
                    height={52}
                    viewBox='0 0 24 24'
                    fill={"rgba(255, 255, 255, 0.75)"}>
                    <Path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                </Svg>
                <Text style={{ marginTop: 10, color: "rgba(255, 255, 255, 0.75)", fontSize: 16, fontWeight: 400 }}>No Results found</Text>
                <View style={{ flexGrow: 5 }}></View>
            </View>
        );
    }
}

interface MoreResultsProps {
    startingResults: any;
    filter: string;
    applyFilter: Function
}

function MoreResults ({ startingResults, filter, applyFilter }: MoreResultsProps) {
    const [state, setState]: [{ results: any, contents: any[], currentFilter: string }, any] = React.useState({ results: null, contents: [], currentFilter: filter });
    const [loading, setLoading] = React.useState(true);

    if (!state.results || state.currentFilter != filter) {
        startingResults.getMore(startingResults.contents.find((shelf: any) => shelf.title.text == filter)).then((data: any) => {
            setState({ results: data, contents: data.contents[0].contents, currentFilter: filter });
            setLoading(false);
        });
        
        return (
            <View style={{ height: "100%", alignItems: "center" }}>
                <View style={{ flexGrow: 1 }}></View>
                <Svg
                    width={52}
                    height={52}
                    viewBox='0 0 24 24'
                    fill={"rgba(255, 255, 255, 0.75)"}>
                    <Path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                </Svg>
                <Text style={{ marginTop: 10, color: "rgba(255, 255, 255, 0.75)", fontSize: 16, fontWeight: 400 }}>No Results found</Text>
                <View style={{ flexGrow: 5 }}></View>
            </View>
        );
    }

    return (
        <FlatList
            data={state.contents}
            renderItem={({ item }) => <View key={item.id} style={{ padding: 5, paddingLeft: 15, flexDirection: "row", alignItems: "center" }}>
                <Image width={50} height={50} style={{ borderRadius: 3 }} source={{ uri: item.thumbnail.contents[0].url }} />
                <View style={{ marginLeft: 10, flexGrow: 1, width: 0 }}>
                    <Text numberOfLines={1} style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>{item.flex_columns[0].title.text}</Text>
                    <Text numberOfLines={1} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 500 }}>{item.flex_columns.slice(1).map((column: any) => column.title.text).join(' • ')}</Text>
                </View>
                <Pressable onPress={() => { console.log(item.id); }} style={{ height: "100%", paddingLeft: 5, paddingRight: 5 }}>
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
            </View>}
            ListHeaderComponent={<View style={{ flexDirection: "row" }}>
                <Pressable onPress={() => applyFilter("")} style={{ margin: 10, marginRight: 5, padding: 5, justifyContent: "center", backgroundColor: "#ffffff", borderColor: "#ffffff", borderWidth: 1, borderRadius: 7.5 }}>
                    <Svg
                        width={28}
                        height={28}
                        viewBox='0 0 24 24'
                        fill={"#000000"}>
                        <Path d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z" />
                    </Svg>
                </Pressable>
                <ScrollView horizontal={true} style={{ padding: 5, paddingLeft: 0 }} contentContainerStyle={{ paddingRight: 15 }} showsHorizontalScrollIndicator={false}>
                    {startingResults.header.chips.map((chip: any) => <Pressable key={chip.text} onPress={() => applyFilter(chip.text == filter ? "" : chip.text)} style={{ margin: 5, backgroundColor: chip.text == filter ? "#ffffff" : "rgba(255, 255, 255, 0.1)", borderColor: chip.text == filter ? "#ffffff" : "rgba(255, 255, 255, 0.125)", borderWidth: 1, borderRadius: 7.5, padding: 10, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ color: chip.text == filter ? "#000000" : "#ffffff", fontSize: 16, fontWeight: 600 }}>{chip.text}</Text>
                    </Pressable>)}
                </ScrollView>
            </View>}
            keyExtractor={(item) => item.id}
            onEndReached={() => { if (!loading) { setLoading(true); state.results.getContinuation().then((data: any) => { setState({ results: data, contents: state.contents.concat(data.contents.contents), currentFilter: state.currentFilter }); setLoading(false); }); }}}
            onEndReachedThreshold={0.8}
        />
    );
}

interface LibraryResultsProps {
    text: string;
}

function LibraryResults ({ text }: LibraryResultsProps) {
    const [results, setResults]: [any, any] = React.useState({ });
    
    return (
        <View style={{ height: "100%", alignItems: "center" }}>
            <View style={{ flexGrow: 1 }}></View>
            <Svg
                width={52}
                height={52}
                viewBox='0 0 24 24'
                fill={"rgba(255, 255, 255, 0.75)"}>
                <Path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
            </Svg>
            <Text style={{ marginTop: 10, color: "rgba(255, 255, 255, 0.75)", fontSize: 16, fontWeight: 400 }}>No Results found</Text>
            <View style={{ flexGrow: 5 }}></View>
        </View>
    );
}

export default Component;