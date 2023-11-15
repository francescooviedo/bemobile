import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Phone from './Phone'
import Address from './Address'
import Sale from './Sale'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public document: string

  @hasMany(() => Phone, { foreignKey: 'userId' })
  public phones: HasMany<typeof Phone>

  @hasOne(() => Address, { foreignKey: 'userId' })
  public address: HasOne<typeof Address>

  @hasMany(() => Sale, { foreignKey: 'clientId' })
  public sale: HasMany<typeof Sale>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
