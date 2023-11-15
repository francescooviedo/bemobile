import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Phone from 'App/Models/Phone'

export default class extends BaseSeeder {
  public async run() {
    const phonesData = [
      {
        userId: 1,
        phone: '31987654321',
      },
      {
        userId: 2,
        phone: '31876543210',
      },
      {
        userId: 3,
        phone: '31765432109',
      },
      {
        userId: 4,
        phone: '31654321098',
      },
      {
        userId: 5,
        phone: '31543210987',
      },
    ]

    for (const phoneData of phonesData) {
      const existingPhone = await Phone.findBy('userId', phoneData.userId)

      if (existingPhone) {
        existingPhone.merge(phoneData)
        await existingPhone.save()
      } else {
        await Phone.create(phoneData)
      }
    }
  }
}
