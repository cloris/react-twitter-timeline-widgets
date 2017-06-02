import { canUseDOM } from 'exenv'

if (canUseDOM) {
  const $script = require('scriptjs') // eslint-disable-line global-require
  $script('//platform.twitter.com/widgets.js', 'twitter-widgets')
}
export Timeline from './components/Timeline'

