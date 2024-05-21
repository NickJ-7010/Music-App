import TrackPlayer, { Event } from "react-native-track-player";
import youtube from "./YouTube";

module.exports = async function() {
    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        await TrackPlayer.play();
    });
    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        youtube.playerControls.next();
    });
    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        youtube.playerControls.previous();
    });
    TrackPlayer.addEventListener(Event.RemotePause, async () => {
        await TrackPlayer.pause();
    });
    TrackPlayer.addEventListener(Event.RemoteSeek, async (event) => {
        await TrackPlayer.seekTo(event.position);
    });
}