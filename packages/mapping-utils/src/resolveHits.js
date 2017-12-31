import getFields from 'graphql-fields'
import buildQuery from './buildQuery'

let joinParent = (parent, field) => (parent ? `${parent}.${field}` : field)

let resolveNested = ({ node, nested_fields, parent = '' }) => {
  return Object.entries(node)
    .filter(([field]) => nested_fields.includes(joinParent(parent, field)))
    .reduce((acc, [field, hits]) => {
      // TODO: inner hits query if necessary
      return {
        ...acc,
        [field]: {
          hits: {
            edges: hits.map(node => ({
              node: {
                ...node,
                ...resolveNested({
                  node,
                  nested_fields,
                  parent: joinParent(parent, field),
                }),
              },
            })),
            total: hits.length,
          },
        },
      }
    }, {})
}

export default type => async (
  obj,
  { first = 10, offset = 0, filters, score, sort },
  { es },
  info,
) => {
  let fields = getFields(info)
  let nested_fields = type.nested_fields

  let query = filters || {}

  if (filters || score) {
    let response = await buildQuery({ type, filters, score, nested_fields })
    query = response.query
  }

  let body = {
    query,
  }

  if (sort) {
    // TODO: build sort properly
    body.sort = [
      {
        'summary.case_count': {
          missing: '_last',
          order: 'desc',
          mode: 'min',
        },
      },
    ]
  }

  let { hits } = await es.search({
    index: type.index,
    type: type.es_type,
    size: first,
    from: offset,
    _source: fields.edges && Object.keys(fields.edges.node),
    track_scores: !!score,
    body,
  })

  let nodes = hits.hits.map(x => {
    let source = x._source
    let nested_nodes = resolveNested({
      node: source,
      nested_fields,
    })
    return { id: x._id, ...source, ...nested_nodes }
  })

  return {
    hits: nodes,
    total: hits.total,
  }
}
