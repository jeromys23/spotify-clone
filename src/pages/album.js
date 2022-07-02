import React from 'react';

//To get id from url
import { useParams } from 'react-router-dom';

//Graphql
import { useQuery } from '@apollo/client';
import { GetAlbumInfo } from '../graphql/albumQuery';

//MUI
import Box from '@material-ui/core/Box';

//components
import GeneralPageLayout from '../components/generalpagelayout';
import Playbutton from '../components/playbutton';
import Tracklist from '../components/tracklist';
import { Link } from 'react-router-dom';
import ContentContainer from '../components/contentcontainer';
import Loading from '../components/loading';

//styles
import { useGlobalStyles } from '../Styles';

export default function Album() {
    const classes = useGlobalStyles();

    let { slug } = useParams();

    //Get album info from id in url
    const { loading, error, data } = useQuery(GetAlbumInfo, {
        variables: {
            albumId: slug,
        },
    });

    if (loading) return <Loading />;
    if (error) return error.message;

    //Parse data for image and name
    function GetPageLayoutData(album) {
        let image =
            album.images.length >= 2
                ? album.images[1].url
                : album.images[album.images.length - 1].url;

        return {
            image,
            name: album.name,
        };
    }

    return (
        <Box>
            <ContentContainer
                image={
                    data.Album.images.length >= 2
                        ? data.Album.images[1].url
                        : data.Album.images[data.Album.images.length - 1].url
                }
            >
                <GeneralPageLayout
                    data={GetPageLayoutData(data.Album)}
                    type={'Album'}
                >
                    <Box display={'flex'}>
                        {data.Album.artists.map((artist, index, artists) => (
                            <React.Fragment>
                                <Link
                                    className={classes.artistLink}
                                    to={`/artist/${artist.id}`}
                                >
                                    {artist.name}
                                </Link>
                                {index === artists.length - 1 ? (
                                    ''
                                ) : (
                                    <span>,&nbsp;</span>
                                )}
                            </React.Fragment>
                        ))}
                        &nbsp;&#8226;&nbsp;
                        {new Date(data.Album.release_date).toLocaleDateString(
                            'en-US',
                            { year: 'numeric' }
                        )}
                    </Box>
                </GeneralPageLayout>

                <Box className={classes.playlistContainer} padding={'30px'}>
                    <Box className={classes.playButtonContainer}>
                        <Playbutton
                            tracks={data.Album.tracks.items}
                            uri={data.Album.uri}
                        />
                    </Box>
                    <Box className={classes.topic}>Tracks</Box>
                    <Tracklist
                        tracks={data.Album.tracks.items}
                        showDateAdded={false}
                        isAlbum={true}
                    />
                </Box>
            </ContentContainer>
        </Box>
    );
}
