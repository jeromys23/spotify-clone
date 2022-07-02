import React from 'react';

//Components
import ItemPaper from './itemPaper';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

//styles
const styles = makeStyles({
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gridGap: '2em',
    },
});

/**
 * Grid for artists, albums, contains itemPaper.js components
 * @param {} props
 * @returns
 */
export default function ItemGrid(props) {
    const classes = styles();

    return (
        <Box className={classes.grid}>
            {props.items &&
                props.items.map((item, i) => (
                    <ItemPaper
                        url={
                            item.type == 'artist'
                                ? `/artist/${item.id}`
                                : `/album/${item.id}`
                        }
                        uri={item.uri}
                        title={item.name}
                        image={item.images[1].url}
                        metadata={
                            props.metadata &&
                            props.metadata == 'year' &&
                            new Date(item.release_date).toLocaleDateString(
                                'en-US',
                                { year: 'numeric' }
                            )
                        }
                        key={i}
                    />
                ))}
        </Box>
    );
}

//
