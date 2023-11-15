import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'

export default class extends BaseSeeder {
  public async run() {
    const addressesData = [
      {
        street: 'Rua Augusta',
        number: 123,
        neighborhood: 'Jardins',
        city: 'Sao Paulo',
        state: 'Sao Paulo',
        zipCode: 12345678,
        userId: 1,
      },
      {
        street: 'Avenida Paulista',
        number: 567,
        neighborhood: 'Centro',
        city: 'Sao Paulo',
        state: 'Sao Paulo',
        zipCode: 87654321,
        userId: 2,
      },
      {
        street: 'Rua Copacabana',
        number: 890,
        neighborhood: 'Ipanema',
        city: 'Rio de Janeiro',
        state: 'Rio de Janeiro',
        zipCode: 98765432,
        userId: 3,
      },
      {
        street: 'Avenida Beira Mar',
        number: 111,
        neighborhood: 'Praia do Futuro',
        city: 'Fortaleza',
        state: 'Ceara',
        zipCode: 23456789,
        userId: 4,
      },
      {
        street: 'Rua das Flores',
        number: 555,
        neighborhood: 'Centro',
        city: 'Curitiba',
        state: 'Parana',
        zipCode: 34567890,
        userId: 5,
      },
    ]

    for (const addressData of addressesData) {
      const existingAddress = await Address.query().where('userId', addressData.userId).first()

      if (existingAddress) {
        existingAddress.merge(addressData)
        await existingAddress.save()
      } else {
        await Address.create(addressData)
      }
    }
  }
}
