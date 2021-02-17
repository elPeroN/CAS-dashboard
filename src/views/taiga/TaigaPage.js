import React from 'react';
import DashPage from 'src/components/DashPage';

import TaigaLogin from './TaigaLogin';
import TaigaDash from './TaigaDash'
//import Commits from './Commits';
//import NoRepositoryFound from './NoRepositoryFound';
import UserStats from './UserStats'
import { connect } from "react-redux";
import { taigaActions } from 'src/redux/actions/Taiga/actions'

function TaigaPage(props) {

    let content;

    if (!props.taigaToken)
        content = <TaigaLogin/>
    else
        content = <TaigaDash/>

    return (
        <DashPage>
            {content}
        </DashPage>
    );
}

function mapStateToProps(state){
    return {
        taigaToken: state.taiga.taigaToken,
        taigaId: state.taiga.taigaId
    }
}

const actions = {
    // Aggiungere azioni
}

export default connect(mapStateToProps, actions)(TaigaPage);
