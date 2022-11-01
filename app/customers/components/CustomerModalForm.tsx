import { useMutation, useQuery } from "@blitzjs/rpc"
import { FORM_ERROR } from "final-form"
import createCustomer from "../mutations/createCustomer"
import updateCustomer from "../mutations/updateCustomer"
import { CustomerFormSchema, CustomerSkeleton, textNotes } from "../validations"
import { Flex, Grid, GridItem, ModalProps, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import ModalForm from "app/core/components/forms/ModalForm"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import { Customer, CustomerStash } from "@prisma/client"
import createStash from "app/stashes/mutations/createStash"
import getStash from "app/stashes/queries/getStash"
import deleteStash from "app/stashes/mutations/deleteStash"
import updateStash from "app/stashes/mutations/updateStash"
import getUser from "app/users/queries/getUser"
import TextAreaField from "app/core/components/forms/components/TextAreaField"
import LabeledListField from "app/core/components/forms/LabeledListField"
import { Field } from "react-final-form"
import LabeledSelectField from "app/core/components/forms/LabeledSelectField"

type CustomerModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (customer: Customer | CustomerStash | void) => void
  // customerId?: number
  stashId?: number
  customer?: Customer | null
  // customerStash?: CustomerStash // | LocationStash
  disableStash?: boolean
  // mutationType?: MutationType
  props?: Partial<ModalProps>
}

