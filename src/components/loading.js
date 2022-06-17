import React from 'react'

//MUI
import Skeleton  from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

import ContentContainer from './contentcontainer'

export default function Loading() {
  return (
      <ContentContainer bg={''} height={'100%'}>
          <Box padding={'50px'} height={'100%'}>
            <Skeleton variant="rect" animation={'wave'} width={'100%'} height={'40%'}/><br/><br/><br/>
            <Skeleton variant="rect" animation={'wave'} width={'100%'} height={'10%'}/><br/>
            <Skeleton variant="rect" animation={'wave'} width={'100%'} height={'10%'}/><br/>
            <Skeleton variant="rect" animation={'wave'} width={'100%'} height={'10%'}/><br/>
          </Box>
      </ContentContainer>
  )
}
