import React from 'react';
import DashPage from 'src/components/DashPage';

import TaigaLogin from './TaigaLogin';
import TaigaDash from './TaigaDash'
import UserStats from './UserStats'
import { connect } from "react-redux";
import { taigaActions } from 'src/redux/actions/Taiga/actions'

function TaigaPage(props) {

    let content;

    if (!props.token)
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
        token: state.taiga.token,
        id: state.taiga.id
    }
}


export default connect(mapStateToProps)(TaigaPage);
