import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DateQueryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    year: schema.string.optional({}, [rules.regex(/^\d{4}$/)]),
    month: schema.string.optional({}, [rules.regex(/^\d{2}$/)]),
  })

  public messages: CustomMessages = {
    'year.regex': 'The year must be four digits long.',
    'month.regex': 'The month must be two digits long.',
  }
}
