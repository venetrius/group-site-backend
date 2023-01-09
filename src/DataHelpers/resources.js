module.exports = function(knex){
  
    async function getResources(entity_id, entity) {
      return (
        await knex('resource_relations')
          .join('resources', 'resource_relations.resource_id', 'resources.id')
          .select('resources.id', 'resources.name', 'resources.url', 'resources.type', 'resources.created_at')
          .where({'resource_relations.entity_id': Number(entity_id), "resource_relations.entity_type": entity})
      );
    }
    return {
      getResources,
    }
  }
