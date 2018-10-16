import ReGraph from './core/reGraph'
import formatData from './utils/formatData'
// instance是ReGraph实例
const reGraph = {
  instance: null,
  create (opts) {
    this.instance = this.instance || new ReGraph(opts)
  },
  read (data) {
    if (this.instance) {
      this.instance.readData(data)
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
export default reGraph
