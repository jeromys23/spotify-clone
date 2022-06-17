import axios from "axios";

//querystring
import querystring from "query-string";
import {Buffer} from 'buffer';


//Endpoints
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const PLAYLIST_URL = "https://api.spotify.com/v1/playlists/{id}";
const ARTIST_URL = "https://api.spotify.com/v1/artists/{id}"
const TOP_SONGS_URL = "https://api.spotify.com/v1/artists/{id}/top-tracks?market=US";
const ARTIST_ALBUMS_URL = "https://api.spotify.com/v1/artists/{id}/albums";
const ALBUM_URL = "https://api.spotify.com/v1/albums/{id}"
const RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played";
const CURRENTLY_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const USER_TOP_TRACKS_URL = "https://api.spotify.com/v1/me/top/tracks?time_range={time_frame}";
const USER_TOP_ARTISTS_URL = "https://api.spotify.com/v1/me/top/artists?time_range={time_frame}";
const USER_LIKED_SONGS_URL = 'https://api.spotify.com/v1/me/tracks'


//ENUMS
export const LAST4WEEKS = "short_term";
export const LAST6MONTHS = 'medium_term';
export const ALLTIME = 'long_term';

//Auth constants
const authEndpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = "http://localhost:3000/";
const client_id = "08bc0a4718424de49cf7175abb26b7d5";
const client_secret = "3ed8fa77ec9141fbbe5c4513cc978235";

const scopes = [
  "streaming",
  "user-read-email",
  "user-library-read",
  "user-read-private",
  "user-top-read",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-recently-played",
  "app-remote-control",
];

export const LOGIN_URL = `${authEndpoint}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes.join(
  "%20"
)}`;

export const GetAccessToken = async (code) => {
  //auth params
  var authOptions = {
    body: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };

  return axios
    .post(TOKEN_URL, querystring.stringify(authOptions.body), {
      headers: authOptions.headers,
    })
    .then((res) => res.data)
    .catch(err => console.error(err));
}

export const GetPlaylist = async (access_token, id) => {
  let endpoint = PLAYLIST_URL.replace("{id}", id);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetAlbum = async (access_token, id) => {
  let endpoint = ALBUM_URL.replace("{id}", id);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};


export const GetArtist = async (access_token, id) => {
  let endpoint = ARTIST_URL.replace("{id}", id);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetArtistTopSongs = async (access_token, id) => {
  let endpoint = TOP_SONGS_URL.replace("{id}", id);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetArtistAlbums = async (access_token, id) => {
  let endpoint = ARTIST_ALBUMS_URL.replace("{id}", id);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetRecentlyPlayed = async (access_token) => {
  let endpoint = RECENTLY_PLAYED_URL;

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetCurrentlyPlaying = async (access_token) => {
  let endpoint = CURRENTLY_PLAYING_URL;

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetUserTopTracks = async (access_token, time_frame) => {
  let endpoint = USER_TOP_TRACKS_URL.replace('{time_frame}', time_frame);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetUserTopArtists = async (access_token, time_frame) => {
  let endpoint = USER_TOP_ARTISTS_URL.replace('{time_frame}', time_frame);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetUserLikedSongs = async (access_token) => {
  return axios
    .get(USER_LIKED_SONGS_URL, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
}



