import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class LoginController {
  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const loginData = await request.validate(LoginValidator)

      const token = await auth.use('api').attempt(loginData.email, loginData.password)

      return response.json({ token })
    } catch (error) {
      console.error(error)

      return response.status(401).json({ error: 'Invalid credentials' })
    }
  }
}
