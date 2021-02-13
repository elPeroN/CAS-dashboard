import React from 'react';
import { InlineIcon } from '@iconify/react';
import mattermostIcon from '@iconify-icons/simple-icons/mattermost';

export default function GitlabIcon(props){
  let width;
  if(props.width) width=props.width;
  else width = "24px"
  return(
    <InlineIcon icon={mattermostIcon} width={width}/>
  )
}
