import { gql } from '@apollo/client';

/**
 * Grabs user's most listened to content over 3 time frames
 * Fires when home.js is loaded
 */
export const GetUserTopMedia = gql`
    query HomeQuery(
        $timeRangeShort: String
        $timeRangeMedium: String
        $timeRangeLong: String
    ) {
        ShortTermTracks: UserTopTracks(time_range: $timeRangeShort) {
            items {
                album {
                    images {
                        url
                        height
                        width
                    }
                    id
                    name
                }
                artists {
                    id
                    name
                }
                id
                name
                uri
                duration_ms
            }
        }
        ShortTermArtists: UserTopArtists(time_range: $timeRangeShort) {
            items {
                name
                id
                images {
                    url
                    height
                    width
                }
                uri
                type
            }
        }
        MediumTermTracks: UserTopTracks(time_range: $timeRangeMedium) {
            items {
                album {
                    images {
                        url
                        height
                        width
                    }
                    id
                    name
                }
                artists {
                    id
                    name
                }
                id
                name
                uri
                duration_ms
            }
        }
        MediumTermArtists: UserTopArtists(time_range: $timeRangeMedium) {
            items {
                name
                id
                images {
                    url
                    height
                    width
                }
                uri
                type
            }
        }
        LongTermTracks: UserTopTracks(time_range: $timeRangeLong) {
            items {
                album {
                    images {
                        url
                        height
                        width
                    }
                    id
                    name
                }
                artists {
                    id
                    name
                }
                id
                name
                uri
                duration_ms
            }
        }
        LongTermArtists: UserTopArtists(time_range: $timeRangeLong) {
            items {
                name
                id
                images {
                    url
                    height
                    width
                }
                uri
                type
            }
        }
    }
`;
