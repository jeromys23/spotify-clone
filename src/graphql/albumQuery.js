import { gql } from '@apollo/client';

export const GetAlbumInfo = gql`
    query AlbumQuery($albumId: String) {
        Album(id: $albumId) {
            id
            images {
                url
                height
                width
            }
            name
            uri
            release_date
            artists {
                name
                id
            }
            tracks {
                items {
                    name
                    artists {
                        name
                        id
                    }
                    duration_ms
                    id
                    uri
                    id
                }
            }
        }
    }
`;
