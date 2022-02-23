import convert from 'xml-js';
import opencartFormatToOurFormat from "./opencartFormatToOurFormat";

export default async(file) => {
  const getArrayElements = (elements) => {
    return elements.map(element => element.elements[0].text)
  }

  const xml = await fetch(file.url)
    .then(res => {
      return res.text()
    })
  const products = JSON.parse(convert.xml2json(xml, { compact: false, spaces: 2 }))
  const productsData = []
  products.elements[0].elements.forEach((product => {
    let productData = {}
    product.elements.forEach(attribute => {
      const allowedKeys = Object.keys(opencartFormatToOurFormat)
      if (!attribute.name) return
      if (allowedKeys.includes(attribute.name.toLowerCase())) {
        const keyDataObj = opencartFormatToOurFormat[attribute.name.toLowerCase()]
        if (!attribute.elements) return productData = { ...productData, [keyDataObj]: undefined }
        if (attribute.elements.length > 1) {
          return productData = {...productData, [keyDataObj]: getArrayElements(attribute.elements)}
        }
        productData = { ...productData, [keyDataObj]: attribute.elements[0][attribute.elements[0].type] }
      }
    })
    productsData.push(productData)
  }))
  console.dir(productsData)
  return productsData
}