import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import DateQueryValidator from 'App/Validators/DateQueryValidator'
import ClientValidator from 'App/Validators/ClientValidator'

export default class ClientsController {
  public async index({ response }: HttpContextContract) {
    const clients = await Client.query().orderBy('id', 'asc').exec()
    return response.json(clients)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validatedData = await request.validate(ClientValidator)

      const client = await Client.create(validatedData)

      return response.status(201).json(client)
    } catch (error) {
      if (error.messages) {
        return response.status(400).json({ errors: error.messages })
      }

      console.error(error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async show({ params, response, request }: HttpContextContract) {
    try {
      await request.validate(DateQueryValidator)

      const { year, month } = request.qs()
      const handleMonth = month ? month : ''
      const handleYear = year ? year : ''

      const client = await Client.query()
        .where('id', params.id)
        .preload('phones')
        .preload('address')
        .preload('sale', (salesQuery) => {
          salesQuery
            .where('created_at', 'like', `%${handleYear}-${handleMonth}%-%`)
            .preload('product')
        })
        .firstOrFail()

      return response.json(
        client.serialize({
          fields: {
            omit: ['created_at', 'updated_at'],
          },
          relations: {
            address: {
              fields: {
                omit: ['created_at', 'updated_at', 'user_id', 'id'],
              },
            },
            phones: {
              fields: {
                omit: ['created_at', 'updated_at', 'user_id', 'id'],
              },
            },
            sale: {
              fields: {
                omit: ['updated_at', 'client_id'],
              },
            },
          },
        })
      )
    } catch (error) {
      if (error.messages) {
        return response.status(400).json({ errors: error.messages })
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    const data = request.only(['name', 'document'])
    await request.validate(ClientValidator)
    client.merge(data)
    await client.save()
    return response.json(client)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    await client.delete()
    return response.status(204)
  }
}
