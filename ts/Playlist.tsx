import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import youtube from './YouTube';

function Component ({ navigation, route }: any) {
    const [data, setData]: [any, any] = useState(undefined);

    const type = route.params.type;

    useEffect(() => {
        if (!type) {
            youtube.getAlbum(route.params.id).then(album => {
                console.log(JSON.stringify(album));
                setData(album);
            });
        } else if (type == 1) {
            youtube.getPlaylist(route.params.id).then(playlist => {
                console.log(JSON.stringify(playlist));
                setData(playlist);
            });
        } else if (type == 2) {
            // TODO: Handle local playlist
        }
    }, []);

    return <View></View>
}

export default Component;