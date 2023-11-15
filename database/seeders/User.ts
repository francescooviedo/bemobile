import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    const usersData = [
      {
        email: 'user1@example.com',
        password: 'password123',
      },
      {
        email: 'testuser@gmail.com',
        password: 'securepass456',
      },
      {
        email: 'john_doe@mail.com',
        password: 'qwerty789',
      },
      {
        email: 'mockuser@domain.com',
        password: 'letmein2023',
      },
      {
        email: 'example_user123@yahoo.com',
        password: 'p@ssw0rd',
      },
    ]

    for (const userData of usersData) {
      const existingUser = await User.findBy('email', userData.email)

      if (existingUser) {
        existingUser.merge(userData)
        await existingUser.save()
      } else {
        await User.create(userData)
      }
    }
  }
}
