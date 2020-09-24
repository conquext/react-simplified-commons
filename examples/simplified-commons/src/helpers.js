import namor from 'namor'

export const isEmpty = value => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

function newPerson() {
  const statusChance = Math.random()
  const firstName = namor.generate({ words: 1, numbers: 0 })
  const lastName = namor.generate({ words: 1, numbers: 0 })
  return {
    firstName,
    lastName,
    email: firstName + lastName + '@gmail.com',
    inviteSent: Math.floor(Math.random() * 100) % 2 ? 'Yes' : 'No',
    testSent: Math.floor(Math.random() * 30) % 2 ? 'Yes' : 'No',
    testStatus:
      statusChance > 0.66
        ? 'pending'
        : statusChance > 0.33
        ? 'sent'
        : 'received',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(_ => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

export const getFileSizeAndUnit = size => {
  const fSExt = ['Bytes', 'KB', 'MB', 'GB']
  let i = 0
  let _size = size
  while (_size > 900) {
    _size /= 1024
    i++
  }
  const exactSize = Math.round(_size * 100) / 100 + ' ' + fSExt[i]
  return exactSize
}

export function copyToClipboard(text) {
  const input = document.createElement('input')
  input.setAttribute('value', text)
  document.body.appendChild(input)
  input.select()
  const result = document.execCommand('copy')
  document.body.removeChild(input)
  return result
}

export const properCase = str => {
  if (str && typeof str === 'string' && str.trim().length === 1) {
    return String(str)
      .trim()
      .toUpperCase()
  }
  if (str && typeof str === 'string') {
    return str
      .trim()
      .split(' ')
      .map(w => w[0] && w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' ')
  }
  return str
}
