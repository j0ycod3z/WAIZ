import { useState, useEffect } from "react";
import redux from 'seed/redux';
import cx from "classnames";
import About from "components/navigation/About"
import Modal from "seed/components/helpers/Modal"
import { Link, Route } from 'react-router-dom'
import { lcs, lc } from 'components/util/Locales'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Caption from 'components/helpers/Caption';

import c from 'resources/css/navigation/TopNav.module.css';

function TopNav(props) {
  const {
    projects,
    canvases,
    users,
    match,
    history,
    sidenav,
    getUserDetails,
    onBurgerClick
  } = props;
  const { url, params } = match;
  const { section_id, canvas_id, project_id } = params;

  const [showAbout, setShowAbout] = useState(false);
  const [optionMenu, setOptionMenu] = useState(null);

  const userId = sessionStorage.getItem("id");
  const user = users.find((u) => u.id == userId);

  useEffect(() => {
    const callback = (res) => {
      if (!res.ok) return false;
      sessionStorage.setItem("lang", res.body.lang);
    };
    getUserDetails(userId, callback);
  }, [getUserDetails, userId]);
  
  let projectName = "";
  let sectionName = "";
  if (canvas_id != null) {
    const canvas = canvases.find((canv) => canv.id == canvas_id);

    if (canvas.id != null) {
      const project = projects.find((proj) => proj.id == canvas.project_id);
      sectionName = lc(canvas.type.l_name);

      if (project.id != null) projectName = `${project.name}  /  `;
    }
  }
  else if (project_id != null) {
    const project = projects.find(() => proj.id == project_id);

    if (section_id == "project_profile") sectionName = lcs("project_profile");
    else if (section_id == "interviews") sectionName = lcs("interviews");
    else if (section_id == "incubation_acceleration") sectionName = lcs("incubation_acceleration")
    
    if (project.id != null) projectName = `${project.name}  /  `;
  }
  else {
    if (section_id == "profile") sectionName = lcs("your_profile")
    else if (section_id == "search") sectionName = lcs("search_noun")
    else if (section_id == "settings") sectionName = lcs("settings")
    else if (url.includes("profile")) sectionName = lcs("profile")
    else if (url.includes("dashboards")) sectionName = lcs("dashboards")
    else if (url.includes("project_admin")) sectionName = lcs("project_admin")
    else if (url.includes("knowledge_base")) sectionName = lcs("knowledge_base");
  }

  const AboutModal = () => (
    <Modal
      {...props}
      onClose={() => setShowAbout(false)}
      width={350}
      height={185}
    >
      <About />
    </Modal>
  );

  const openOptionMenu = (e) => setOptionMenu(e.currentTarget);
  const closeOptionMenu = () => setOptionMenu(null);

  const onEnterSearch = (e) => {
    const value = e.currentTarget.value;
    if (e.key === "Enter") {
      e.currentTarget.value = "";
      history.push(`/app/search/${value}`);
    }
  };

  const onClickProfile = (e) => {
    history.push(`/app/profile/${sessionStorage.getItem("id")}`);
    closeOptionMenu(e);
  };

  const onClickSettings = (e) => {
    history.push("/app/settings");
    closeOptionMenu(e);
  };

  const onClickAbout = () => {
    setShowAbout(true);
  };

  const onClickLogout = (e) => {
    history.push("/logout");
    closeOptionMenu(e);
  };
  
  return (
    <div className={c.module}>
      <div className={c.container}>
        <div className={c.left}>
          {sidenav ? null : (
            <div className={cx(c.flexColumn)}>
              <a onClick={onBurgerClick}>
                <i style={{ fontSize: "16px" }} className="fas fa-bars" />
              </a>
            </div>
          )}
          <div className={cx(c.flexColumn)}>
            <div className={cx(c.element)}>
              <h3 className={c.title}>
                {projectName}<span className={c.subtitle}>{sectionName}</span>
              </h3>
            </div>
          </div>
        </div>

        <div className={c.right}>
          <div className={cx(c.flexColumn)}>
            <div className={c.element}>
              <div className={c.search}>
                <i className="fas fa-search" />
                <input type="text" placeholder={lcs("search")} onKeyDown={onEnterSearch}></input>
              </div>
            </div>
          </div>

          {/*<div className={cx(c.flexColumn)}>
            <div className={c.element}>
              <Link to="/app/notifications">
                <Caption text={lcs("notifications")} onTop={false}>
                  <i className="fas fa-bell" />
                </Caption>
              </Link>
            </div>
          </div>*/}

          <div className={cx(c.flexColumn)}>
            <div className={c.element}>
              <Link to="/app/knowledge_base/0">
                <Caption text={lcs("knowledge_base")} onTop={false} maxLen={21}>
                  <i className="fas fa-book-open" />
                </Caption>
              </Link>
            </div>
          </div>

          <div className={cx(c.button)} onClick={openOptionMenu}>
            <div className={cx(c.flexColumn)}>
              {user.image_url != null &&
                <label
                  className={cx(c.teamImage, c.profileImage, c.smallImage)}
                  style={{ backgroundImage: `url("${user.image_url}")` }}
                  alt="profileImage"
                />
              }
            </div>
            <div className={cx(c.flexColumn, c.userName)}>
              <span>
                {user.first_name}
                <i className="fas fa-caret-down"></i>
                </span>
            </div>
          </div>
          <Menu
            anchorEl={optionMenu}
            open={Boolean(optionMenu)}
            onClose={closeOptionMenu}
          >
            <MenuItem onClick={onClickProfile}>{lcs("your_profile")}</MenuItem>
            <MenuItem onClick={onClickSettings}>{lcs("settings")}</MenuItem>
            <MenuItem onClick={onClickAbout}>{lcs("about")}</MenuItem>
            <MenuItem onClick={onClickLogout}>{lcs("logout")}</MenuItem>
          </Menu>
        </div>
      </div>

      {showAbout && <AboutModal />}
    </div>
  );
}

export default redux(TopNav);
