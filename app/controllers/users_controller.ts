import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const users = await User.query().preload('tasks')
    return users
  }

  /**
   * Metodo usado quando se tem a camada de view
   */
  //async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { name, email, password } = await request.validateUsing(createUserValidator)
    const user = await User.create({ name, email, password })

    return user
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail('id', params.id)
      await user.load('tasks')
      return user
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }

  /**
   * metodo usado quando se tem o edit
   */
  //async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const user = await User.find(params.id)
    const { name, password } = await request.validateUsing(updateUserValidator)
    user!.merge({ name, password })
    await user!.save()
    return user
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }
}
