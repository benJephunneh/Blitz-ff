import { BlitzPage } from "@blitzjs/next"
import { Button, Container } from "@chakra-ui/react"
import SubmitButton from "app/core/components/forms/components/SubmitButton"
import TextFieldUtf from "app/core/components/forms/components/TextFieldUtf"
import { Form, useForm, useValidation } from "usetheform"
import { z } from "zod"

const fieldSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
})

const validateForm = (v) => {
    try {
        fieldSchema.parse(v)
    } catch (e) {
        // console.log({ e })
        if (e.errors[0].path === "") {
            return { all: e.errors[0].message }
        } else {
            return e.errors.reduce((acc, errObj) => {
                const namefield = errObj.path[0]
                acc = { ...acc, [namefield]: errObj.message }
                return acc
            }, {})
        }
    }
}

const TestUtForm: BlitzPage = () => {
    // const required = (v) => (v && v.trim() !== "" ? undefined : "Required")
    // const onChange = (e) => console.log("On change: ", e)
    const onSubmit = (e) => {
        console.log("On submit: ", e)
    }

    const [{ error }, validation] = useValidation([validateForm])
    const firstnameError = error?.["firstname"] || error?.["all"]
    const lastnameError = error?.["lastname"] || error?.["all"]
    const emailError = error?.["email"] || error?.["all"]
    // console.log({ firstnameError }) // E.g. 'Required'
    // console.log({ lastnameError })
    // console.log({ emailError }) // E.g. 'Invalid email'
    // console.log({ ...error })

    return (
        <Container>
            <Form
                touched
                {...validation}
                onSubmit={onSubmit}
            // onChange={onChange}
            // initialState={{ firstname: "Bob", lastname: "Wiley", email: "" }}
            >
                <TextFieldUtf isRequired name="firstname" prefix="First name" error={firstnameError} />
                <TextFieldUtf isRequired name="lastname" prefix="Last name" error={lastnameError} />
                <TextFieldUtf isRequired name="email" prefix="Email" error={emailError} />

                <SubmitButton>Submit</SubmitButton>
            </Form>
        </Container>
    )
}

export default TestUtForm
