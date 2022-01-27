export default (obj) => {
  let validateErrors = {};
  let success = true;

  if (obj.name.trim().length < 3 || obj.name.trim().length > 50) {
    validateErrors = { ...validateErrors, name: 'This value is too short.' };
    success = false;
  }

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string") value = value.trim();
    if (!value) {
      validateErrors = { ...validateErrors, [key]: 'This value is required.'};
      success = false;
    }
  })

  return { success, validateErrors };
}
