import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SaleProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public saleId: number

  @column()
  public productId: number

  @column()
  public quantity: number
}
