const validateLength = (value, min, max, onError) => {
  if (!value) return '';

  if (value.trim().length < min) {
    onError()
    return 'This value is too short.';
  }
  if (value.trim().length > max) {
    onError()
    return 'This value is too long.';
  }
}

export default (objElems) => {
  let validateErrors = {};
  let success = true;

  const onError = () => {
    success = false
  }

  validateErrors.name = validateLength(objElems.name, 1, 50, onError);
  validateErrors.shortDescription = validateLength(objElems.shortDescription, 10, 500, onError);
  validateErrors.description = validateLength(objElems.description, 10, 5000, onError);
  validateErrors.metaTitle = validateLength(objElems.metaTitle, 1, 50, onError);
  validateErrors.metaDescription = validateLength(objElems.metaDescription, 10, 500, onError);

  Object.entries(objElems).forEach(([key, value]) => {
    if (typeof value === 'string') value = value.trim();

    if (!value) {
      validateErrors = { ...validateErrors, [key]: 'This value is required.'};
      success = false;
    }
  })

  return { success, validateErrors };
}

export const numberValidate = (objElems) => {
  let validateErrors = {};
  let success = true;
  Object.entries(objElems).forEach(([key, value]) => {
    if (!value) return

    try {
      value = Number(value)
    } catch {
      validateErrors = { ...validateErrors, [key]: 'This is not a number.'};
      success = false;
      return
    }

    if (value < 0) {
      validateErrors = { ...validateErrors, [key]: 'The value is too low.'};
      success = false;
    }
  })

  console.log(validateErrors)
  return { success, validateErrors }
}


