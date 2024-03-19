import Action from 'seed/helpers/action'

class Stats extends Action
{
  constructor()
  {
    super(
      `STATS`,
      `stats`,
      state => state.stats
    )
  }

  getStats(path, filters, callback)
  {
    let query = '';
    for (let filter in filters)
      if (filters[filter] != null)
        query += `${filter}=${filters[filter]}&`;

    return this.request(
      'GET', `${path}`, query,
      {}, callback, null);
  }
}

export default Stats;