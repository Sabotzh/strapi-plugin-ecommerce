module.exports = (data) => {
  return {
    required: {
      name: data.name,
      slug: data.slug,
      shortDescription: data.shortDescription,
      description: data.description,
      metaTitle: data.metaTitle,
      metaKeywords: data.metaKeywords,
      metaDescription: data.metaDescription,
      sku: data.sku,
      price: data.price,
    },
    numbers: {
      price: data.price,
      discount: data.discount,
      quantity: data.quantity,
      minQuantity: data.minQuantity
    },
  }
}