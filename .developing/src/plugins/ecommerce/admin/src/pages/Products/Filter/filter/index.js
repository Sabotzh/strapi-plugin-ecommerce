export default (unSortedData, updateData, category, price) => {

  if (!category && !price) return updateData(unSortedData)

  let filterData = unSortedData
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

  if (price === 'Low to High') {
    filterData = filterData.sort((a, b) => a.price - b.price)
  }
  if (price === 'High to Low') {
    filterData = filterData.sort((a, b) => b.price - a.price)
  }

  updateData(filterData)
}