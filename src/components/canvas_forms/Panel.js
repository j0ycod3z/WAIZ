import * as React from 'react';
import redux from 'seed/redux';

import { NavLink, Link } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Area from 'components/canvas/Area'
import Insights from 'components/canvas_forms/Insights'
import DeepDive from 'components/canvas_forms/DeepDive'
import Comments from 'components/canvas_forms/Comments'
import Help from 'components/canvas_forms/Help'

import Modal from 'seed/components/helpers/Modal';
import HypothesisForm from 'components/canvas_forms/Hypothesis';

import c from 'resources/css/canvas_forms/Panel.module.css'
import { lcs, lc } from "components/util/Locales"


class Panel extends React.Component
{
  render()
  {
    const { url } = this.props.match;
    const { path } = this.props.match;
    const { area_id, canvas_id } = this.props.match.params;
    const { canvases = [], hypotheses = [] } = this.props;
    const { anchorMenu } = this.state;

    let canvas = canvases.filter(canvas => canvas.id == canvas_id)[0];
    let canvasType = this.props.canvasTypes.filter(type => type.id == canvas.type.id)[0];
    let area = { category: "" };
    let areas = null;
    let areaName = ""
    if (canvas != null && canvasType != null) {
      area = canvasType.areas.filter(a => a.id == area_id)[0];
      areas = canvasType.areas.map(a =>
        <Link to={`/app/c/${canvas_id}/area/${a.id}`} onClick={this.closeMenu}>
          <MenuItem>{
            a.category.startsWith("BLANK") && lc(a.l_name) == "" ?
              lcs("area") + " " + a.category.slice(-1) :
              lc(a.l_name)
          }</MenuItem>
        </Link>);
      areaName = area.category.startsWith("BLANK") && lc(area.l_name) == "" ?
        lcs("area") + " " + area.category.slice(-1) :
        lc(area.l_name);
    } else
      canvas = {};

    let hypothesis = hypotheses.filter(h => h.canvas_id == canvas_id && h.area_id == area_id);

    const hypothesisForm = props =>
      <Modal
        match={props.match}
        onClose={this.onModalClose}
        width={470}
        height={500}>
        <HypothesisForm />
      </Modal>

    return (
      <div className={c.module}>
        <Switch>
          <Route exact path={`${url}/insights`}
            render={() => <div className={c.headerBackground + " " + c.insights}></div>} />
          <Route path={`${url}/deepdive`}
            render={() => <div className={c.headerBackground + " " + c.deepdive}></div>} />
          <Route path={`${url}/comments`}
            render={() => <div className={c.headerBackground + " " + c.comments}></div>} />
          <Route path={`${url}/help`}
            render={() => <div className={c.headerBackground + " " + c.help}></div>} />
          <Route path={`${url}`}
            render={() => <div className={c.headerBackground + " " + c.insights}></div>} />
        </Switch>

        <div className={c.header}>
          <div className={c.headerTitle}
            onClick={this.openMenu}>
            {areaName}
            <div className={c.dropdown + " fas fa-caret-down"}></div>
          </div>
        </div>

        <Menu
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={this.closeMenu}>
          {areas}
        </Menu>

        <div className={c.menu}>
          <NavLink
            to={`${url}/insights`}
            className={c.navItem}
            activeClassName={c.active}>
            <div className={c.menuItem}>{lcs("insights")}</div>
          </NavLink>

          {!area.category.startsWith("BLANK") ?
            <NavLink
              to={`${url}/deepdive`}
              className={c.navItem}
              activeClassName={c.active}>
              <div className={c.menuItem}>{lcs("deep_dive")}</div>
            </NavLink> : null}

          <NavLink
            to={`${url}/comments`}
            className={c.navItem}
            activeClassName={c.active}>
            <div className={c.menuItem}>{lcs("comments")}</div>
          </NavLink>

          {!area.category.startsWith("BLANK") ?
            <NavLink
              to={`${url}/help`}
              className={c.navItem}
              activeClassName={c.active}>
              <div className={c.menuItem}>{lcs("help")}</div>
            </NavLink> : null}
        </div>
        <div className={c.canvas}>

          <Area
            area={area}
            hypothesis={hypothesis}
            match={this.props.match} />

        </div>

        <Route
          path={`${path}/add-hypothesis/:area_id`}
          component={hypothesisForm} />
        <Route
          path={`${path}/edit-hypothesis/:hypothesis_id`}
          component={hypothesisForm} />

        <div className={c.content}>

          <Switch>
            <Route path={`${path}/insights`}
              component={Insights} />
            <Route path={`${path}/deepdive`}
              component={DeepDive} />
            <Route path={`${path}/comments`}
              component={Comments} />
            <Route path={`${path}/help`}
              component={Help} />
            <Redirect to={`${url}/insights`} />
          </Switch>

        </div>

      </div>
    );
  }


  constructor(props)
  {
    super(props);
    this.state = {
      anchorMenu: null
    };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu = e =>
  {
    this.setState({ anchorMenu: e.currentTarget });
  };

  closeMenu = e =>
  {
    this.setState({ anchorMenu: null });
  };

  onModalClose = () =>
  {
    const { url } = this.props.match;
    this.props.history.push(url);
  }
}

export default redux(Panel);