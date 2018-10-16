import G6 from '@antv/g6'
import Layout from './layout'

G6.Layouts.Res = Layout

class Plugin {
  constructor (options) {
    this.options = options
  }

  init () {
    this.graph.on('beforeinit', () => {
      const layout = new Layout(this.options)
      this.graph.set('layout', layout)
    })
  }
}

G6.Plugins['layout.res'] = Plugin

export default Plugin
