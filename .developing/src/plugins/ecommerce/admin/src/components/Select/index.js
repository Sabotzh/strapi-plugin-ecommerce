import React from 'react'
import { Select, Option } from '@strapi/design-system/Select';

const CustomSelect = ({ values, value, onChange, onClear, placeholder }) => {

  return (
    <Select
      placeholder={placeholder}
      value={ value }
      onChange={ onChange }
      onClear={ onClear }
    >
      { values.map((entry) => <Option value={entry.name} key={entry.id}>{ entry.name }</Option>) }
    </Select>
  )
}

export default CustomSelect