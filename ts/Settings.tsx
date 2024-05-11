import React from 'react';
import {
    Text,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import TopBar from './TopBar';
import TabTemplate from './TabTemplate';

function Content ({ navigation }: any) {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
            setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={{ backgroundColor: "#030303", height: "100%" }}>
            <TopBar navigation={navigation}></TopBar>
            <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Text style={{ color: "#fff", fontSize: 20 }}>Settings Screen</Text>
            </ScrollView>
        </View>
    );
}

function Component () {
    return (
        <TabTemplate>{Content}</TabTemplate>
    );
}

export default Component;