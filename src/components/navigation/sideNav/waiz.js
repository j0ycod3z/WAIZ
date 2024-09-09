import * as React from 'react';
import redux from 'seed/redux';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import c from "resources/css/navigation/sideNav/waiz.module.css";


class waiz extends React.Component
{
  render()
  {
     
        return (
          <div className={c.element}>
            <Link to={`https://app.gamechangerfunnel.com`}>
              <a href="#">
                GCF
              </a>
              <p style={{ color: "#777" }}></p>
            </Link>
          </div>);
      }
   

  
}
export default redux(waiz);