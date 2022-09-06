import { MutateFunction, useMutation, useQuery } from "@blitzjs/rpc"
import { PromiseReturnType } from "blitz"
import { FORM_ERROR } from "final-form"
import { Checkbox, Grid, GridItem, ModalProps } from "@chakra-ui/react"
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
  onSuccess?: (location: Location) => void
  customerId: number
  locationId?: number
  mutationType?: MutationType
  props?: Partial<ModalProps>
}

const LocationModalForm = ({
  isOpen,
  onClose,
  onSuccess,
  customerId,
  locationId,
  mutationType = "New",
  ...props
}: LocationModalFormProps) => {
  const [newLocationMutation] = useMutation(createLocation)
  const [editLocationMutation] = useMutation(updateLocation)
  const [location, { isLoading }] = useQuery(
    getLocation,
    { where: { id: locationId } },
    { suspense: false, enabled: !!locationId }
  )

  // let mutation: MutateFunction<Location, unknown, {}, unknown>
  // let { id, house, street, city, state, zipcode, block, lot, parcel, primary } = {} as Location
  // switch (mutationType) {
  //   case "New":
  //     house = ""
  //     street = ""
  //     city = ""
  //     state = "FL"
  //     zipcode = ""
  //     primary = true
  //     mutation = newLocationMutation
  //     break
  //   case "Edit":
  //     id = locationId!
  //     house = location.house
  //     street = location.street
  //     city = location.city
  //     state = location.state
  //     zipcode = location.zipcode
  //     block = location.block
  //     lot = location.lot
  //     parcel = location.parcel
  //     primary = location.primary
  //     mutation = editLocationMutation
  //     break
  //   default:
  //     house = ""
  //     street = ""
  //     city = ""
  //     state = "FL"
  //     zipcode = ""
  //     primary = true
  //     mutation = newLocationMutation
  //     break
  // }
  // const initialValues = {
  //   id,
  //   house,
  //   street,
  //   city,
  //   state,
  //   zipcode,
  //   block,
  //   lot,
  //   parcel,
  //   primary,
  //   customerId,
  // }

  const onSubmit = async (values) => {
    if (location) {
      return editLocationMutation({ id: location.id, ...values })
    }
    return newLocationMutation(values)
  }

  const handleError = async (error) => {
    console.log(`Error doing something with location modal: ${error.toString()}`)
    return {
      [FORM_ERROR]: `Customer modal error: ${error.toString()}`,
    }
  }

  return (
    <ModalForm
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      schema={CreateLocation}
      title={locationId ? "Edit location" : "New location"}
      submitText={locationId ? "Update" : "Create"}
      initialValues={{
        primary: !!location?.primary,
        house: location?.house ?? "", // This needs to be changed to "?? null," to match updated schema, after migration.
        street: location?.street ?? "",
        city: location?.city ?? "",
        state: location?.state ?? "",
        zipcode: location?.zipcode ?? "",
        block: location?.block ?? null,
        lot: location?.lot ?? null,
        parcel: location?.parcel ?? null,
        customerId,
      }}
      onSubmit={(values) => {
        onSubmit(values)
          .then((location) => onSuccess?.(location!))
          .then(() => onClose())
          .catch((error) => handleError(error))
      }}
      render={() => (
        <Grid
          templateAreas={`'house street street street street'
                          'city city state zipcode zipcode'
                          'block lot parcel parcel parcel'
                          'primary . . . .'`}
          templateColumns="repeat(5, 1fr)"
          gap={2}
        >
          <GridItem area="house">
            <LabeledTextField name="house" label="House #" />
          </GridItem>
          <GridItem area="street">
            <LabeledTextField name="street" label="Street" />
          </GridItem>
          <GridItem area="city">
            <LabeledTextField name="city" label="City" />
          </GridItem>
          <GridItem area="state">
            <LabeledTextField name="state" label="State" value="FL" />
          </GridItem>
          <GridItem area="zipcode">
            <LabeledTextField name="zipcode" label="Zipcode" />
          </GridItem>
          <GridItem area="block">
            <LabeledTextField name="block" label="Block" />
          </GridItem>
          <GridItem area="lot">
            <LabeledTextField name="lot" label="Lot" />
          </GridItem>
          <GridItem area="parcel">
            <LabeledTextField name="parcel" label="Parcel" />
          </GridItem>
          <GridItem area="primary">
            <Checkbox name="primary" defaultChecked>
              Primary address
            </Checkbox>
          </GridItem>
        </Grid>
      )}
      {...props}
    />
  )
}

export default LocationModalForm
