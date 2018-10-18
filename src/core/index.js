import G6 from '@antv/g6'
import '@antv/g6/build/plugin.tool.minimap'
import '@antv/g6/build/plugin.edge.polyline'
import '@antv/g6/build/plugin.behaviour.analysis'
import '@antv/g6/build/plugin.tool.tooltip'
import deepmerge from 'deepmerge'
import ReLayout from '../layout'
import initNode from './initNode'
import highlightRelation from '../behaviour/highlightRelation'

export default class Instance {
  _getDefaults () {
    return {
      /**
       * 容器id
       * @type {string}
       */
      container: '',
      /**
       * 数据({nodes: [], edges: []})
       * @type {array}
       */
      data: {},
      /**
       * 画布宽度
       * @type {number}
       */
      width: 0,
      /**
       * 画布高度
       * @type {number}
       */
      height: 0,
      /**
       * 默认是直线，type可选：polyline, polyline-round（直角折线，圆角折线）
       * @type {string}
       */
      edgeCfg: {
        shape: 'default',
        // color: '#AAB7C4', //设置颜色节点hover，高亮关系线功能失效
      },
      /**
       * 是否支持缩略图
       * @type {boolean}
       */
      enableMinimap: true,
      /**
       * 缩略图配置
       * @type {boolean}
       */
      minimapCfg: {
        container: '',
        width: 180,
        height: 120,
      },
      /**
       * 是否支持拖拽画布来平移画布
       * @type {boolean}
       */
      enablePanBlank: true,
      /**
       * 是否支持缩放
       * @type {boolean}
       */
      enableZoom: true,
      /**
       * 控制允许的交互
       * @type {array}
       */
      allowBehaviours: ['mouseEnterHighlightRelation', 'mouseLeaveResetRelation'],
      /**
       * 交互的配置相关
       * @type {array}
       */
      behavioursCfg: {
        highlight: {
          targetColor: '',
          sourceColor: '',
          beforeEnter: null,
          beforeLeave: null,
        },
      },
      /**
       * 设置节点tooltip内容
       * @type {function}
       * @param model
       * @param originalData
       */
      ToolTipFormatter: null,
      /**
       * 节点点击事件
       * @type {function}
       * @param item
       */
      nodeClick: null,
    }
  }

  constructor (options) {
    const defaults = this._getDefaults()
    this.opts = deepmerge(defaults, options)
    this._createG6Gragh()
    this._init()
    this._initEvent()
  }

  _createG6Gragh () {
    const { container, width, height, enableMinimap, minimapCfg, enablePanBlank, enableZoom, allowBehaviours } = this.opts
    const plugins = [new ReLayout()]
    const modesDefault = []
    if (enableMinimap) {
      const Mini = G6.Plugins['tool.minimap']
      plugins.push(new Mini(minimapCfg))
    }
    const ToolTip = G6.Plugins['tool.tooltip']
    plugins.push(new ToolTip())

    if (enablePanBlank) {
      modesDefault.push('panBlank')
    }
    if (enableZoom) {
      modesDefault.push('wheelZoom')
    }
    // 初始化行为操作
    this._initBehaviours()
    // 初始化画布
    this.graph = new G6.Graph({
      container,
      plugins,
      fitview: 'autoZoom',
      width,
      height,
      modes: {
        default: modesDefault.concat(allowBehaviours),
      },
    })
  }

  _init () {
    const { edgeCfg, data, ToolTipFormatter } = this.opts
    initNode()
    this.graph.node({
      shape: 'reNode',
      tooltip (model) {
        const toolTipArr = typeof ToolTipFormatter === 'function' ? ToolTipFormatter(model) : [[['表名', model.label]]]
        return {
          title: '',
          list: toolTipArr,
        }
      },
    })
    this.graph.edge(edgeCfg)
    if (data) {
      this.graph.read(data)
    }
  }

  _initEvent () {
    this.graph.on('click', (ev) => {
      if (ev.item && ev.item.type === 'node' && this.opts.nodeClick) {
        this.opts.nodeClick(ev.item)
      }
    })
  }

  _initBehaviours () {
    const { highlight } = this.opts.behavioursCfg
    const { color } = this.opts.edgeCfg
    highlightRelation({ ...highlight, originColor: color } || {})
  }

  readData (data) {
    this.data = data
    this.graph.read(data)
  }
}
