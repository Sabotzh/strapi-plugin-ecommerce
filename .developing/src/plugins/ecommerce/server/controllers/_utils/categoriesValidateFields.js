module.exports = (data) => {
  return {
    name: data.name,
    slug: data.slug,
    shortDescription: data.shortDescription,
    description: data.description,
    metaTitle: data.metaTitle,
    metaKeywords: data.metaKeywords,
    metaDescription: data.metaDescription,
  }
}