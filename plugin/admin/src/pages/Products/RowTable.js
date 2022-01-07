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
        />
      }
      <Td>
        <Typography textColor="neutral800">{ rowData.sku }</Typography>
      </Td>
      <Td>
        <Avatar src = { rowData.icon } alt={''} />
      </Td>
      <Td>
        <Typography textColor="neutral800">{ rowData.productName }</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">{ rowData.category }</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">{ rowData.price }</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">{ rowData.stock }</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">{ rowData.status }</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">{ rowData.discount }</Typography>
      </Td>
      <Td>
        <Switch label="Published" selected={ issued } onChange={() => {
          setIssued(!issued)
          props.updateRowData({...rowData, published: !issued}, rowData.sku)
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
              onClick={ () => props.deleteRow(rowData.sku) }
            />
          </Box>
        </Flex>
      </Td>
    </>
  )
}
export default RowTable