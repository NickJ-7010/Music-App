import React from 'react';
import {
    Text,
    View,
    ScrollView,
    RefreshControl,
    Image,
    SafeAreaView
} from 'react-native';
import TabTemplate from './TabTemplate';
import TopBar from './TopBar';
import youtube from './YouTube';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Content ({ navigation }: any) {
    const [refreshing, setRefreshing] = React.useState(true);

    const safeAreaInsets = useSafeAreaInsets();

    if (refreshing) {
        setRefreshing(false);
    }

    return (
        <View style={{ backgroundColor: "#030303" }}>
            <Image style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 0.75 }} source={{ uri: youtube.backgroundUrl }} />
            <LinearGradient
                start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
                locations={[0.25,0.75,1]}
                colors={['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.5)', 'rgba(3, 3, 3, 1)']}
                style={{ position: "absolute", top: 0, width: "100%", aspectRatio: 1, opacity: 1 }}>
            </LinearGradient>
            <SafeAreaView style={{ height: "100%", paddingTop: safeAreaInsets.top }}>
                <TopBar navigation={navigation}></TopBar>
                <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />
                    }>
                    <Text style={{ color: "#fff", fontSize: 20 }}>Settings Screen</Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

function Component () {
    return (
        <TabTemplate>{Content}</TabTemplate>
    );
}

export default Component;