const authEndpoint = "https://accounts.spotify.com/authorize";
export const redirect_uri = "http://localhost:3000/";
export const client_id = "08bc0a4718424de49cf7175abb26b7d5";
export const client_secret = "3ed8fa77ec9141fbbe5c4513cc978235";

const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-recently-played",
  "app-remote-control",
];

export const loginUrl = `${authEndpoint}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes.join(
  "%20"
)}`;

//Spotify URLs
export const BROWSE_URL = "https://api.spotify.com/v1/browse/categories";
export const TOKEN_URL = "https://accounts.spotify.com/api/token";

