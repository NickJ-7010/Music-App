import React from "react";
import { ColorValue } from "react-native";
import { Path, Svg } from "react-native-svg";

function Component ({ icon, width, fill = "#ffffff" }: { icon: String, width: number, fill?: ColorValue }) {
    var path;
    var viewBox;

    switch (icon) {
        case 'PLAY_ARROW':
            path = 'M6,4l12,8L6,20V4z';
            viewBox = '0 0 24 24';
            break;
        case 'MUSIC_SHUFFLE':
            path = 'M18.15,13.65l3.85,3.85l-3.85,3.85l-0.71-0.71L20.09,18H19c-2.84,0-5.53-1.23-7.39-3.38l0.76-0.65 C14.03,15.89,16.45,17,19,17h1.09l-2.65-2.65L18.15,13.65z M19,7h1.09l-2.65,2.65l0.71,0.71l3.85-3.85l-3.85-3.85l-0.71,0.71 L20.09,6H19c-3.58,0-6.86,1.95-8.57,5.09l-0.73,1.34C8.16,15.25,5.21,17,2,17v1c3.58,0,6.86-1.95,8.57-5.09l0.73-1.34 C12.84,8.75,15.79,7,19,7z M8.59,9.98l0.75-0.66C7.49,7.21,4.81,6,2,6v1C4.52,7,6.92,8.09,8.59,9.98z';
            viewBox = '0 0 24 24';
            break;
        case 'MIX':
            path = 'M10.5,14.41V9.6l4.17,2.4L10.5,14.41z M8.48,8.45L7.77,7.75C6.68,8.83,6,10.34,6,12s0.68,3.17,1.77,4.25l0.71-0.71 C7.57,14.64,7,13.39,7,12S7.57,9.36,8.48,8.45z M16.23,7.75l-0.71,0.71C16.43,9.36,17,10.61,17,12s-0.57,2.64-1.48,3.55l0.71,0.71 C17.32,15.17,18,13.66,18,12S17.32,8.83,16.23,7.75z M5.65,5.63L4.95,4.92C3.13,6.73,2,9.24,2,12s1.13,5.27,2.95,7.08l0.71-0.71 C4.02,16.74,3,14.49,3,12S4.02,7.26,5.65,5.63z M19.05,4.92l-0.71,0.71C19.98,7.26,21,9.51,21,12s-1.02,4.74-2.65,6.37l0.71,0.71 C20.87,17.27,22,14.76,22,12S20.87,6.73,19.05,4.92z';
            viewBox = '0 0 24 24';
            break;
        case 'QUEUE_PLAY_NEXT':
            path = 'M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z';
            viewBox = '0 0 24 24';
            break;
        case 'ADD_TO_REMOTE_QUEUE':
            path = 'M14,8H2V7h12V8z M10,11H2v1h8V11z M10,15H2v1h8V15z M22,7h-5v7.51C16.58,14.19,16.07,14,15.5,14c-1.38,0-2.5,1.12-2.5,2.5 c0,1.38,1.12,2.5,2.5,2.5c1.35,0,2.44-1.07,2.49-2.4L18,16.58V10h4V7z';
            viewBox = '0 0 24 24';
            break;
        case 'FAVORITE':
            path = 'M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z';
            viewBox = '0 0 24 24';
            break;
        case 'PLAYLIST_ADD':
        case 'ADD_TO_PLAYLIST':
            path = 'M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z';
            viewBox = '0 0 24 24';
            break;
        case 'ALBUM':
            path = 'M12,3c4.96,0,9,4.04,9,9s-4.04,9-9,9s-9-4.04-9-9S7.04,3,12,3 M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10 S17.52,2,12,2L12,2z M12,7c-2.77,0-5,2.23-5,5s2.23,5,5,5s5-2.23,5-5S14.77,7,12,7z M12,13.11c-0.61,0-1.11-0.5-1.11-1.11 s0.5-1.11,1.11-1.11s1.11,0.5,1.11,1.11S12.61,13.11,12,13.11z';
            viewBox = '0 0 24 24';
            break;
        case 'ARTIST':
            path = 'M22,10h-4v2v3.51C17.58,15.19,17.07,15,16.5,15c-1.38,0-2.5,1.12-2.5,2.5c0,1.38,1.12,2.5,2.5,2.5 c1.36,0,2.46-1.08,2.5-2.43V12h3V10z M3.06,19c0.38-3.11,2.61-6.1,7.94-6.1c0.62,0,1.19,0.05,1.73,0.13l0.84-0.84 c-0.58-0.13-1.19-0.23-1.85-0.26C13.58,11.59,15,9.96,15,8c0-2.21-1.79-4-4-4C8.79,4,7,5.79,7,8c0,1.96,1.42,3.59,3.28,3.93 C4.77,12.21,2,15.76,2,20h10.02L12,19H3.06z M8,8c0-1.65,1.35-3,3-3s3,1.35,3,3s-1.35,3-3,3S8,9.65,8,8z';
            viewBox = '0 0 24 24';
            break;
        case 'SHARE':
            path = 'M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z';
            viewBox = '0 0 24 24';
            break;
        case 'LIBRARY_ADD':
            path = 'M4,20h14v1H3V6h1V20z M18,10h-4V6h-1v4H9v1h4v4h1v-4h4V10z M21,3v15H6V3H21z M20,4H7v13h13V4z';
            viewBox = '0 0 24 24';
            break;
        case 'BROADCAST':
            path = 'M6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 13.66 17.33 15.16 16.23 16.25L15.52 15.54C16.44 14.63 17 13.38 17 12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 13.38 7.56 14.63 8.47 15.54L7.76 16.25C6.67 15.16 6 13.66 6 12ZM14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 12.74 10.4 13.38 11 13.72V22H13V13.72C13.6 13.38 14 12.74 14 12ZM4.94 19.08L5.65 18.37C4.01 16.74 3 14.49 3 12C3 7.04 7.04 3 12 3C16.96 3 21 7.04 21 12C21 14.49 19.99 16.74 18.35 18.37L19.06 19.08C20.88 17.27 22 14.77 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 14.77 3.12 17.27 4.94 19.08Z';
            viewBox = '0 0 24 24';
            break;
        default:
            path = 'M109.23-160 480-800l370.77 640H109.23ZM178-200h604L480-720 178-200Zm302-55.38q10.46 0 17.54-7.08 7.08-7.08 7.08-17.54 0-10.46-7.08-17.54-7.08-7.08-17.54-7.08-10.46 0-17.54 7.08-7.08 7.08-7.08 17.54 0 10.46 7.08 17.54 7.08 7.08 17.54 7.08Zm-20-89.24h40v-200h-40v200ZM480-460Z';
            viewBox = '0 -960 960 960';
            console.log(icon);
            break;
    }

    return (
        <Svg
            width={width}
            height={width}
            viewBox={viewBox}
            fill={fill}>
            <Path d={path} />
        </Svg>
    );
}

export default Component;