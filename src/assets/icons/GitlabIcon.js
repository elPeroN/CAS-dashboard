import React from 'react';
import { InlineIcon } from '@iconify/react';
import gitlabIcon from '@iconify-icons/mdi/gitlab';

export default function GitlabIcon(props){
  let width;
  if(props.width) width=props.width;
  else width = "24px"
  return(
    <InlineIcon icon={gitlabIcon} width={width}/>
  )
}
