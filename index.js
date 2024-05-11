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
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
