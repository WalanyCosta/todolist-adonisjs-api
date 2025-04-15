import Task from '#models/task'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Task.createMany([
      {
        title: 'any_title',
        description: 'any_description',
        userId: 1,
      },
      {
        title: 'other_title',
        description: 'other_description',
        userId: 1,
      },
      {
        title: 'any_title',
        description: 'any_description',
        userId: 2,
      },
    ])
  }
}
