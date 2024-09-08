import TrackPlayer, { Event, State } from "react-native-track-player";
import youtube from "./YouTube";

module.exports = async function() {
    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        const progress = await TrackPlayer.getProgress();
        console.log(progress);
        if (Math.floor(progress.position) == youtube.player.queue[youtube.player.currentIndex].track.duration || Math.floor(progress.position) == Math.floor(progress.duration)) {
            await TrackPlayer.seekTo(0);
            setTimeout(async () => { // Hacky fix but idk a better fix right now
                await TrackPlayer.play();
            }, 1000);
        } else {
            await TrackPlayer.play();
        }
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
        if (event.state == State.Ready || event.state == State.Playing) {
            youtube.registerMetadata();
        }
    });
}