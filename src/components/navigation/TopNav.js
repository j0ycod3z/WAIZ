import * as React from "react";
import * as Util from "seed/util"
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

class TopNav extends React.Component
{
  render()
  {
    const { projects, canvases } = this.props;

    const userId = sessionStorage.getItem('id');
    const user = Util.get(this.props.users, userId);

    const { url } = this.props.match;
    const { optionMenu } = this.state;
    const { section_id, canvas_id, project_id } = this.props.match.params;

    let projectName = "";
    let sectionName = "";
    if (canvas_id != null) {
      const canvas = Util.get(canvases, canvas_id);
      if (canvas.id != null) {
        const project = Util.get(projects, canvas.project_id);
        sectionName = lc(canvas.type.l_name);
        if (project.id != null)
          projectName = project.name + "  /  ";
      }
    } else if (project_id != null) {
      const project = Util.get(projects, project_id);
      if (section_id == "project_profile") sectionName = lcs("project_profile");
      else if (section_id == "interviews") sectionName = lcs("interviews");
      else if (section_id == "incubation_acceleration") sectionName = lcs("incubation_acceleration")
      if (project.id != null)
        projectName = project.name + "  /  ";
    } else {
      if (section_id == "profile") sectionName = lcs("your_profile")
      else if (section_id == "search") sectionName = lcs("search_noun")
      else if (section_id == "settings") sectionName = lcs("settings")
      else if (url.includes("profile")) sectionName = lcs("profile")
      else if (url.includes("dashboards")) sectionName = lcs("dashboards")
      else if (url.includes("project_admin")) sectionName = lcs("project_admin")
      else if (url.includes("knowledge_base")) sectionName = lcs("knowledge_base");
    }

    const AboutModal = props => (
      <Modal
        {...this.props}
        onClose={() => this.setState({ showAbout: false })}
        width={350}
        height={185}>
        <About />
      </Modal>
    );


    return (
      <div className={c.module}>
        <div className={c.container}>
          <div className={c.left}>
            {this.props.sidenav ? null : (
              <div className={cx(c.flexColumn)}>
                <a onClick={this.props.onBurgerClick}>
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
                  <input type="text" placeholder={lcs("search")} onKeyDown={this.onEnterSearch}></input>
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

            <div className={cx(c.button)} onClick={this.openOptionMenu}>
              <div className={cx(c.flexColumn)}>
                {user.image_url != null ?
                  <label
                    className={cx(c.teamImage, c.profileImage, c.smallImage)}
                    style={{ backgroundImage: `url("${user.image_url}")` }}
                    alt="profileImage" /> : null}
              </div>
              <div className={cx(c.flexColumn, c.userName)}>
                <span>{user.first_name}<i className="fas fa-caret-down"></i></span>
              </div>
            </div>
            <Menu
              anchorEl={optionMenu}
              open={Boolean(optionMenu)}
              onClose={this.closeOptionMenu}>
              <MenuItem onClick={this.onClickProfile}>{lcs("your_profile")}</MenuItem>
              <MenuItem onClick={this.onClickSettings}>{lcs("settings")}</MenuItem>
              <MenuItem onClick={this.onClickAbout}>{lcs("about")}</MenuItem>
              <MenuItem onClick={this.onClickLogout}>{lcs("logout")}</MenuItem>
            </Menu>
          </div>
        </div>

        {this.state.showAbout ? <AboutModal /> : null}

      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      sidenav: props.sidenav,
      showAbout: false,
      optionMenu: null
    };

    this.openOptionMenu = this.openOptionMenu.bind(this);
    this.closeOptionMenu = this.closeOptionMenu.bind(this);
    this.onEnterSearch = this.onEnterSearch.bind(this);
    this.onClickProfile = this.onClickProfile.bind(this);
    this.onClickSettings = this.onClickSettings.bind(this);
    this.onClickAbout = this.onClickAbout.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  componentDidMount()
  {
    const userId = sessionStorage.getItem('id');
    const callback = (res) =>
    {
      if (!res.ok) return false;
      sessionStorage.setItem('lang', res.body.lang);
    }
    this.props.getUserDetails(userId, callback);
  }

  openOptionMenu(e)
  {
    this.setState({ optionMenu: e.currentTarget });
  };

  closeOptionMenu(e)
  {
    this.setState({ optionMenu: null });
  };

  onEnterSearch(e)
  {
    let value = e.currentTarget.value;
    if (e.key === 'Enter') {
      e.currentTarget.value = "";
      this.props.history.push("/app/search/" + value)
    }
  }

  onClickProfile(e)
  {
    this.props.history.push("/app/profile/" + sessionStorage.getItem('id'))
    this.closeOptionMenu(e)
  }

  onClickSettings(e)
  {
    this.props.history.push("/app/settings")
    this.closeOptionMenu(e)
  }

  onClickAbout(e)
  {
    this.setState({ showAbout: true });
  }

  onClickLogout(e)
  {
    this.props.history.push("/logout")
    this.closeOptionMenu(e)
  }
}

export default redux(TopNav);
