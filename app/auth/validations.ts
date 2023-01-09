import { UserRole } from "@prisma/client"
import { z } from "zod"

const id = z.number()
const username = z.string()
const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())
const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

const role = z.nativeEnum(UserRole)

export interface IUser {
  id: number
  username: string
  email: string
  role: UserRole
}

export const Signup = z.object({
  username,
  email,
  password,
  role,
})

export const Login = z.object({
  username,
  password,
})

export const ValidatedUser = z.object({
  id,
  username,
  email,
  role,
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
