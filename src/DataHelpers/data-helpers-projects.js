module.exports = function(knex){

    function getProjects(cb) {
      knex.select('*').from('projects')
        .asCallback(function(err, projects) {
          if (err) {
            cb(err);
          }
          cb(null, projects)
        });
    }

    function getProject(projectId, cb) {
      knex.select('*').from('projects')
        .where('id', projectId)
        .asCallback(function(err, projects) {
          if (err) {
            cb(err);
          }
          cb(null, projects)
        });
    }

    function addProject(cb, project) {
      knex('projects')
      .insert(project)
      .returning('*')
      .asCallback(function(err, projects) {
          if (err) {
            cb(err);
          }
          cb(null, projects)
        });
    }

    return {
      getProjects,
      getProject,
      addProject
    }

  }
