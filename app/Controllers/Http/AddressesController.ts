import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import AddressValidator from 'App/Validators/AddressValidator'

export default class AddressesController {
  public async index({ response }: HttpContextContract) {
    const addresses = await Address.all()
    return response.json(addresses)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(AddressValidator)

      const data = request.only([
        'street',
        'number',
        'neighborhood',
        'city',
        'state',
        'zip_code',
        'user_id',
      ])

      const address = await Address.create(data)
      return response.status(201).json(address)
    } catch (error) {
      console.error(error.messages)
      return response.status(400).json({ errors: error.messages })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const address = await Address.query().where('id', params.id).firstOrFail()
    return response.json(address)
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(AddressValidator)
    const address = await Address.findOrFail(params.id)
    const data = request.only([
      'street',
      'number',
      'neighborhood',
      'city',
      'state',
      'zip_code',
      'user_id',
    ])
    address.merge(data)
    await address.save()
    return response.json(address)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const address = await Address.findOrFail(params.id)
    await address.delete()
    return response.status(204)
  }
}
