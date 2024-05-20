import TrackPlayer, { Event } from "react-native-track-player";

module.exports = async function() {
    console.log('text');
    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        console.log('play');
        await TrackPlayer.play();
    });
    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        await TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        if ((await TrackPlayer.getProgress()).position >= 5) {
            await TrackPlayer.seekTo(0);
        } else {
            await TrackPlayer.skipToPrevious();
        }
    });
    TrackPlayer.addEventListener(Event.RemotePause, async () => {
        await TrackPlayer.pause();
    });
    TrackPlayer.addEventListener(Event.RemoteSeek, async (event) => {
        await TrackPlayer.seekTo(event.position);
    });
}