const CustomerModalForm = ({
  isOpen,
  onClose,
  onSuccess,
  // customerId,
  stashId,
  customer,
  // customerStash,
  disableStash,
  // mutationType = "New",
  ...props
}: CustomerModalFormProps) => {
  const [createCustomerMutation] = useMutation(createCustomer)
  const [updateCustomerMutation] = useMutation(updateCustomer)
  const [createStashMutation] = useMutation(createStash)
  const [updateStashMutation] = useMutation(updateStash)
  const [deleteStashMutation] = useMutation(deleteStash)
  const stashType = "Customer"
  // console.log('CustomerModalForm inputs:')
  // console.log(`\tcustomerId: ${customerId}`)
  // console.log(`\tstash: ${JSON.stringify(stashId)}`)

  // const [customer, { setQueryData }] = useQuery(
  //   getCustomer,
  //   {
  //     where: { id: customerId },
  //   },
  //   {
  //     // suspense: !!customerId,
  //     enabled: !!customerId,
  //     // staleTime: Infinity,
  //     refetchOnWindowFocus: false,
  //   }
  // )

  // const customerStash = useStash(stashId, stashType)

  const [customerStash] = useQuery(
    getStash,
    {
      id: stashId,
      stashType,
    },
    {
      suspense: !!stashId,
      enabled: !!stashId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  const [user] = useQuery(
    getUser,
    {
      id: customerStash?.userId,
    },
    {
      enabled: !!customerStash,
      suspense: !!customerStash,
      refetchOnWindowFocus: false,
    }
  )

  const textFootnoteColor = useColorModeValue("red", "cyan.200")

  // console.log(`customerId: ${customerId}`)
  // console.log(`isLoading: ${isLoading}`)
  // console.log(`customer.id: ${customer?.id}`)
  // console.log(`customerStash ${customerStash.id}`)

  // let mutation: MutateFunction<Customer, unknown, {}, unknown>
  // let { id, firstname, lastname } = {} as Customer
  // switch (mutationType) {
  //   case "New":
  //     mutation = newCustomerMutation
  //     break
  //   case "Edit":
  //     id = customerId!
  //     firstname = customer!.firstname
  //     lastname = customer!.lastname
  //     mutation = editCustomerMutation
  //     break
  //   default:
  //     break
  // }
  // const initialValues = {
  //   id,
  //   firstname,
  //   lastname,
  // }

  const onSubmit = async (values) => {
    // console.log(JSON.stringify(values))
    // console.log("Entered onSubmit")
    // console.log(`values.stashing: ${values.stashing}`)

    // const formSubmission = (({ firstname, lastname, companyname, email }) => ({ firstname, lastname, companyname, email }))(values)
    const { notes, ...formSubmission } = values

    let customerRet
    if (values.stashing) {
      // console.log("\tstashing")
      if (customerStash) {
        // console.log("\t\tupdate stash")
        customerRet = await updateStashMutation({
          id: customerStash.id,
          stashType,
          customer: formSubmission,
          notes,
        })
        // await refetchStash()
      } else {
        // console.log("\t\tcreate stash")
        customerRet = await createStashMutation({
          stashType,
          customer: formSubmission,
          notes,
        })
      }
    } else {
      // console.log("\tnot stashing")
      if (customer) {
        // console.log("\t\tupdating customer")
        customerRet = await updateCustomerMutation({
          id: customer.id,
          ...values,
        })
      } else {
        // console.log("\t\tcreating customer")
        customerRet = await createCustomerMutation(values)
        if (customerStash && customerRet)
          await deleteStashMutation({
            id: customerStash.id,
            stashType,
          })
      }
      // await refetchCustomer()
    }
    return customerRet
  }

  const handleError = (error) => {
    console.log(`Error doing something with customer modal: ${error.message}`)
    return {
      [FORM_ERROR]: `Customer modal error: ${error.message}`,
    }
  }

  const initialValues = {
    firstname: customerStash?.firstname || customer?.firstname || undefined,
    lastname: customerStash?.lastname || customer?.lastname || undefined,
    companyname: customerStash?.companyname || customer?.companyname || undefined,
    email: customerStash?.email || customer?.email || undefined,
    notes: customerStash?.notes || customer?.notes || null,
  }

  const onChange = (v) => {
    console.log(v)
  }

  return (
    <ModalForm
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      disableStash={disableStash}
      schema={CustomerFormSchema}
      title={customer ? "Edit customer" : "New customer"}
      submitText={customer ? "Update" : "Create"}
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values)
          .then((customer) => onSuccess?.(customer)) // onSuccess( customer || stash )
          // .then(() => refetchStash())
          .catch((e) => handleError(e))
      }}
      render={() => (
        <>
          <Grid
            // templateColumns="repeat(5, 1fr)"
            // templateRows='repeat(7, 1fr)'
            templateAreas={`'fn ln ln'
                            'cn cn .'
                            'em em .'
                            'ph ph .'`}
            gap={2}
          >
            <GridItem area="fn">
              <LabeledTextField name="firstname" label="First name" />
            </GridItem>
            <GridItem area="ln">
              <LabeledTextField name="lastname" label="Last name" />
            </GridItem>
            <GridItem area="cn">
              <LabeledTextField name="companyname" label="Company name" />
            </GridItem>
            <GridItem area="em">
              <LabeledTextField name="email" label="Email address" type="email" />
            </GridItem>
            <GridItem area="ph">
              <LabeledTextField name="phone" label="Phone number" />
            </GridItem>
            {/* <GridItem area='pl'>
              <Flex direction='column'>
                <Text fontWeight='semibold'>Phone list</Text>
                <Field name='phoneList' component='select' multiple w='full' h='full'>
                  <option value='phone1'>2348023460</option>
                  <option value='phone2'>8023926</option>
                  <option value='phone3'>0923623842</option>
                </Field>
              </Flex>
            </GridItem> */}
          </Grid>
          {/* <EditorField
            name="notes"
            fontSize="md"
            label="Stash notes"
            features={{
              heading: true,
              horizontalRule: true,
            }}
            barMenu
            bubbleMenu
            floatingMenu
          /> */}
          <TextAreaField
            name="notes"
            label="Notes"
            // modelType="Customer"
            placeholder="Add notes about this customer..."
          />
          {customerStash && (
            <Text fontSize="xs" color={textFootnoteColor}>
              Stashed by {user?.username}
            </Text>
          )}
        </>
      )}
      {...props}
    />
  )
}

export default CustomerModalForm
