import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import {
  DataUsage as CircleIcon,
  ArrowForwardIos as ArrowForwardIosIcon
} from "@material-ui/icons";
import SelectedMenu from 'src/components/SelectedMenu';
import { fetchUserStats } from "src/services/taiga"
import { connect } from 'react-redux';
import { colorsForGraphs } from 'src/theme/colors';

import { taigaCreator } from "src/redux/actions/Taiga/creator";
import { taigaActions } from "src/redux/actions/Taiga/actions";

function UserDetail(props) {


}

function mapStateToProps(state){
  return {
    taigaToken: state.taigaToken,
    taigaId: state.taigaId,
  };
};

const actions = {
    getUserId: taigaCreator.getUserId,
    getUserStats: taigaCreator.getUserStats,
    getUserProjects: taigaCreator.getUserProjects
}

export default connect(mapStateToProps,actions)(UserDetail);
