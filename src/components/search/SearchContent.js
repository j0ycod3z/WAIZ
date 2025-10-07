import React from 'react'
import cx from 'classnames';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import { LocationOn, People, Timeline } from '@mui/material/icons';

import Projects from './Projects';
import Users from './Users';

import c from 'resources/css/search/SearchComponent.module.css';

// function SearchContent(props) {
//   const currentPath = props.location.pathname;
//   const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));

//   return (
//     <div className={c.module}>
//       <div>
//         <p className={c.resultsTitle}>Showing results for "Leads"</p>
//       </div>
//       <div className={c.searchBodyInner}>
//         <div className={c.searchBodyFilters}>
//           <Routes>
//             <Route path='/search/projects' render={() => (
//               <div>
//                 <p className={c.filtersTitle}>Industry</p>
//                 <div>
//                   <NavLink activeClassName={c.active} className={c.btn} exact to='/search/projects'>All</NavLink>
//                   <NavLink activeClassName={c.active} className={c.btn} to='/search/projects/automotive'>Automotive</NavLink>
//                   <NavLink activeClassName={c.active} className={c.btn} to='/search/projects/communications'>Communications</NavLink>
//                   <NavLink activeClassName={c.active} className={c.btn} to='/search/projects/technology'>Technology</NavLink>
//                 </div>
//               </div>
//             )} />
//             <Route path='/search/users' render={() => (
//               <div>
//                 <p className={c.filtersTitle}>Skills</p>
//                 <div>
//                   <NavLink activeClassName={c.active} className={c.btn} exact to='/search/users'>All</NavLink>
//                   <NavLink activeClassName={c.active} className={c.btn} to='/search/users/sales'>Sales</NavLink>
//                   <NavLink activeClassName={c.active} className={c.btn} to='/search/users/engineering'>Engineering</NavLink>
//                   <NavLink activeClassName={c.active} className={c.btn} to='/search/users/management'>Management</NavLink>
//                 </div>
//               </div>
//             )} />
//           </Routes>
//         </div>
//         <div className={c.searchBodyResults}>
//           <div className={c.typeButtons}>
//             <NavLink activeClassName={c.active} to='/search/projects' className={c.btn}><span><Timeline /></span>Projects</NavLink>
//             <NavLink activeClassName={c.active} to='/search/users' className={c.btn}><span><People /></span> Users</NavLink>
//           </div>
//           <Routes>
//             <Route path='/search/projects' component={Projects} />
//             <Route path='/search/users' component={Users} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

function SearchContent() {
  const location = useLocation();
  const currentPath = location.pathname;
  const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));

  return (
    <div className={c.module}>
      <div>
        <p className={c.resultsTitle}>Showing results for "Leads"</p>
      </div>
      <div className={c.searchBodyInner}>
        <div className={c.searchBodyFilters}>
          {currentPath.startsWith('/search/projects') && (
            <div>
              <p className={c.filtersTitle}>Industry</p>
              <div>
                <NavLink to='/search/projects' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })} end>All</NavLink>
                <NavLink to='/search/projects/automotive' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })}>Automotive</NavLink>
                <NavLink to='/search/projects/communications' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })}>Communications</NavLink>
                <NavLink to='/search/projects/technology' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })}>Technology</NavLink>
              </div>
            </div>
          )}
          {currentPath.startsWith('/search/users') && (
            <div>
              <p className={c.filtersTitle}>Skills</p>
              <div>
                <NavLink to='/search/users' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })} end>All</NavLink>
                <NavLink to='/search/users/sales' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })}>Sales</NavLink>
                <NavLink to='/search/users/engineering' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })}>Engineering</NavLink>
                <NavLink to='/search/users/management' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })}>Management</NavLink>
              </div>
            </div>
          )}
        </div>
        <div className={c.searchBodyResults}>
          <div className={c.typeButtons}>
            <NavLink to='/search/projects' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })}><span><Timeline /></span>Projects</NavLink>
            <NavLink to='/search/users' className={({ isActive }) => cx(c.btn, { [c.active]: isActive })}><span><People /></span> Users</NavLink>
          </div>
          <Routes>
            <Route path='/search/projects/*' element={<Projects />} />
            <Route path='/search/users/*' element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default SearchContent;