type PhoneDisplayProps = {
  phone: string
}

const phoneDisplay = (phone: string) => {
  if (!phone) return null

  let ret = ""
  if (phone.length == 7) {
    ret = `${phone.slice(0, 3)}.${phone.slice(3)}`
  } else if (phone.length == 10) {
    ret = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}.${phone.slice(6)}`
  } else {
    ret = phone
  }
  return ret
}

export default phoneDisplay
