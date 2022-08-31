import { useMutation, useQuery } from "@blitzjs/rpc"
import { PromiseReturnType } from "blitz"
import { FORM_ERROR } from "final-form"
import { Grid, GridItem } from "@chakra-ui/react"
import createCustomer from "app/customers/mutations/createCustomer"
import { MutationType } from "app/core/components/types/MutationType"
import updateCustomer from "app/customers/mutations/updateCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import ModalForm from "app/core/components/ModalForm"
import { CreateCustomer } from "app/customers/validations"
import LabeledTextField from "app/core/components/LabeledTextField"
import createLocation from "../mutations/createLocation"
import deleteLocation from "../mutations/deleteLocation"
import updateLocation from "../mutations/updateLocation"
import getLocation from "../queries/getLocation"
import { CreateLocation } from "../validations"

type Location = PromiseReturnType<typeof createLocation>

type LocationModalFormProps = {
  isOpen: boolean
  onClose: () => void
  // onSuccess?: (Location: Location) => void
  onSuccess?: () => void
  customerId: number
  locationId: number
  mutationType: MutationType
}

const LocationModalForm = ({
  isOpen,
  onClose,
  onSuccess,
  customerId,
  locationId,
  mutationType,
}: LocationModalFormProps) => {
  const [newLocationMutation] = useMutation(createLocation)
  const [editLocationMutation] = useMutation(updateLocation)
  const [deleteLocationMutation] = useMutation(deleteLocation)
  const [location] = useQuery(getLocation, { where: { id: locationId } })

  let mutation
  let { house, street, city, state, zipcode, block, lot, parcel, primary } = {} as Location
  switch (mutationType) {
    case "new":
      house = ""
      street = ""
      city = ""
      state = ""
      zipcode = ""
      block = ""
      lot = ""
      parcel = ""
      primary = true
      mutation = newLocationMutation
      break
    case "edit":
      house = location.house
      street = location.street
      city = location.city
      state = location.state
      zipcode = location.zipcode
      block = location.block ?? ""
      lot = location.lot ?? ""
      parcel = location.parcel ?? ""
      primary = location.primary
      mutation = editLocationMutation
      break
    case "delete":
      house = location.house
      street = location.street
      city = location.city
      state = location.state
      zipcode = location.zipcode
      block = location.block ?? ""
      lot = location.lot ?? ""
      parcel = location.parcel ?? ""
      primary = location.primary
      mutation = deleteLocationMutation
      break
    default:
      house = ""
      street = ""
      city = ""
      state = ""
      zipcode = ""
      block = ""
      lot = ""
      parcel = ""
      primary = true
      mutation = newLocationMutation
      break
  }
  const initialValues = {
    house,
    street,
    city,
    state,
    zipcode,
    block,
    lot,
    parcel,
    primary,
    customerId,
  }

  const onSubmit = async (values) => {
    await new Promise((resolve) => {
      resolve(mutation(values))
    })
  }
  const handleError = async (error) => {
    return {
      [FORM_ERROR]: `Customer modal error: ${error.toString()}`,
    }
  }

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      schema={CreateLocation}
      title="Location form"
      submitText="Submit"
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values)
          .then((_location) => onSuccess?.())
          .then(() => onClose())
          .catch((error) => handleError(error))
      }}
      render={() => (
        <Grid
          templateAreas={`'house street street'
                            'city state zipcode'
                            'block lot parcel'`}
          templateColumns={"repeat(3, 1fr)"}
        >
          <GridItem area="house" colSpan={1}>
            <LabeledTextField name="house" label="House #" />
          </GridItem>
          <GridItem area="street" colSpan={2}>
            <LabeledTextField name="street" label="Street" />
          </GridItem>
          <GridItem area="city" colSpan={2}>
            <LabeledTextField name="city" label="City" />
          </GridItem>
          <GridItem area="state" colSpan={1}>
            <LabeledTextField name="state" label="State" disabled={true} value="FL" />
          </GridItem>
          <GridItem area="zipcode" colSpan={1}>
            <LabeledTextField name="zipcode" label="Zipcode" />
          </GridItem>
          <GridItem area="block" colSpan={1}>
            <LabeledTextField name="block" label="Block" />
          </GridItem>
          <GridItem area="lot" colSpan={1}>
            <LabeledTextField name="lot" label="Lot" />
          </GridItem>
          <GridItem area="parcel" colSpan={2}>
            <LabeledTextField name="parcel" label="Parcel" />
          </GridItem>
        </Grid>
      )}
    />
  )
}

export default LocationModalForm
