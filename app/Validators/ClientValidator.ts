import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    document: schema.string({}, [
      rules.unique({ table: 'clients', column: 'document' }),
      rules.maxLength(11),
    ]),
  })

  public messages: CustomMessages = {}
}
