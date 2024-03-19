import React from 'react'
import redux from 'seed/redux';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { Link } from 'react-router-dom'

import c from 'resources/css/search/Search.module.css';

class Users extends React.Component
{
  render()
  {
    const users = this.state.users ? this.state.users : [];
    const profiles = this.state.profiles;


    return (
      <div className={c.users}>
        <h3 className={c.cardsTitle}>{lcs("users")}</h3>
        {
          users.map(user =>
          {
            let profile = profiles.filter(p => p.user_id == user.id)[0];
            return (
              <Link to={`/app/profile/${user.id}`} style={{ textDecoration: "none" }}>
                <div className={c.searchCard} key={user.id}>
                  <div className={c.imgUser}>
                    <img src={user.image_url} alt={user.usename} />
                  </div>
                  <div className={c.searchCardInfo}>
                    <h3 className={c.cardTitle}>{user.first_name} {user.last_name}</h3>
                    <div className={c.compoundSubtitle}>
                      <div className={c.ring}></div>
                      <h4 className={c.subtitle}>{profile ? profile.country.toLowerCase() : ""}</h4>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        }
        {this.state.users && users.length == 0 ?
          <div>{lcs("no_results")}</div> : null}
      </div>
    )
  }

  constructor(props)
  {
    super(props);
    this.state = { users: null, profiles: [] }
  }

  componentDidMount()
  {
    const { search } = this.props.match.params;
    const callback = res =>
      this.setState(s => ({ users: res.body }));
    this.props.getUserList({
      "first_name.icontains": search
    }, callback);

    const callback1 = res =>
      this.setState(s => ({ profiles: res.body }));
    this.props.getProfileList({
      "user.first_name.icontains": search
    }, callback1);

  }
}

export default redux(Users);
