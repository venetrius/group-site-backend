module.exports = function(knex){

  //==============================================
  //       GET USER - By Id, username, email
  //==============================================
    
    function getProjects(cb) {
      knex.select('*').from('projects')
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
      addProject
    }
  
  }