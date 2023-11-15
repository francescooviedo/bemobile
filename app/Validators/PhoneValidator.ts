import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PhoneValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
    phone: schema.string({}, [
      rules.maxLength(11),
      rules.minLength(11),
      rules.unique({ table: 'phones', column: 'phone' }),
    ]),
  })

  public messages: CustomMessages = {
    'user_id.exists': 'User already has a phone registered.',
    'phone.maxLength': 'Phone must have 11 digits.',
    'phone.minLength': 'Phone must have 11 digits.',
  }
}
