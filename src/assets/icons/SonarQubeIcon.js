import React from 'react';
import { InlineIcon } from '@iconify/react';
import sonarqubeIcon from '@iconify-icons/simple-icons/sonarqube';

export default function SonarQubeIcon(props){
    let width;
    if (props.width)
        width=props.width
    else
        width="24px"
    return(<InlineIcon icon={sonarqubeIcon} width={width}/>)
}
