import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    street: schema.string({}, [rules.required()]),
    number: schema.number([rules.required()]),
    neighborhood: schema.string({}, [rules.required()]),
    city: schema.string({}, [rules.required()]),
    state: schema.string({}, [rules.required()]),
    zip_code: schema.number([rules.required()]),
    user_id: schema.number([rules.required(), rules.exists({ table: 'clients', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
