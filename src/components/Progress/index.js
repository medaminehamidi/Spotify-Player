import React from 'react'
import { makeStyles, LinearProgress } from '@material-ui/core'
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#71829e',
    position: 'relative',
    left: theme.spacing(75),
    top: theme.spacing(56),
  },
  singer: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  song: {
    fontSize: '18px',
    marginBottom: '9px'
  },
  length: {
    display: 'flex',
    position: 'relative',
    left: '250px',
    opacity: '0.5',
    marginBottom: '9px'
  },
  progress: {

  },
  bar: {
    width: theme.spacing(40),
    height: theme.spacing(1),
    borderRadius: '15px',
  }

}))

const Progress = () => {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <Typography className={classes.singer} >
        {'Namesinger'}
      </Typography  >
      <Typography className={classes.song} >
        {'Namesong'}
      </Typography >
      <Typography className={classes.length} >
        {'songlenth'}
      </Typography>
      <LinearProgress className={classes.bar} variant="determinate" value={50} />
      <Typography className={classes.progress} >
        {'songprogress'}
      </Typography>
    </div>
  )
}

export default Progress