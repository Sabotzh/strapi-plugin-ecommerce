import React from 'react'
import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";

import { useState } from 'react'

import {Td} from "@strapi/design-system/Table";
import {Typography} from "@strapi/design-system/Typography";
import {Avatar} from "@strapi/design-system/Avatar";
import {Switch} from "@strapi/design-system/Switch";
import {Flex} from "@strapi/design-system/Flex";
import {IconButton} from "@strapi/design-system/IconButton";
import {Box} from "@strapi/design-system/Box";
import Edit from "./Edit";


const RowTable = (props) => {
  const rowData = props.rowData
  const [ issued, setIssued ] = useState(rowData.published)
  const [ isVisible, setIsVisible ] = useState(false)

  return (
    <>
      { isVisible &&
        <Edit
          closeHandler = { () => setIsVisible(false) }
          rowData = { rowData }
          updateRowData = { (dataRow, idRow) => props.updateRowData(dataRow, idRow) }
        />
      }
      <Td><Typography textColor="neutral800">{ rowData.id }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.name }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.parent_category ? rowData.parent_category.name : null }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.type }</Typography></Td>
      <Td><Typography textColor="neutral800">{ rowData.slug }</Typography></Td>
      <Td>
        <Switch label="Published" selected={ true } onChange={() => {
          setIssued(!issued)
          props.updateRowData({...rowData, published: !issued}, rowData.id)
        }} />
      </Td>
      <Td>
        <Flex>
          <IconButton onClick={ () => setIsVisible(true) } label="Edit" noBorder icon = { <Pencil /> }/>
          <Box paddingLeft={1}>
            <IconButton
              label="Delete"
              noBorder
              icon={ <Trash/> }
              onClick={ () => props.deleteRow(rowData.id) }
            />
          </Box>
        </Flex>
      </Td>
    </>
  )
}
export default RowTable