//React
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages
import Home from './home.js';
import Playlist from './playlist.js';
import Artist from './artist.js';
import Album from './album.js';
import LikedSongs from './likedsongs';
import Playlists from './playlists.js';

//Components
import Navbar from '../components/navbar.js';
import Player from '../components/player.js';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setURI } from '../redux/spotifySlice.js';
import { setUserAuth } from '../redux/userSlice.js';

import { useQuery } from '@apollo/client/react';
import { GetUserRecents } from '../graphql/defaultQuery.js';
import Loading from '../components/loading.js';

import { GetRefreshToken } from '../util/spotifyHelper.js';

export default function Dashboard() {
    const dispatch = useDispatch();
    const user_context = useSelector((state) => state.user);
    const [intervalId, setIntervalId] = useState();

    useEffect(() => {
        //Silent refresh for auth token
        if (user_context.refresh_token) {
            const interval = user_context.expires_in * 1000 - 5000;

            if (!intervalId) {
                var id = setInterval(() => {
                    RefreshToken(user_context.refresh_token);
                }, interval);
                setIntervalId(id);
            }
        }
    }, []);

    const { loading, error, data } = useQuery(GetUserRecents, {
        fetchPolicy: 'network-only',
    });

    if (loading) return <Loading />;
    if (error) return error.message;

    //If nothing is currenlty playing set the last played song
    if (data && data.CurrentlyPlaying.item !== null) {
        dispatch(setCurrentSong(data.CurrentlyPlaying.item));
        dispatch(setURI(data.CurrentlyPlaying.item.uri));
    } else {
        if (data && data.RecentlyPlayed !== null) {
            dispatch(setCurrentSong(data.RecentlyPlayed.items[0].track));
            dispatch(setURI(data.RecentlyPlayed.items[0].track.uri));
        }
    }

    const RefreshToken = (token) => {
        GetRefreshToken(token).then((res) => {
            dispatch(setUserAuth(res));
        });
    };

    return (
        <div>
            <Router>
                <Navbar />
                <Player />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/playlist/:slug' component={Playlist} />
                    <Route path='/artist/:slug' component={Artist} />
                    <Route path='/album/:slug' component={Album} />
                    <Route path='/likedsongs' component={LikedSongs} />
                    <Route path='/playlists' component={Playlists} />
                </Switch>
            </Router>
        </div>
    );
}
