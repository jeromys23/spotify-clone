import { gql } from '@apollo/client';

/**
 * Fetches user's library of liked songs
 */
export const GetUserLikedSongs = gql`
    query LikedSongsQuery {
        UserLikedSongs {
            items {
                track {
                    album {
                        id
                        name
                        images {
                            url
                            height
                            width
                        }
                        uri
                    }
                    name
                    id
                    uri
                    duration_ms
                    artists {
                        id
                        name
                    }
                }
            }
        }
    }
`;
