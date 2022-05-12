import React, { useEffect, useState } from 'react'

//Components
import AlbumPaper from "./albumPaper";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

//styles
const styles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gridGap: '2em'
    }
});

export default function AlbumGrid(props) {

    const classes = styles();

    const [filteredAlbums, setFilteredAlbums] = useState();

    useEffect(() => {
        var flags = {};
        var newAlbums = props.albums.filter(function(album) {
            if (flags[album.name]) {
                return false;
            }
            flags[album.name] = true;
            return true;
        });

        setFilteredAlbums(newAlbums);
    }, [])



    // const filteredAlbums = [...new Set(props.albums.map(item => {return { name: item.name, date: item.release_date }}))];
    // console.log(filteredAlbums);

    return (
        <Box className={classes.grid}>
            {filteredAlbums && 
                filteredAlbums.map((item, i) => (
                    <AlbumPaper album={item} key={i}/>
                ))
            }
        </Box>
    )
}
