import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Phone from 'App/Models/Phone'
import PhoneValidator from 'App/Validators/PhoneValidator'

export default class PhonesController {
  public async index({ response }: HttpContextContract) {
    const phones = await Phone.all()
    return response.json(phones)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(PhoneValidator)

      const data = request.only(['user_id', 'phone'])
      const phone = await Phone.create(data)
      return response.status(201).json(phone)
    } catch (error) {
      return response.status(400).json({ errors: error.messages })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    return response.json(phone)
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(PhoneValidator)
    const phone = await Phone.findOrFail(params.id)
    const data = request.only(['user_id', 'phone'])
    phone.merge(data)
    await phone.save()
    return response.json(phone)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    await phone.delete()
    return response.status(204)
  }
}
