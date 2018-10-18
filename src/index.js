import Instance from './core'
import formatData from './utils/formatData'

const ReGraph = {
  instance: null,
  create (opts) {
    this.instance = this.instance || new Instance(opts)
  },
  read (data, originalData) {
    if (this.instance) {
      this.instance.readData(data, originalData)
    }
  },
  destroy () {
    if (this.instance) {
      this.instance = null
    }
  },
  Utils: {
    formatData,
  },
}
export default ReGraph
