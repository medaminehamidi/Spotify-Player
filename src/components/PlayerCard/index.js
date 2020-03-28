import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import Controls from '../Controls'
import Progress from '../Progress'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    width: theme.spacing(46),
    height: theme.spacing(60),
    backgroundColor: grey[300],
    position: 'absolute',
    left: theme.spacing(80),
    top: theme.spacing(25),
    borderRadius: '15px'
  },
  cover: {
    display: 'flex',
    flexWrap: 'wrap',
    width: theme.spacing(30),
    height: theme.spacing(30),
    backgroundColor: red[800],
    position: 'absolute',
    left: theme.spacing(70),
    top: theme.spacing(30),
    borderRadius: '15px',
    boxShadow: '0px 10px 40px 0px rgba(128, 0, 0, 0.5)',
    overflow:'hidden'
  }
}));


const PlayerCard = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.main} elevation={0} />
      <Paper className={classes.cover} elevation={3} ><img src='https://www.w3schools.com/html/img_girl.jpg'/></Paper>
        <Controls />
        <Progress />
    </div>
  )
}







export default PlayerCard;
