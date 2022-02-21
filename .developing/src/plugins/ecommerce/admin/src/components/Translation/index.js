import React from 'react';
import { useIntl } from 'react-intl';
import getTrad from "../../utils/getTrad";

const Translation = ({ id, defaultMessage }) => {
  const { formatMessage } = useIntl();
  return (
    formatMessage({
      id: getTrad(id),
      defaultMessage
    })
  )
}

export default Translation