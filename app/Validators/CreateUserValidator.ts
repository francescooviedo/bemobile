import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(6)]),
  })

  public messages: CustomMessages = {
    'email.email': 'Invalid email format',
    'email.unique': 'Email already exists',
    'password.minLength': 'Password must be at least 6 characters long',
  }
}
