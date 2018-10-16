/* eslint camelcase: "off", object-curly-newline: "off" */
import G6 from '@antv/g6'
import dagre from 'dagre'

const { Util } = G6

class Layout {
  constructor (options) {
    Util.mix(this, {
      rankdir: 'LR',
      align: undefined,
      nodesep: 70,
      edgesep: 10,
      ranksep: 70,
      marginx: 0,
      marginy: 0,
      acyclicer: undefined,
      useEdgeControlPoint: false,
      ranker: 'network-simplex',
      callback: null,
    }, options)
  }

  getValue (name) {
    const value = this[name]
    if (Util.isFunction(value)) {
      return value()
    }
    return value
  }

  // 执行布局
  execute () {
    const { nodes, edges, useEdgeControlPoint } = this
    const nodeMap = {}
    const g = new dagre.graphlib.Graph()
    g.setGraph({
      rankdir: this.getValue('rankdir'),
      align: this.getValue('align'),
      nodesep: this.getValue('nodesep'),
      edgesep: this.getValue('edgesep'),
      ranksep: this.getValue('ranksep'),
      marginx: this.getValue('marginx'),
      marginy: this.getValue('marginy'),
      acyclicer: this.getValue('acyclicer'),
      ranker: this.getValue('ranker'),
    })
    g.setDefaultEdgeLabel(() => ({}))
    nodes.forEach((node) => {
      g.setNode(node.id, { width: node.width, height: node.height })
      nodeMap[node.id] = node
    })
    edges.forEach((edge) => {
      const { source, target, source_field, target_field } = edge
      const sourceNode = nodes.find(it => it.id === source)
      const targetNode = nodes.find(it => it.id === target)
      const sourceFieldIndex = sourceNode.fields.findIndex(it => it === source_field)
      const targetFieldIndex = targetNode.fields.findIndex(it => it === target_field)
      if (sourceNode.x >= targetNode.x && targetNode.x + targetNode.width > sourceNode.x) {
        edge.sourceAnchor = sourceFieldIndex * 2
        edge.targetAnchor = targetFieldIndex * 2
      } else if (sourceNode.x > targetNode.x && targetNode.x + targetNode.width <= sourceNode.x) {
        edge.sourceAnchor = sourceFieldIndex * 2
        edge.targetAnchor = targetFieldIndex * 2 + 1
      } else if (sourceNode.x < targetNode.x && sourceNode.x + sourceNode.width > targetNode.x) {
        edge.sourceAnchor = sourceFieldIndex * 2 + 1
        edge.targetAnchor = targetFieldIndex * 2 + 1
      } else {
        edge.sourceAnchor = sourceFieldIndex * 2 + 1
        edge.targetAnchor = targetFieldIndex * 2
      }
      g.setEdge(source, target)
    })
    dagre.layout(g)
    g.nodes().forEach((v) => {
      const node = g.node(v)
      nodeMap[v].x = node.x
      nodeMap[v].y = node.y
    })
    g.edges().forEach((e, i) => {
      const edge = g.edge(e)
      if (useEdgeControlPoint) {
        edges[i].controlPoints = edge.points.slice(1, edge.points.length - 1)
      }
    })
  }
}

export default Layout
