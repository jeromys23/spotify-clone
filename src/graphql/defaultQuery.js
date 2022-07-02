import { gql } from '@apollo/client';

/**
 * This is ran when the application starts to initialize data
 * Grabs both currently playing and recently played user tracks
 */
export const GetUserRecents = gql`
    query DefaultQuery {
        CurrentlyPlaying {
            item {
                album {
                    images {
                        url
                        height
                        width
                    }
                    id
                }
                artists {
                    id
                    name
                }
                name
                duration_ms
                uri
                id
            }
        }
        RecentlyPlayed {
            items {
                track {
                    album {
                        images {
                            url
                            height
                            width
                        }
                        id
                    }
                    artists {
                        id
                        name
                    }
                    name
                    duration_ms
                    uri
                    id
                }
            }
        }
    }
`;
