import G6 from '@antv/g6'

function initNode () {
  const itemWidth = 100
  G6.registerNode('reNode', {
    draw (item) {
      const group = item.getGraphicGroup()
      const model = item.getModel()
      const fieldsHeight = model.fields.length * 20 + 10
      // 绘制头部，上方圆角
      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: itemWidth,
          height: 26,
          fill: '#619dee',
          stroke: '#619dee',
          radius: [4, 4, 0, 0],
        },
      })
      // 绘制头部文本
      group.addShape('text', {
        attrs: {
          x: 10,
          y: 19,
          width: 70,
          fill: '#fff',
          fontSize: 11,
          text: model.label.length > 8 ? `${model.label.slice(0, 7)}...` : model.label,
        },
      })
      // 绘制主体部分
      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 26,
          width: itemWidth,
          height: fieldsHeight,
          stroke: '#619dee',
          fill: '#fff',
          radius: [0, 0, 4, 4],
        },
      })

      if (model.fields && model.fields.length) {
        model.fields.forEach((text, i) => {
          group.addShape('text', {
            attrs: {
              x: 10,
              y: 41 + 20 * i, // 第一个中轴线是26 + 10 + 5，第二个（26+10+5）+（5+10+5）
              text,
              fontSize: 12,
              textBaseline: 'middle',
              fill: '#666',
            },
          })
        })
      }

      return group
    },
    anchor: {
      intersectBox: 'rect',
      points: (item) => {
        const model = item.getModel()
        const fieldsHeight = model.fields.length * 20 + 10
        const anchors = []
        for (let i = 0; i < model.fields.length; i++) {
          const pointY = (41 + 20 * i) / (26 + fieldsHeight)
          anchors.push([0, Math.fround(pointY)])
          anchors.push([1, Math.fround(pointY)])
        }
        return anchors
      },
    },
  })
}

export default initNode
