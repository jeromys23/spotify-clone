import { gql } from '@apollo/client';

export const GetCurrentlyPlaying = gql`
    query PlayerPlayingQuery {
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
    }
`;

export const GetTrackData = gql`
    query TrackQuery($id: String) {
        TrackData(id: $id) {
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
`;
