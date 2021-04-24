// Initializes the framework

console.log('\nInitializing citizen...\n')

// citizen
import config   from './init/config.js'
import hooks    from './init/hooks.js'
import patterns from './init/patterns.js'

const appHooks    = await hooks.get(config)
const appPatterns = await patterns.get(config)

global.CTZN = {
  cache     : {},
  config    : config,
  hooks     : appHooks,
  patterns  : appPatterns,
  sessions  : {},
  // citizen throws an error if apps use any of the following variable names
  // because they're reserved for the framework.
  reserved: {
    content: [
      'config',
      'cookie',
      'form',
      'payload',
      'request',
      'response',
      'route',
      'session',
      'url'
      // The include scope isn't susceptible to content overwrites, so leave it off
      // the list for now. Includes break if this is enabled, so that will have to be
      // fixed if this changes.
      // 'include'
    ],
    cookie: [
      'ctzn_referer',
      'ctzn_sessionID'
    ],
    session: [
      'cors',
      'ctzn_referer',
      'expires',
      'id',
      'started',
      'timer'
    ],
    url: [
      'action',
      'callback',
      'format',
      'output',
      'show',
      'task',
      'type',
      'ctzn_debug',
      'ctzn_debugColors',
      'ctzn_debugDepth',
      'ctzn_debugShowHidden',
      'ctzn_dump'
    ]
  }
}

CTZN.config.citizen.compression.mimeTypes  = CTZN.config.citizen.compression.mimeTypes.split(' ')
CTZN.config.citizen.sessionTimeout         = CTZN.config.citizen.sessionTimeout * 60000


// Export citizen data and methods meant for public consumption
import { clear, exists, get, set } from './lib/cache.js'
import { log }                     from './lib/helpers.js'
import { start }                   from './lib/server.js'
import { end }                     from './lib/session.js'

const controllers = appPatterns.controllers
const models      = appPatterns.models
const views       = appPatterns.views
const cache       = { clear, exists, get, set }
const helpers     = { log }
const server      = { start }
const session     = { end }

export default { config, controllers, models, views, cache, helpers, server, session }
