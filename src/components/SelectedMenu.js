import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List ,
  ListItem,
  ListItemText,
  MenuItem,
  Menu} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));


//Questo componente ha bisogno di props{un index, una funzione che setta l'index, una lista}
export default function SimpleListMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  let selectedIndex = props.index;

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    props.setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Gitlab Repositories">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="menu"
          aria-label="select-repository"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Repository" secondary={props.list[selectedIndex]} />
          <ExpandMore />
        </ListItem>
      </List>
      <Menu
        id="repository-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.list.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
