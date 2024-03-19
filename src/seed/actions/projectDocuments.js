/*
__Seed builder__v1.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from 'seed/helpers/action';

class _ProjectDocuments extends Action
{
  constructor(fetch)
  {
    if (fetch == null)
      fetch = [
        "project_detail.*",
      ];

    super(
      `PROJECT_DOCUMENTS`,
      `project_documents`,
      state => state.projectDocuments,
      fetch
    )
  }

  getProjectDocumentList(params = {}, callback)
  {
    return this.getList('', params, callback);
  }

  getProjectDocumentDetails(projectDocumentId, callback)
  {
    return this.getDetails(projectDocumentId, '', callback);
  }

  saveProjectDocument(projectDocument, callback)
  {
    return this.saveData('', projectDocument, callback);
  }

  setProjectDocument(projectDocumentId, projectDocument, callback)
  {
    return this.setData(projectDocumentId, '', projectDocument, callback);
  }

  deleteProjectDocument(projectDocumentId, callback)
  {
    return this.deleteData(projectDocumentId, '', callback);
  }
}

export default _ProjectDocuments;
