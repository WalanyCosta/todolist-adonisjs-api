import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'secret',
      },
      {
        name: 'other_name',
        email: 'other_email@mail.com',
        password: 'secret',
      },
    ])
  }
}
