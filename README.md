## 基于g6的数据库表关系生成图插件

## API

### create
用于创建一个关系图
```
  ReGraph.create(options)
```
#### options:
```javascript
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
 * 默认是直线，可选：polyline, polyline-round（直角折线，圆角折线）
 * @type {string}
 */
edgeType: 'default',
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
    originColor: '', // 标示鼠标离开焦点恢复原始颜色，所以一般情况不设置该项
    targetColor: '',
    sourceColor: '',
  },
},
/**
 * 节点点击事件，参数是node id
 * @type {function}
 */
nodeClick: null,
```

### destroy
销毁关系图
```
  ReGraph.destroy()
```

### read
读取数据（如果options中有data，这个可以不用使用）
```
  ReGraph.read(data)
```

### Utils
工具类

 - 列表项

formatData：执行read(data)前需要格式化data数据，将原始数据列表中对象key值映射到插件数据格式上（如果原始数据和所需格式一样，则不需要转换）
```javascript
  // 不使用该方法需要提供如下格式
  {
    nodes: [{
      id, label, fields
    }],
    edges: [{
      id, target, source, target_field, source_field
    }],
  }
  // 只有关系数据可以使用该方法转换成以上格式
  const formattedData = ReGraph.Utils.formatData(data, {
    id: 'id',
    target: 'target_table_id',
    target_name: 'target_table',
    target_field: 'target_field',
    source: 'source_table_id',
    source_name: 'source_table',
    source_field: 'source_field',
  })
```