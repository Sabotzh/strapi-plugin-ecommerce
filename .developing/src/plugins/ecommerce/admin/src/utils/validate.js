export default (obj) => {
  let validateErrors = {}
  let success = true

  if (obj.name.trim().length < 2) {
    validateErrors = {...validateErrors, name: 'This value is too short.'}
    success = false
  }
  Object.entries(obj).forEach(([key, value]) => {
    if (!value.trim()) {
      validateErrors = { ...validateErrors, [key]: 'This value is required.'}
      success = false
    }
  })

  console.log(validateErrors)
  return { success, validateErrors }
}