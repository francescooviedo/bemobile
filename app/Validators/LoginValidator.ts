import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class LoginValidator {
  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
    password: schema.string(),
  })

  public messages: CustomMessages = {
    'email.exists': 'Invalid email or password',
  }
}
