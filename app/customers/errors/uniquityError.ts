import SuperJson from "superjson"
class UniquityError extends Error {
  name = "UniquityError"
  message = "Model parameter is not unique."
}

SuperJson.registerClass(UniquityError, "UniquityError")

export default UniquityError
