import React from 'react'
import { InlineIcon } from '@iconify/react';
import jenkinsIcon from '@iconify-icons/cib/jenkins';


export default function JenkinsIcon(props){
	let width
	if(props.width)
		width = props.width
	else
		width = "24px"
	return(
		<InlineIcon icon={jenkinsIcon} width={width}/>
	)
}
