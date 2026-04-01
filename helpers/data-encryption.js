export function encrypt(str, shift = 3) {
  return str
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) + shift))
    .join('')
}

export function decrypt(str, shift = 3) {
  return str
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) - shift))
    .join('')
}
