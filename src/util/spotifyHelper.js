import axios from "axios";


//Endpoints
const PLAYLIST_URL = "https://api.spotify.com/v1/playlists/{id}";
const ARTIST_URL = "https://api.spotify.com/v1/artists/{id}"
const TOP_SONGS_URL = "https://api.spotify.com/v1/artists/{id}/top-tracks?market=US";
const ARTIST_ALBUMS_URL = "https://api.spotify.com/v1/artists/{id}/albums";
const ALBUM_URL = "https://api.spotify.com/v1/albums/{id}"
const RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played";
const CURRENTLY_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const PLAYER_INFO_URL = "https://api.spotify.com/v1/me/player";
const PLAY_URL = "https://api.spotify.com/v1/me/player/play?device_id={id}";
const PAUSE_URL = "https://api.spotify.com/v1/me/player/pause?device_id={id}"
const NEXT_URL = "https://api.spotify.com/v1/me/player/next?device_id={id}";
const PREVIOUS_URL = "https://api.spotify.com/v1/me/player/previous?device_id={id}";
const USER_TOP_TRACKS = "https://api.spotify.com/v1/me/top/tracks?time_range={time_frame}";
const USER_TOP_ARTISTS = "https://api.spotify.com/v1/me/top/artists?time_range={time_frame}";

export const LAST4WEEKS = "short_term";
export const LAST6MONTHS = 'medium_term';
export const ALLTIME = 'long_term';



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

export const GetPlayerInfo = async (access_token) => {
  let endpoint = PLAYER_INFO_URL;

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};


export const PlayerPlayWithContext = async (access_token, device_id, context_uri, offset) => {
  let endpoint = PLAY_URL.replace("{id}", device_id);
  return axios
    .put(endpoint, {context_uri, offset}, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const PlayerPlayWithURIS = async (access_token, device_id, uris) => {
  let endpoint = PLAY_URL.replace("{id}", device_id);
  return axios
    .put(endpoint, {uris}, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
}

export const PlayerResume = async (access_token, device_id) => {

  let endpoint = PLAY_URL.replace("{id}", device_id);
  return axios
    .put(endpoint, '', { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });

};

export const PlayerPause = async (access_token, device_id) => {
  let endpoint = PAUSE_URL.replace("{id}", device_id);

  return axios
    .put(endpoint, '', { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const PlayerNext = async (access_token, device_id) => {
  let endpoint = NEXT_URL.replace("{id}", device_id);

  return axios
    .post(endpoint, '', { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const PlayerPrevious = async (access_token, device_id) => {
  let endpoint = PREVIOUS_URL.replace("{id}", device_id);

  return axios
    .post(endpoint, '', { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetUserTopTracks = async (access_token, time_frame) => {
  let endpoint = USER_TOP_TRACKS.replace('{time_frame}', time_frame);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const GetUserTopArtists = async (access_token, time_frame) => {
  let endpoint = USER_TOP_ARTISTS.replace('{time_frame}', time_frame);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};



