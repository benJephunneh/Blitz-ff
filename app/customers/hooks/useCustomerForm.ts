import { useEffect, useState } from "react"

// customerId: number
// pickCustomer: (id: number) => void
// isOpen: boolean
// onClose: () => void
// onSubmit: () => void
// initialValues: {
//   firstname: string,
//   lastname: string,
//   companyname: string,
//   email: string,
//   notes: any,
// }

type UseCustomerFormProps = {
  id: number
}

const useCustomerForm = ({ id }: UseCustomerFormProps) => {
  const [customerId, setCustomerId] = useState(id)

  useEffect(() => {
    setCustomerId(id)
  }, [id])
}

export default useCustomerForm
