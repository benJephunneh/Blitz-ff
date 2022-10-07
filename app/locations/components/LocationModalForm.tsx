import { useMutation, useQuery } from "@blitzjs/rpc"
import { PromiseReturnType } from "blitz"
import { FORM_ERROR } from "final-form"
import {
  Grid,
  GridItem,
  HStack,
  ModalProps,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { MutationType } from "app/core/components/types/MutationType"
import ModalForm from "app/core/components/forms/ModalForm"
import createLocation from "../mutations/createLocation"
import updateLocation from "../mutations/updateLocation"
import getLocation from "../queries/getLocation"
import {
  CreateLocation,
  CreateLocationStash,
  UpdateLocation,
  UpdateLocationStash,
} from "../validations"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import LabeledCheckboxField from "app/core/components/forms/LabeledCheckboxField"
import { FcButtingIn } from "react-icons/fc"
import { unknown, z } from "zod"
import LabeledSelectField from "app/core/components/forms/LabeledSelectField"
import { LocationStash, LocationType, User } from "@prisma/client"
import createStash from "app/stashes/mutations/createStash"
import updateStash from "app/stashes/mutations/updateStash"
import deleteStash from "app/stashes/mutations/deleteStash"
import getStash from "app/stashes/queries/getStash"
import EditorField from "app/core/components/editor/components/EditorField"
import getUser from "app/users/queries/getUser"
import { Signup } from "app/auth/validations"

type Location = PromiseReturnType<typeof createLocation>

type LocationModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (location: Location | LocationStash | void) => void
  customerId: number
  locationId?: number
  stashId?: number
  disableStash?: boolean
  mutationType?: MutationType
  props?: Partial<ModalProps>
}

const LocationModalForm = ({
  isOpen,
  onClose,
  onSuccess,
  customerId,
  locationId,
  stashId,
  disableStash,
  mutationType = "New",
  ...props
}: LocationModalFormProps) => {
  const [createLocationMutation] = useMutation(createLocation)
  const [updateLocationMutation] = useMutation(updateLocation)
  const [createStashMutation] = useMutation(createStash)
  const [updateStashMutation] = useMutation(updateStash)
  const [deleteStashMutation] = useMutation(deleteStash)
  const stashType = "Location"

  const [location] = useQuery(
    getLocation,
    {
      where: { id: locationId },
    },
    {
      enabled: !!locationId,
      // staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  const [locationStash, { refetch: refetchStash }] = useQuery(
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
      id: locationStash?.userId,
    },
    {
      enabled: !!locationStash,
      suspense: !!locationStash,
    }
  )

  const textFootnoteColor = useColorModeValue("gray.500", "gray.300")

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
    const { notes, ...locationSubmission } = values

    let locationRet
    if (values.stashing) {
      console.log("stashing")
      if (locationStash) {
        console.log("\tupdating stash")
        locationRet = await updateStashMutation({
          id: locationStash.id,
          stashType,
          location: locationSubmission,
          notes,
        })
        refetchStash().catch((e) => console.log(`Location update error: ${e}`))
      } else {
        console.log("\tcreating stash")
        locationRet = await createStashMutation({
          customerId,
          stashType,
          location: locationSubmission,
          notes,
        })
      }
    } else {
      console.log("not stashing")
      if (location) {
        console.log("\tupdating location")
        locationRet = await updateLocationMutation({
          id: locationId,
          ...values,
        })
      } else {
        console.log("\tcreating location")
        locationRet = await createLocationMutation({
          customerId,
          locationInput: locationSubmission,
        })
        if (locationStash && locationRet) {
          await deleteStashMutation({
            id: locationStash.id,
            stashType,
          })
        }
      }
    }

    return locationRet
  }

  const handleError = (e) => {
    console.log(`Error doing something with location modal: ${e.toString()}`)
    return {
      [FORM_ERROR]: `Customer modal error: ${e.toString()}`,
    }
  }

  const locationTypes = Object.values(LocationType)
  const initialValues = {
    primary: locationStash?.primary || location?.primary || true,
    house: locationStash?.house || location?.house || undefined,
    street: locationStash?.street || location?.street || undefined,
    city: locationStash?.city || location?.city || undefined,
    state: locationStash?.state || location?.state || "FL",
    zipcode: locationStash?.zipcode || location?.zipcode || undefined,
    phones: locationStash?.phones || location?.phones || undefined,
    block: locationStash?.block || location?.block || undefined,
    lot: locationStash?.lot || location?.lot || undefined,
    parcel: locationStash?.parcel || location?.parcel || undefined,
    locationType: locationStash?.locationType || location?.locationType || "Personal",
    notes: locationStash?.notes ? JSON.parse(locationStash.notes) : null,
    customerId,
  }

  return (
    <ModalForm
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      disableStash={disableStash}
      schema={locationId ? UpdateLocation : CreateLocationStash}
      title={locationId ? "Edit location" : "New location"}
      submitText={locationId ? "Update" : "Create"}
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values)
          .then((location) => onSuccess?.(location))
          // .then(() => onClose())
          .catch((e) => handleError(e))
      }}
      render={() => (
        <>
          <Grid
            templateAreas={`'house street street street street'
                          'city city state zipcode zipcode'
                          'block lot parcel parcel parcel'
                          'phones phones . locationType locationType'
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

            <GridItem area="phones">
              <LabeledTextField name="phones" label="Phone" />
            </GridItem>
            <GridItem area="locationType">
              <LabeledSelectField name="locationType" label="Location type">
                {locationTypes.map((lt, ii) => (
                  <option key={ii} value={lt}>
                    {lt}
                  </option>
                ))}
              </LabeledSelectField>
            </GridItem>

            <GridItem area="primary">
              <HStack>
                <Tag colorScheme="orange" flexShrink={0}>
                  {/* <TagLeftIcon as={FcButtingIn} /> */}
                  <TagLabel>Make this the primary location?</TagLabel>
                </Tag>
                <LabeledCheckboxField name="primary" defaultChecked={true} />
              </HStack>
            </GridItem>
          </Grid>
          <EditorField
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
          />
          {stashId && (
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

export default LocationModalForm
