import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Paper from '@material-ui/core/Paper';
import { textAlign } from '@material-ui/system';
import { Center } from 'devextreme-react/map';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailsIcon from '@material-ui/icons/Details';
import Tooltip from '@material-ui/core/Tooltip';
import { HoverStyle } from 'devextreme-react/range-selector';
import 'typeface-roboto';




const useStyles = makeStyles(theme => ({
    container: {
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },

    itemText: {
        // fontSize:50
        borderBottom: '1px solid rgb(0,0,0,0.25)',
        textAlign: 'center',
        transition: '0.5s',
        "&:hover": {
            backgroundColor:'#fff'
        }
    },
    title: {
        paddingBottom: '30px',
        fontFamily:'Roboto'
    }
}))


export default function Scales(props) {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <div className={classes.container}>
            {/* <h1>Twoje Wagi</h1> */}


            {/* <Grid item xs={6} md={6}> */}
            <Typography variant="h4" className={classes.title} >
                Twoje wagi
            </Typography>
            <div className={classes.demo}>
                <List >
                    {props.scales.map(elem =>

                        <ListItem key={elem.address} className={classes.itemText}>
                            <Tooltip title={elem.address}>
                                <Avatar>
                                    <InboxIcon />
                                </Avatar>

                            </Tooltip>
                            {/* <ListItemText
                                    primary={elem.address}
                                    secondary={secondary ? 'Secondary text' : null}
                                /> */}
                            <Typography variant="h6" style={{paddingLeft:20}}>
                                {elem.name}
                            </Typography>
                            {/* <h2 style={{ marginLeft: '10%' }}></h2> */}
                            <ListItemSecondaryAction>
                                <Tooltip title="Usuń">
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>

                                </Tooltip>
                                <Tooltip title="Szczegóły">
                                    <IconButton edge="end" aria-label="delete">
                                        <DetailsIcon />
                                    </IconButton>

                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                    {/* {generate(
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={props.address}
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>,
                            props.scales
                        )} */}
                </List>
            </div>
            {/* </Grid> */}

        </div>

    )

}