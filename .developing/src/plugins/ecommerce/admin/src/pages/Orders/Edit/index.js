import {Option, Select} from "@strapi/design-system/Select";
import React, {useState} from "react";

const Edit = ({ rowData, updateRowData }) => {
  const [ action, setAction] = useState()
  return (
    <Select
      placeholder={'Status'}
      value={ action }
      onChange={ (value) => updateRowData({ ...rowData, status: value }, rowData.id) }
      onClear={ () => setAction(null) }
    >
      { ['pending', 'delivered', 'processing'].map((entry, id) => <Option value={entry} key={id}>{ entry }</Option>) }
    </Select>
  )
}

export default Edit