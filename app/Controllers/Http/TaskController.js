'use strict'

const Task = use('App/Models/Task')
const { validate } = use('Validator')

class TaskController {
  async index ({ view }) {
    const tasks = await Task.all()

    return view.render('tasks.index', { tasks: tasks.toJSON( )})
  }

  async store ({ request, response, session }) {
    // validate form input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255'
    })

    // show error messages upon validation fail
    if (validation.fails()) {
      session.withErrors(validation.messages())
              .flashAll()

      return response.redirect('back')
    }

    // persist to database
    const task = new Task()
    task.title = request.input('title')
    await task.save()

    // Fash success message to session
    session.flash({ notification: 'Task added!' })

    return response.redirect('back')
  }

  async destroy ({ params, session, response }) {
    const task = await Task.find(params.id)
    await task.delete()

    // Fash success message to session
    session.flash({ notification: 'Task deleted!' })

    return response.redirect('back')
  }

  async poll ({ params, session, response}) {
    const userNu = session.get('user' + params.id)
    if (userNu > 4) {
      session.flash({ notification: '超过投票次数' })
    } else {
      const task = await Task.find(params.id)
      task.nu = task.nu + 1
      await task.save()
      session.put('user' + params.id, userNu + 1)
    }
    
    return response.redirect('back')
    
  }

  async vote ({ view, request }) {
    var tasks = {};
    if (request.input('title') != null) {
      tasks = await Task.query()
        .where('title', '=', request.input('title'))
        .fetch()
    } else {
      tasks = await Task.all()
    }

    return view.render('tasks.vote', { tasks: tasks.toJSON( )})
  }
}

module.exports = TaskController
