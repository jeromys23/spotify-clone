import { gql } from '@apollo/client';

/**
 * Fetches a specific playlist
 */
export const GetPlaylistInfo = gql`
    query PlaylistQuery($playlistId: String) {
        Playlist(id: $playlistId) {
            id
            images {
                url
                height
                width
            }
            followers {
                total
            }
            tracks {
                items {
                    track {
                        artists {
                            name
                            id
                        }
                        name
                        uri
                        duration_ms
                        id
                        album {
                            name
                            id
                            images {
                                url
                                height
                                width
                            }
                        }
                    }
                }
            }
            owner {
                display_name
            }
            name
            uri
            id
        }
    }
`;
