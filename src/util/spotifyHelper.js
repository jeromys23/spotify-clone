import axios from "axios";

//Endpoints
const PLAYLIST_URL = "https://api.spotify.com/v1/playlists/{id}";

export const GetPlaylist = async (access_token, id) => {
  let endpoint = PLAYLIST_URL.replace("{id}", id);

  return axios
    .get(endpoint, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};
