import React from 'react'
// npm install --save-dev @iconify/react @iconify-icons/logos
import { InlineIcon } from '@iconify/react';
import taigaIcon from '@iconify-icons/logos/taiga';


export default function TaigaIcon(props){
	let width
	if(props.width)
		width = props.width
	else
		width = "24px"
	return(
		<InlineIcon icon={taigaIcon} width={width}/>
	)
}
