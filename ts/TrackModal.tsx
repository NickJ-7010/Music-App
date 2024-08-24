import React from 'react';
import { View, Image, Text, Pressable } from "react-native";
import Modal from 'react-native-modal';
import IconRender from './IconRender';
import youtube from './YouTube'
import Svg, { Path } from 'react-native-svg';

function Component ({ data, isVisible, setVisible, navigation }: { data: any, isVisible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>, navigation: any }) {
    const thumbnail = data.thumbnail.length ? data.thumbnail[0] : data.thumbnail.contents[0];

    return <Modal
        key={'modal' + data.id}
        isVisible={isVisible}
        onBackdropPress={() => setVisible(false)}
        onSwipeComplete={() => setVisible(false)}
        swipeDirection="down"
        swipeThreshold={10}
        style={{ margin: 0 }}>
        <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "#202022", borderRadius: 20, overflow: "hidden", paddingBottom: 32 }}>
            <View style={{ padding: 15, height: 80, width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", borderBottomWidth: 1, borderBlockColor: "rgba(255, 255, 255, 0.1)", flexDirection: "row", alignItems: "center" }}>
                <Image width={50} height={thumbnail.height / thumbnail.width * 50} style={{ borderRadius: data.item_type == 'artist' ? 50 : 5 }} source={{ uri: thumbnail.url }} />
                <View style={{ marginLeft: 10, flexGrow: 1, width: 0 }}>
                    <Text numberOfLines={1} style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>{data.title?.text ?? data.flex_columns[0]?.title?.text}</Text>
                    <Text numberOfLines={1} style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16, fontWeight: 500 }}>{data.flex_columns?.slice(1)?.map((column: any) => column.title.text).join(' • ') ?? data.subtitle?.text}</Text>
                </View>
                <Pressable onPress={() => setVisible(false)} style={{ height: "100%" }}>
                    <View style={{ flexGrow: 1, justifyContent: "center" }}>
                        <Svg
                            width={36}
                            height={36}
                            viewBox='0 -960 960 960'
                            fill={"#ffffff"}>
                            <Path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
                        </Svg>
                    </View>
                </Pressable>
            </View>
            {data.menu.items.filter((item: any) => item.text != undefined).map((item: any, index: any) =>
                <Pressable key={index} onPress={() => { setVisible(false); setTimeout(() => youtube.handleAction(item, navigation), 200); }} style={{ padding: 15, paddingLeft: 24, flexDirection: "row", alignItems: "center" }}>
                    <IconRender icon={item.icon_type} width={24}></IconRender>
                    <Text style={{ color: "white", fontSize: 15, fontWeight: 500, marginLeft: 24 }}>{typeof item.text == "string" ? item.text : item.text?.text}</Text>
                </Pressable>
            )}
        </View>
    </Modal>
}

export default Component;