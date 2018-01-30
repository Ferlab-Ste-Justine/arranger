import { flattenDeep } from 'lodash';
import mapHits from '../utils/mapHits';

export default async (req, res) => {
  let { es } = req.context;
  let { id, index, field } = req.params;
  let { key, value } = req.body;

  if (!id || !index || !field) return res.json({ error: 'missing fields' });

  // indices must be lower cased
  id = id.toLowerCase();
  index = index.toLowerCase();
  field = field.toLowerCase();

  try {
    await es.update({
      index: `arranger-projects-${id}-${index}`,
      type: `arranger-projects-${id}-${index}`,
      refresh: true,
      id: field,
      body: {
        doc: {
          [key]: value,
        },
      },
    });
  } catch (error) {
    res.json({ error: error.message });
  }

  let fields = [];

  try {
    fields = await es.search({
      index: `arranger-projects-${id}-${index}`,
      type: `arranger-projects-${id}-${index}`,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }

  res.json({ fields: mapHits(fields), total: fields.hits.total });
};