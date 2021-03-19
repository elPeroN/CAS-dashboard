import React from 'react';
import { InlineIcon } from '@iconify/react';
import bxBug from '@iconify-icons/bx/bx-bug';

export default function BugzillaIcon(props){
  let width;
  if(props.width) width=props.width;
  else width = "24px"
  return(
    <InlineIcon icon={bxBug} width={width}/>
  )
}
