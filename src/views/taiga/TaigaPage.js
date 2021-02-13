import React from 'react';
import DashPage from 'src/components/DashPage';

import TaigaLogin from './TaigaLogin';
//import Commits from './Commits';
//import NoRepositoryFound from './NoRepositoryFound';
import UserStats from './UserStats'
import { connect } from "react-redux";
import { taigaActions } from 'src/redux/actions/taiga-actions'

function TaigaPage(props) {

    let content;

    if (!props.taigaToken)
        content = <TaigaLogin/>
    // gestire else
    else if (props.taigaId)
        content = <UserStats/>

    return (
        <DashPage>
            {content}
        </DashPage>
    );
}

function mapStateToProps(state){
    return {
        taigaToken: state.taigaToken,
        taigaId: state.taigaId
    }
}

const actions = {
    // Aggiungere azioni
}

export default connect(mapStateToProps, actions)(TaigaPage);
