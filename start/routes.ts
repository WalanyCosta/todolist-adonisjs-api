import auth from '@adonisjs/auth/services/main'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('#controllers/users_controller')
const TaskController = () => import('#controllers/tasks_controller')
const SessionController = () => import('#controllers/session_controller')

router.post('session', [SessionController, 'store'])

router.resource('user', UsersController).apiOnly()
router
  .group(() => {
    router.resource('task', TaskController)
  })
  .use(middleware.auth())
