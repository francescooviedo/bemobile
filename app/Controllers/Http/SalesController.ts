import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'

export default class SalesController {
  public async index({ response }: HttpContextContract) {
    const sales = await Sale.all()
    return response.json(sales)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const clientId = request.input('client_id')

      const data = request.input('sale', 'client_id') as Array<{
        product_id: number
        quantity: number
      }>

      if (!data || !Array.isArray(data) || data.length === 0) {
        return response.status(400).json({ error: 'Invalid input data for sales.' })
      }

      const products = await Product.findMany(data.map((p) => p.product_id))
      if (products.length !== data.length) {
        return response.status(400).json({ error: 'product do not exist' })
      }
      let totalPrice = 0
      const salesProducts: { quantity: number; product_id: number }[] = []
      data.forEach((saleProduct) => {
        products.forEach((product) => {
          if (product.id === saleProduct.product_id) {
            totalPrice += product.price * saleProduct.quantity
            salesProducts.push({
              quantity: saleProduct.quantity,
              product_id: saleProduct.product_id,
            })
          }
        })
      })

      const sale = await Sale.create({
        clientId,
        totalPrice,
      })
      await Promise.all(
        salesProducts.map((p) =>
          sale.related('product').attach({
            [p.product_id]: {
              quantity: p.quantity,
            },
          })
        )
      )
      return response.status(201).json(sale)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Failed to create sale.' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const sale = await Sale.findOrFail(params.id)
    return response.json(sale)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const sale = await Sale.findOrFail(params.id)
    await sale.delete()
    return response.status(204)
  }
}
