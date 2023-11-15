import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Sale from 'App/Models/Sale'

export default class extends BaseSeeder {
  public async run() {
    const salesData = [
      { clientId: 1, totalPrice: 50 },
      { clientId: 2, totalPrice: 40 },
      { clientId: 3, totalPrice: 58 },
      { clientId: 4, totalPrice: 57 },
      { clientId: 5, totalPrice: 40 },
    ]

    for (const saleData of salesData) {
      const existingSale = await Sale.query().where('clientId', saleData.clientId).first()

      if (existingSale) {
        existingSale.merge(saleData)
        await existingSale.save()
      } else {
        await Sale.create(saleData)
      }
    }
  }
}
