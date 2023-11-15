import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SaleProduct from 'App/Models/SaleProduct'

export default class extends BaseSeeder {
  public async run() {
    const saleProductData = [
      { saleId: 1, productId: 1, quantity: 1 },
      { saleId: 1, productId: 2, quantity: 1 },
      { saleId: 2, productId: 3, quantity: 1 },
      { saleId: 2, productId: 4, quantity: 1 },
      { saleId: 3, productId: 5, quantity: 1 },
      { saleId: 3, productId: 6, quantity: 1 },
      { saleId: 4, productId: 7, quantity: 1 },
      { saleId: 4, productId: 8, quantity: 1 },
      { saleId: 5, productId: 9, quantity: 1 },
      { saleId: 5, productId: 10, quantity: 1 },
    ]

    for (const data of saleProductData) {
      const existingSaleProduct = await SaleProduct.query()
        .where('saleId', data.saleId)
        .where('productId', data.productId)
        .first()

      if (existingSaleProduct) {
        existingSaleProduct.merge(data)
        await existingSaleProduct.save()
      } else {
        await SaleProduct.create(data)
      }
    }
  }
}
