import React, { useState, useEffect } from 'react'
import redux from 'seed/redux';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { Link } from 'react-router-dom'

import c from 'resources/css/search/Search.module.css';

function Users(props) {
  const { match, getUserList, getProfileList } = props;

  const [users, setUsers] = useState(null);
  const [profiles, setProfiles] = useState([]);

  const safeUsers = users ? users : [];
  
  useEffect(() => {
    getUserList({ "first_name.icontains": match.params.search }, (res) => setUsers(res.body));
    getProfileList({ "user.first_name.icontains": match.params.search }, (res) => setProfiles(res.body));
  }, [match.params.search, getUserList, getProfileList]);
  
  return (
    <>
      <h4>{lcs("users")}</h4>
      <div className={c.resultsList}>
        {safeUsers.map((user) => {
          const profile = profiles.find(p => p.user_id === user.id);
          return (
            <div key={user.id} className={c.searchCard}>
              <Link to={`/app/profile/${user.id}`} className='flex-row'>
                <div className={c.imgUser}>
                  <img src={user.image_url} alt={user.usename} />
                </div>
                <div className={cx('d-flex', 'flex-column', 'justify-content-center')} style={{gap: '8px'}}>
                  <h3 className={c.cardTitle} style={{textTransform: 'capitalize'}}>
                    {`${user.first_name} ${user.last_name}`}
                  </h3>
                  {profile?.country &&
                    <div className={c.compoundSubtitle}>
                      <div className={c.ring} />
                        <p className={c.subtitle}>
                          {profile.country.toLowerCase()}
                        </p>
                    </div>
                  }
                </div>
              </Link>
            </div>
          )
        })}
        {(users && safeUsers.length === 0) && 
          <div>{lcs("no_results")}</div>
        }
      </div>
    </>
  )
}

export default redux(Users);