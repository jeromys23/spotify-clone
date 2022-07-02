import { gql } from '@apollo/client';

/**
 * Fetches user's playlists
 */
export const GetUserPlaylists = gql`
    query NavQuery {
        UserPlaylists {
            items {
                id
                name
                images {
                    url
                    height
                    width
                }
                owner {
                    display_name
                }
            }
        }
    }
`;
