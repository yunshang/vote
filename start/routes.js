'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', 'TaskController.index')
Route.post('tasks', 'TaskController.store')
Route.get('/vote', 'TaskController.vote')

Route.delete('tasks/:id', 'TaskController.destroy')
// Route.on('/').render('welcome')
