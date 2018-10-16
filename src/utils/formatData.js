/**
 * 格式化初始化的数据，将单组数据转换成{nodes: [], edges: []}
 */
export default function formatData (relationData, map) {
  const objs = {}
  const edges = relationData.map((item) => {
    item = {
      id: `edge_${item[map.id]}`,
      target: String(item[map.target]),
      source: String(item[map.source]),
      target_name: String(item[map.target_name]).replace(/\t\r\n/g, ''),
      source_name: String(item[map.source_name]).replace(/\t\r\n/g, ''),
      target_field: String(item[map.target_field]).replace(/\t\r\n/g, ''),
      source_field: String(item[map.source_field]).replace(/\t\r\n/g, ''),
    }
    objs[item.target] = objs[item.target] || {}
    objs[item.target].name = item.target_name
    objs[item.target].fields = objs[item.target].fields || new Set()

    objs[item.source] = objs[item.source] || {}
    objs[item.source].name = item.source_name
    objs[item.source].fields = objs[item.source].fields || new Set()

    objs[item.target].fields.add(item.target_field)
    objs[item.source].fields.add(item.source_field)
    return item
  })
  const nodes = Object.keys(objs).map((key) => {
    return {
      id: key,
      label: objs[key].name,
      fields: Array.from(objs[key].fields),
    }
  })
  return {
    nodes,
    edges,
  }
}
