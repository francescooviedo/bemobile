import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(
      {
        trim: true,
        escape: true,
      },
      [rules.unique({ table: 'products', column: 'name' }), rules.minLength(1)]
    ),
    description: schema.string(
      {
        trim: true,
        escape: true,
      },
      [rules.minLength(1)]
    ),
    weight: schema.number([rules.required()]),
    price: schema.number([rules.required()]),
  })

  public messages: CustomMessages = {
    'name.required': 'The name field is required.',
    'name.unique': 'The name has already been taken.',
    'name.minLength': 'The name must not be empty.',
    'description.required': 'The description field is required.',
    'description.minLength': 'The description must not be empty.',
    'weight.required': 'The weight field is required.',
    'price.required': 'The price field is required.',
  }
}
