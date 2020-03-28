import React from 'react'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';


import { Grid, makeStyles } from '@material-ui/core';
import { pink, grey } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({ 
  play: {
    width: theme.spacing(13),
    height: theme.spacing(13),
    marginBottom: '12px'
  },
  next: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginBottom: '12px'
  },
  controls: {
    color: grey[50],
    position: 'relative',
    left: theme.spacing(110),
    top: theme.spacing(30),
    width: theme.spacing(7),
  }

}));

const Controls = () => {
  const classes = useStyles();

  return (
    <Grid
    className={classes.controls}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <SkipNextIcon className={classes.next} />
      <SkipPreviousIcon className={classes.next} />
      { false ? <PlayCircleOutlineIcon className={classes.play} /> :<PauseCircleOutlineIcon className={classes.play}/>}
    </Grid>
  )
}



export default Controls;