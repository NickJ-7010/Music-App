/**
 * @format
 */
import { TextDecoder } from 'text-decoding';
globalThis.TextDecoder = TextDecoder;
import { ReadableStream } from 'web-streams-polyfill';
globalThis.ReadableStream = ReadableStream;
import "react-native-url-polyfill/auto";
import { polyfill } from 'react-native-polyfill-globals/src/fetch';
import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';

LogBox.ignoreLogs(['Require cycle:']);

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./ts/AudioPlayer'));