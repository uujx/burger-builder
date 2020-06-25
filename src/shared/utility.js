export const checkValidity = (value, rules) => {
  if (rules.required && value.trim() === '') {
    return false
  }

  if (
    rules.isEmail &&
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
  ) {
    return false
  }

  if (rules.minLength && value.length < rules.minLength) {
    return false
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return false
  }

  return true
}
