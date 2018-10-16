import G6 from '@antv/g6'

export default function ({ originColor, targetColor, sourceColor }) {
  G6.registerBehaviour('mouseEnterHighlightRelation', (graph) => {
    graph.behaviourOn('node:mouseenter', (ev) => {
      const { edges, id } = ev.item
      edges.forEach((item) => {
        if (item.target.id === id) {
          graph.update(item.id, {
            color: targetColor || 'red',
          })
        } else if (item.source.id === id) {
          graph.update(item.id, {
            color: sourceColor || '#FE2EF7',
          })
        }
      })
    })
  })
  G6.registerBehaviour('mouseLeaveResetRelation', (graph) => {
    graph.behaviourOn('node:mouseleave', (ev) => {
      const { edges } = ev.item
      edges.forEach((item) => {
        graph.update(item.id, {
          color: originColor || '#AAB7C4',
        })
      })
    })
  })
}
