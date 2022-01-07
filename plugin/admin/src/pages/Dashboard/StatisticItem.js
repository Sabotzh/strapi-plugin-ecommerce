import { Box } from '@strapi/design-system/Box';
import React from 'react';

const StatisticItem = (props) => {
  return (
    <Box padding={ props.padding } background={ props.background } shadow={ props.shadow } hasRadius>
      { props.children }
    </Box>
  )
}


export default StatisticItem