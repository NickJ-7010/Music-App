import TrackPlayer, { Event, State } from "react-native-track-player";
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
    TrackPlayer.addEventListener(Event.PlaybackState, event => {
        if (event.state == State.Ready) {
            TrackPlayer.updateMetadataForTrack(0, {
                title: youtube.player.queue[youtube.player.currentIndex].track.basic_info.title,
                artist: youtube.player.queue[youtube.player.currentIndex].track.basic_info.author, //@ts-ignore
                artwork: youtube.player.queue[youtube.player.currentIndex].track.basic_info.thumbnail[0].url,
                duration: youtube.player.queue[youtube.player.currentIndex].track.basic_info.duration
            });
        }
    });
}