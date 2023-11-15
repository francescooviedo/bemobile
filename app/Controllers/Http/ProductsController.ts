import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sale from 'App/Models/Product'
import ProductValidator from 'App/Validators/ProductValidator'

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    const products = await Sale.all()
    return response.json(products)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(ProductValidator)

    const data = request.only(['name', 'description', 'weight', 'price'])
    const product = await Sale.create(data)
    return response.status(201).json(product)
  }

  public async show({ params, response }: HttpContextContract) {
    const product = await Sale.findOrFail(params.id)
    return response.json(product)
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(ProductValidator)
    const product = await Sale.findOrFail(params.id)
    const data = request.only(['name', 'description', 'weight', 'price'])
    product.merge(data)
    await product.save()
    return response.json(product)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const product = await Sale.findOrFail(params.id)
    await product.delete()
    return response.status(204)
  }
}
