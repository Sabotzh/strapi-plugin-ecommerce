import React, { useState } from 'react';

import { GridItem } from '@strapi/design-system/Grid';

import Select from "../../../components/Select";
import filter from "./filter"

const Filter = ({ filterValues, data, unSortedData, updateData }) => {
  const [ category, setCategory ] = useState('');
  const [ price, setPrice ] = useState('');

  return (
    <>
      <GridItem col={3}>
        <Select
          placeholder={ 'Sort by category' }
          value={ category }
          values={ filterValues[0] }
          onChange={ (value) => {
            setCategory(value)
            filter(data, unSortedData, updateData, value, price)
          } }
          onClear={ () => {
            setCategory(null)
            filter(data, unSortedData, updateData, null, price)
          } }
        />
      </GridItem>
      <GridItem col={2}>
        <Select
          placeholder={ 'Sort by price' }
          value={ price }
          values={ filterValues[1] }
          onChange={ (value) => {
            setPrice(value)
            filter(data, unSortedData, updateData, category, value)
          } }
          onClear={ () => {
            setPrice(null)
            filter(data, unSortedData, updateData, category, null)
          } }
        />
      </GridItem>
    </>
  )
}
//[{ id: 1, name: 'Low to High' }, { id: 2, name: 'High to Low' }]
export default Filter