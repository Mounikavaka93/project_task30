const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(String(value).trim())
}

export function isValidPhone(value) {
  const digits = String(value).replace(/\D/g, '')
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
  return /^[6-9]\d{9}$/.test(local)
}

export function isValidPincode(value) {
  return /^\d{6}$/.test(String(value).trim())
}

export function isValidAddress(value) {
  return String(value).trim().length >= 8
}

export function isValidUpiId(value) {
  return /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/.test(String(value).trim())
}

export function isValidName(value) {
  return String(value).trim().length >= 2
}

export function isValidMessage(value) {
  return String(value).trim().length >= 10
}

export function toTelHref(phone) {
  const digits = String(phone).replace(/\D/g, '')
  const local = digits.length === 12 && digits.startsWith('91') ? digits : digits.length === 10 ? `91${digits}` : digits
  return `tel:+${local}`
}

export function formatCardNumber(value) {
  return String(value)
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function formatCardExpiry(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function isValidCardNumber(value) {
  const digits = String(value).replace(/\D/g, '')
  return digits.length === 16 && !/^0+$/.test(digits)
}

export function isValidCardExpiry(value) {
  const match = String(value).trim().match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  const expires = new Date(year, month, 0, 23, 59, 59)
  return expires >= new Date()
}

export function isValidCardCvc(value) {
  return /^\d{3,4}$/.test(String(value).trim())
}
