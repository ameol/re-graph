import G6 from '@antv/g6'

export default function ({ originColor, targetColor, sourceColor, beforeEnter, beforeLeave }) {
  G6.registerBehaviour('mouseEnterHighlightRelation', (graph) => {
    graph.behaviourOn('node:mouseenter', (ev) => {
      if (typeof beforeEnter === 'function') {
        beforeEnter(ev.item, graph)
      }
      const { edges, id } = ev.item
      edges.forEach((item) => {
        if (item.target.id === id && targetColor) {
          graph.update(item.id, {
            color: targetColor || 'red',
          })
        } else if (item.source.id === id && sourceColor) {
          graph.update(item.id, {
            color: sourceColor,
          })
        }
      })
    })
  })
  G6.registerBehaviour('mouseLeaveResetRelation', (graph) => {
    graph.behaviourOn('node:mouseleave', (ev) => {
      if (typeof beforeLeave === 'function') {
        beforeLeave(ev.item, graph, originColor || '#AAB7C4')
      }
      const { edges } = ev.item
      edges.forEach((item) => {
        graph.update(item.id, {
          color: originColor || '#AAB7C4',
        })
      })
    })
  })
}
