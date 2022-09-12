import { useMutation, useQuery } from "@blitzjs/rpc"
import { PromiseReturnType } from "blitz"
import { FORM_ERROR } from "final-form"
import { Grid, GridItem, HStack, ModalProps, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react"
import { MutationType } from "app/core/components/types/MutationType"
import ModalForm from "app/core/components/forms/ModalForm"
import createLocation from "../mutations/createLocation"
import updateLocation from "../mutations/updateLocation"
import getLocation from "../queries/getLocation"
import { CreateLocation } from "../validations"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import LabeledCheckboxField from "app/core/components/forms/LabeledCheckboxField"
import { FcButtingIn } from "react-icons/fc"
import { unknown, z } from "zod"

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
    { id: locationId },
    { suspense: false, enabled: !!locationId, staleTime: Infinity }
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
        primary: location?.primary ?? true,
        house: location?.house ?? "",
        street: location?.street ?? "",
        city: location?.city ?? "",
        state: location?.state ?? "",
        zipcode: location?.zipcode ?? "",
        block: location?.block ?? undefined,
        lot: location?.lot ?? undefined,
        parcel: location?.parcel ?? undefined,
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
                          'email email phone phone .'
                          'primary primary primary . .'`}
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

          <GridItem area="email">
            <LabeledTextField name="email" type="email" label="Email" />
          </GridItem>
          <GridItem area="phone">
            <LabeledTextField name="phone" label="Phone" />
          </GridItem>

          <GridItem area="primary">
            <HStack>
              <Tag colorScheme="orange" flexShrink={0}>
                <TagLeftIcon as={FcButtingIn} />
                <TagLabel>Make this the primary location?</TagLabel>
              </Tag>
              <LabeledCheckboxField name="primary" defaultChecked={true} />
            </HStack>
          </GridItem>
        </Grid>
      )}
      {...props}
    />
  )
}

export default LocationModalForm
