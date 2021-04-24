// initialize event hooks

// node
import fs          from 'fs'
import path        from 'path'
// citizen
import application from '../lib/hooks/application.js'
import request     from '../lib/hooks/request.js'
import response    from '../lib/hooks/response.js'
import session     from '../lib/hooks/session.js'

const get = async (config) => {
  let hooks    = {},
      files    = [],
      jsRegex  = new RegExp(/.*\.(js)|(cjs)$/)

  // If there isn't a hooks directory, return an empty object
  try {
    files = fs.readdirSync(config.citizen.directories.hooks)
  } catch ( err ) {
    console.log(err)
    console.log('\nNo valid app event hooks found. Skipping...\n')
  }

  console.log('\nImporting event hooks:\n')

  for ( const file of files ) {
    if ( jsRegex.test(file) ) {
      console.log('  ' + config.citizen.directories.hooks + '/' + file)
      hooks[path.basename(file, path.extname(file))] = await import(path.join(config.citizen.directories.hooks, '/', file))
    }
  }

  console.log('\n')

  return {
    citizen: {
      application : application,
      request     : request,
      response    : response,
      session     : session
    },
    app: hooks
  }
}


export default { get }
