module.exports = function(knex){
  
    async function getResources(entity_id, entity) {
      return (
        await knex('resource_relations')
          .join('resources', 'resource_relations.resource_id', 'resources.id')
          .select('resources.id', 'resources.name', 'resources.url', 'resources.type', 'resources.created_at')
          .where({'resource_relations.entity_id': Number(entity_id), "resource_relations.entity_type": entity})
      );
    }

    function add(cb, resource, entity_type, entity_id) {
      knex.transaction(function(trx) {
        knex.insert(resource, 'id')
          .into('resources')
          .transacting(trx)
          .then(function(id) {
            const relation = {
              entity_type,
              entity_id,
              resource_id: id[0]
            }
            resource.id = id[0]

            knex('resource_relations').insert(relation).transacting(trx)
            .then(trx.commit)
            .catch(() => {trx.rollback(), cb("rolled back",null)})
            .then(cb(null, resource));
          })
      })
    }

    return {
      add,
      getResources
    }
  }
