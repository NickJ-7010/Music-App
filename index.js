/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';

// YouTube.js code to use it with react-native without fixes
import 'web-streams-polyfill';
import 'text-encoding-polyfill'
import 'react-native-url-polyfill/auto';
import {decode, encode} from 'base-64';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

import {MMKV} from 'react-native-mmkv';
global.mmkvStorage = MMKV;

// See https://github.com/nodejs/node/issues/40678#issuecomment-1126944677
class CustomEvent extends Event {
    #detail;

    constructor(type, options) {
        super(type, options);
        this.#detail = options?.detail ?? null;
    }

    get detail() {
        return this.#detail;
    }
}

global.CustomEvent = CustomEvent;

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./ts/AudioPlayer'));