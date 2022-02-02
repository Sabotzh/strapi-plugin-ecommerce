import React, { useState } from 'react';
import styled from 'styled-components';

import { Alert } from '@strapi/design-system/Alert';

const AlertStyled = styled(Alert)`
  position: absolute;
  top: 40px;
  left: 56px;
  min-width: 35%;
`

const CustomAlert = ({ closeAlert, title, variant, text, timerId }) => {
  return (
    <AlertStyled closeLabel="Close alert" onClose={closeAlert} title={title} variant={variant}>
      { text }
    </AlertStyled>
  )
}

export default CustomAlert;
