import { makeStyles } from '@material-ui/core/styles';

const useGlobalStyles = makeStyles((theme) => ({
    homeContainer: {
        background: 'rgba(0, 0, 0, 0.25)',
        flex: 1,
    },
    topic: {
        fontSize: '25px',
        fontWeight: 'bold',
        margin: '35px 0',
    },
    playlistContainer: {
        background: 'rgba(0, 0, 0, 0.25)',
        flex: 1,
        padding: '30px',
        [theme.breakpoints.down('xs')]: {
            padding: '10px',
        },
    },
    artistLink: {
        textDecoration: 'none',
        color: '#fff',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    playButtonContainer: {
        height: '50px',
        marginBottom: '20px',
        marginTop: '35px',
        marginLeft: '20px',
        [theme.breakpoints.down('xs')]: {
            height: '60px',
        },
    },
}));

export { useGlobalStyles };
