type PhoneFormatProps = {
  phoneNumber: string
}

const phoneFormat = (phoneNumber: string) => {
  if (phoneNumber.length === 7) {
    return `${phoneNumber.slice(0, 3)}.${phoneNumber.slice(3)}`
  } else if (phoneNumber.length === 10) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}.${phoneNumber.slice(6)}`
  }

  return phoneNumber
}

export default phoneFormat
