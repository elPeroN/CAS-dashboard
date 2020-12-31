import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Card,
  CardHeader,
  Divider,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const data = [
  {
    id: uuid(),
    name: 'Atom',
    imageUrl: '/static/images/plugins/atom.png',
    repository: 'https://github.com/elPeroN/atom-logger'
  },
  {
    id: uuid(),
    name: 'IntelliJ Idea',
    imageUrl: '/static/images/plugins/idea.png',
    repository: 'https://gitlab.com/fulvio1993/logger-intellij'
  },
  {
    id: uuid(),
    name: 'Eclipse',
    imageUrl: '/static/images/plugins/eclipse.png',
    repository: 'https://gitlab.com/Siber93/cas-eclipse-plugin'
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

function Plugins(props){
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <Card >
      <CardHeader
        title="Available Logger Plugins"
      />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={product.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
            />
            <Tooltip title='Go to repository'>
              <IconButton
                edge="end"
                size="small"
                onClick={() => window.location = product.repository}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Card>
  );
};

Plugins.propTypes = {
  className: PropTypes.string
};

export default Plugins;
