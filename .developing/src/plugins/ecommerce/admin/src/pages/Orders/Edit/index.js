import React, { useState } from 'react';
import { Option, Select } from '@strapi/design-system/Select';

const Edit = ({ data, onStatusChange }) => {
  const [ action, setAction] = useState();
  return (
    <Select
      placeholder={'Status'}
      value={ action }
      onChange={ (value) => onStatusChange(data.id, value) }
      onClear={ () => setAction(null) }
    >
      { ['PENDING', 'DELIVERED', 'PROCESSING'].map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
    </Select>
  );
}

export default Edit;
