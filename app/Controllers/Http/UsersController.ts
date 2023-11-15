import CreateUserValidator from 'App/Validators/CreateUserValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserController {
  public async create({ request, response, auth }: HttpContextContract) {
    try {
      const validatedData = await request.validate(CreateUserValidator)

      if (validatedData.email === undefined || validatedData.password === undefined) {
        return response.status(400).json({ error: 'Invalid email or password' })
      }

      const userData = {
        email: validatedData.email,
        password: validatedData.password,
      }

      const user = new User()
      user.email = userData.email
      user.password = userData.password

      await user.save()

      const token = await auth.use('api').attempt(userData.email, userData.password)

      return response.status(201).json({ user, token })
    } catch (error) {
      if (error.messages) {
        return response.status(400).json({ errors: error.messages })
      }
      console.error(error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
