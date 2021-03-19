import React from 'react';
import DashPage from 'src/components/DashPage';

import SonarLogin from './SonarLogin';
import SonarDash from './SonarDash'

import { connect } from "react-redux";

function SonarPage(props) {
    let content;

    if (!props.token)
        content = <SonarLogin/>
    else
        content = <SonarDash/>

    return (
        <DashPage>
            {content}
        </DashPage>
    );
}

function mapStateToProps(state){
    return {
        token: state.sonar.sonarToken
    }
}


export default connect(mapStateToProps)(SonarPage);
