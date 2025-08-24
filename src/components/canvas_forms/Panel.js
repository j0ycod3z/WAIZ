import React, { useState, useCallback, useMemo } from 'react';
import { NavLink, Link, Route, Switch, Redirect } from 'react-router-dom'
import redux from 'seed/redux';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Area from 'components/canvas/Area'
import Insights from 'components/canvas_forms/Insights'
import DeepDive from 'components/canvas_forms/DeepDive'
import Comments from 'components/canvas_forms/Comments'
import Help from 'components/canvas_forms/Help'
import Modal from 'seed/components/helpers/Modal';
import HypothesisForm from 'components/canvas_forms/Hypothesis';

import cx from 'classnames';
import c from 'resources/css/canvas_forms/Panel.module.css'
import { lcs, lc } from "components/util/Locales"

function Panel(props) {
  const { match, canvasTypes, canvases = [], hypotheses = [], history } = props;
  const { url, path } = match;
  const { area_id, canvas_id } = match.params;

  const [anchorMenu, setAnchorMenu] = useState(null);

  const openMenu = useCallback((e) => {
    setAnchorMenu(e.currentTarget);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorMenu(null);
  }, []);

  const onModalClose = useCallback(() => {
    history.push(url);
  }, [history, url]);

  const canvas = useMemo(() => (
    canvases.find((c) => c.id == canvas_id) || {}
  ), [canvases, canvas_id]);

  const canvasType = useMemo(() => {
    if (!canvas?.type) return null;
    return canvasTypes.find((type) => type.id == canvas.type.id);
  }, [canvas, canvasTypes]);

  const area = useMemo(() => {
    if (!canvasType) return { category: "" };
    return canvasType.areas.find((a) => a.id == area_id) || { category: "" };
  }, [canvasType, area_id]);

  const areas = useMemo(() => {
    if (!canvasType) return null;
    return canvasType.areas.map((a) => (
      <Link
        key={a.id}
        to={`/app/c/${canvas_id}/area/${a.id}`}
        onClick={closeMenu}
      >
        <MenuItem>{
          a.category.startsWith("BLANK") && lc(a.l_name) === "" ?
          `${lcs("area")} ${a.category.slice(-1)}` :
          lc(a.l_name)
        }</MenuItem>
      </Link>
    ));
  }, [canvasType, canvas_id, closeMenu]);

  const areaName = useMemo(() => {
    if (!area) return "";
    return area.category.startsWith("BLANK") && lc(area.l_name) === "" ?
      `${lcs("area")} ${area.category.slice(-1)}` :
      lc(area.l_name);
  }, [area]);

  const hypothesis = useMemo(() => {
    return hypotheses.filter((h) => h.canvas_id == canvas_id && h.area_id == area_id);
  }, [hypotheses, canvas_id, area_id]);

  const hypothesisForm = (props) => (
    <Modal
      match={props.match}
      onClose={onModalClose}
      width={470}
      height={500}
    >
      <HypothesisForm />
    </Modal>
  );

  return (
    <div className={c.module}>
      <Switch>
        <Route exact path={`${url}/insights`} render={() => <div className={cx(c.headerBackground, c.insights)}></div>} />
        <Route path={`${url}/deepdive`} render={() => <div className={cx(c.headerBackground, c.deepdive)}></div>} />
        <Route path={`${url}/comments`} render={() => <div className={cx(c.headerBackground, c.comments)}></div>} />
        <Route path={`${url}/help`} render={() => <div className={cx(c.headerBackground, c.help)}></div>} />
        <Route path={`${url}`} render={() => <div className={cx(c.headerBackground, c.insights)}></div>} />
      </Switch>

      <div className={c.header}>
        <div className={c.headerTitle} onClick={openMenu}>
          {areaName}
          <div className={cx(c.dropdown,'fas', 'fa-caret-down')}></div>
        </div>
      </div>

      <Menu anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={closeMenu}>
        {areas}
      </Menu>

      <div className={c.menu}>
        <NavLink to={`${url}/insights`} className={c.navItem} activeClassName={c.active} >
          <div className={c.menuItem}>{lcs("insights")}</div>
        </NavLink>

        { !area.category.startsWith("BLANK") &&
          <NavLink to={`${url}/deepdive`} className={c.navItem} activeClassName={c.active} >
            <div className={c.menuItem}>{lcs("deep_dive")}</div>
          </NavLink>
        }

        <NavLink to={`${url}/comments`} className={c.navItem} activeClassName={c.active} >
          <div className={c.menuItem}>{lcs("comments")}</div>
        </NavLink>

        { !area.category.startsWith("BLANK") &&
          <NavLink to={`${url}/help`} className={c.navItem} activeClassName={c.active}>
            <div className={c.menuItem}>{lcs("help")}</div>
          </NavLink>
        }
      </div>

      <div className={c.canvas}>
        <Area area={area} hypothesis={hypothesis} match={props.match} disableOptions={true} />
      </div>

      <Route path={`${path}/add-hypothesis/:area_id`} component={hypothesisForm} />
      <Route path={`${path}/edit-hypothesis/:hypothesis_id`} component={hypothesisForm} />

      <div className={c.content}>
        <Switch>
          <Route path={`${path}/insights`} component={Insights} />
          <Route path={`${path}/deepdive`} component={DeepDive} />
          <Route path={`${path}/comments`} component={Comments} />
          <Route path={`${path}/help`} component={Help} />
          <Redirect to={`${url}/insights`} />
        </Switch>
      </div>
    </div>
  );
}

export default redux(Panel);