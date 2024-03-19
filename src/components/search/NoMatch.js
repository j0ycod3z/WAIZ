import * as React from 'react';
import c from 'resources/css/search/Search.module.css';
import cx from 'classnames';

class NoMatch extends React.Component{
  render(){
    return(
      <div className={c.noMatch}>
        <h1 className={c.title}>There are no matches for<br/>"Leads"</h1>
        <h2 className={c.subtitle}>Try with another term or use advanced search</h2>
      </div>
    )
  }
}

export default NoMatch
