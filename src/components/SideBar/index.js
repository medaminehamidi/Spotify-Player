import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Button, List, ListItem, TextField, Divider, ListItemText, ListItemIcon } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const SideBar = () => {
  const classes = useStyles();

  const [left, setLeft] = React.useState(false)

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setLeft(open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}> <ArrowForwardIosIcon /> </Button>
      <Drawer anchor={'left'} open={left} onClose={toggleDrawer(false)}>
        <List className={classes.fullList} >
          <ListItem>
            <TextField/><Button>Click</Button>
          </ListItem>
        </List>
        <Divider />
        <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem onClick={() => console.log( `${text} : clicked`)} button key={text}>
            <ListItemIcon>LOL</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        </List>
      </Drawer>
    </div>
  )

}

export default SideBar