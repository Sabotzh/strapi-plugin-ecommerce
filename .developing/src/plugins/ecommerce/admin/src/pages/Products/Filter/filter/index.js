export default (data, unSortedData, updateData, category, price) => {
  //const copyTableData = JSON.parse(JSON.stringify(data));

  if (!category && !price) return updateData(unSortedData)

  let filterData = data
  if (!category) filterData = unSortedData

  if (category) {
    filterData = filterData.filter((el => {
      let categoryInElement = false
      el.categories.forEach(el => {
        if (el.name === category) categoryInElement = true
      })
      return categoryInElement
    }))
  }

  if (filterData === 'Low to High') {
    filterData = filterData.sort((a, b) => a.price - b.price)
  }
  if (filterData === 'High to Low') {
    filterData = filterData.sort((a, b) => b.price - a.price)
  }

  updateData(filterData)
}