import React from 'react';
import DashPage from 'src/components/DashPage';

import TaigaLogin from './TaigaLogin';
import TaigaDash from './TaigaDash';
import { connect } from "react-redux";

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
