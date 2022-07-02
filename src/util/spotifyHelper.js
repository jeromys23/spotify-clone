import axios from 'axios';

//querystring
import querystring from 'query-string';
import { Buffer } from 'buffer';

//ENUMS
export const LAST4WEEKS = 'short_term';
export const LAST6MONTHS = 'medium_term';
export const ALLTIME = 'long_term';

//Endpoints
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const BASE_URL = 'https://api.spotify.com/v1';

//Auth constants
const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirect_uri = 'http://localhost:3000/';
const client_id = '08bc0a4718424de49cf7175abb26b7d5';
const client_secret = '3ed8fa77ec9141fbbe5c4513cc978235';

const scopes = [
    'streaming',
    'user-read-email',
    'user-library-read',
    'user-read-private',
    'user-top-read',
    'playlist-read-collaborative',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-recently-played',
    'app-remote-control',
];

export const LOGIN_URL = `${authEndpoint}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes.join(
    '%20'
)}`;

/**
 * Gets an access token to be used to request data from Spotify API
 * @param {} code
 * @returns
 */
export const GetAccessToken = async (code) => {
    //auth params
    var authOptions = {
        body: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
        },
        headers: {
            Authorization:
                'Basic ' +
                new Buffer.from(client_id + ':' + client_secret).toString(
                    'base64'
                ),
        },
        json: true,
    };

    return axios
        .post(TOKEN_URL, querystring.stringify(authOptions.body), {
            headers: authOptions.headers,
        })
        .then((res) => res.data)
        .catch((err) => console.error(err));
};

/**
 * Gets a new access token after it expires using a refresh token
 * @param {} refresh_token
 * @returns
 */
export const GetRefreshToken = async (refresh_token) => {
    //auth params
    var authOptions = {
        body: {
            refresh_token,
            grant_type: 'refresh_token',
        },
        headers: {
            Authorization:
                'Basic ' +
                new Buffer.from(client_id + ':' + client_secret).toString(
                    'base64'
                ),
        },
        json: true,
    };

    return axios
        .post(TOKEN_URL, querystring.stringify(authOptions.body), {
            headers: authOptions.headers,
        })
        .then((res) => res.data)
        .catch((err) => console.error(err));
};

/**
 * Manually plays the spotify player through the API
 * @param {*} access_token
 * @param {*} deviceId
 * @param {*} uri
 * @returns
 */
export const PlayPlayerContext = async (access_token, deviceId, uri) => {
    var context = uri.includes('track')
        ? { uris: [uri] }
        : { context_uri: uri };
    return axios
        .put(BASE_URL + `/me/player/play?device_id=${deviceId}`, context, {
            headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => res.data)
        .catch((err) => console.error(err));
};

/**
 * Manually resumes spotify player through the API
 * @param {*} access_token
 * @param {*} deviceId
 * @returns
 */
export const ResumePlayer = async (access_token, deviceId) => {
    return axios
        .put(BASE_URL + `/me/player/play?device_id=${deviceId}`, null, {
            headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => res.data)
        .catch((err) => console.error(err));
};

/**
 * Manually pauses the spotify player through the API
 * @param {*} access_token
 * @param {*} deviceId
 * @returns
 */
export const PausePlayer = async (access_token, deviceId) => {
    return axios
        .put(BASE_URL + `/me/player/pause?device_id=${deviceId}`, null, {
            headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => res.data)
        .catch((err) => console.error(err));
};
