import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'

export default class extends BaseSeeder {
  public async run() {
    const clientsData = [
      {
        name: 'user1',
        document: '12345678901',
      },
      {
        name: 'testuser',
        document: '98765432102',
      },
      {
        name: 'john_doe',
        document: '11223344556',
      },
      {
        name: 'mockuser',
        document: '99887766554',
      },
      {
        name: 'example_user',
        document: '66554433221',
      },
    ]

    for (const clientData of clientsData) {
      const existingClient = await Client.findBy('document', clientData.document)

      if (existingClient) {
        existingClient.merge(clientData)
        await existingClient.save()
      } else {
        await Client.create(clientData)
      }
    }
  }
}
