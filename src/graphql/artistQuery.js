import { gql } from '@apollo/client';

/**
 * Grabs information about a specific artist
 * Fires on artist.js load
 */
export const GetArtistInfo = gql`
    query ArtistQuery($artistId: String) {
        Artist(id: $artistId) {
            id
            images {
                url
                height
                width
            }
            name
            followers {
                total
            }
            uri
        }
        ArtistTopSongs(id: $artistId) {
            tracks {
                album {
                    name
                    id
                    images {
                        url
                        height
                        width
                    }
                    uri
                }
                uri
                name
                id
                duration_ms
                artists {
                    name
                    id
                }
            }
        }
        ArtistAlbums(id: $artistId) {
            total
            items {
                id
                name
                images {
                    url
                    height
                    width
                }
            }
        }
    }
`;
