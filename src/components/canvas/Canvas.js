import * as React from 'react';
import $ from 'jquery'
import redux from 'seed/redux';
import { CSVLink } from "react-csv";
import { hypothesisToCsv } from 'components/canvas/util/FormatUtil';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';

import { lcs } from 'components/util/Locales'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Basic from 'components/canvas/types/Basic'
import BMC from 'components/canvas/types/BMC'
import Exo from 'components/canvas/types/Exo'
import Systemic from 'components/canvas/types/Systemic'
import Impact from 'components/canvas/types/Impact'
import Public from 'components/canvas/types/Public'
import Reputation from 'components/canvas/types/Reputation'
import Productivity from 'components/canvas/types/Productivity'
import Blank from 'components/canvas/types/Blank'
import Scaling from 'components/canvas/types/Scaling';

import CircularProgress from '@material-ui/core/CircularProgress';

import c from 'resources/css/canvas/Canvas.module.css'

class Canvas extends React.Component
{
  render()
  {
    const { canvases = [], hypotheses = [], canvasTypes = [] } = this.props;
    const { canvasId } = this.props;
    const { filterAll, filterUntested, filterValid, filterInvalid, activeWeek } = this.state;
    const { optionMenu } = this.state;

    let canvas = canvases.filter(canvas => canvas.id == canvasId)[0];
    if (canvas == null) return <div className={c.loading}><div><CircularProgress size={75} /></div></div>;
    let canvasType = canvasTypes.filter(type => type.id == canvas.type.id)[0];
    if (canvasType == null) return <div className={c.loading}><div><CircularProgress size={75} /></div></div>;

    const projectId = localStorage.getItem('projectId');
    if (canvas.project_id != projectId) this.props.history.replace(`/`)

    let hypothesis = hypotheses.filter(h =>
      h.is_active == true &&
      h.canvas_id == canvasId &&
      (filterAll ||
        (filterUntested && !h.is_tested) ||
        (filterValid && h.is_tested && h.is_valid) ||
        (filterInvalid && h.is_tested && !h.is_valid)
      )
    );

    let allHPhase2 = hypotheses.filter(h =>
    {
      let canvas = canvases.filter(canvas => canvas.id == h.canvas_id)[0]
      if (canvas == null) return false;
      let type = canvas.type.type;
      if (type != "BMC" && type != "BASIC" && type != "IMPACT" && type != "PUBLIC") return false;
      if (h.canvas_id == canvasId) return false;
      if (canvas.project_id != projectId) return false;
      return (
        h.is_active == true &&
        (filterAll ||
          (filterUntested && !h.is_tested) ||
          (filterValid && h.is_tested && h.is_valid) ||
          (filterInvalid && h.is_tested && !h.is_valid)
        ))
    });

    hypotheses
      .filter(h => h.canvas_id == canvasId)  
      .map(h => h.week = Math.ceil((Date.now() - new Date(h.created_at).getTime()) / (86400000 * 7)));
    let currentWeek = 1;
    let minWeek = 10000;
    hypotheses
      .filter(h => h.canvas_id == canvasId)
      .map(h => { 
        if (h.week > currentWeek) currentWeek = h.week;
        if (h.week < minWeek) minWeek = h.week;
      });
    let selectedWeek = activeWeek == 0 ? currentWeek : activeWeek;
    const weeks = [];
    for (let i = currentWeek; i >= 1; i--)
      weeks.push(<option value={i}>{i}</option>)

    hypothesis = hypothesis.filter(h => h.week - minWeek <= selectedWeek)
    allHPhase2 = allHPhase2.filter(h => h.week - minWeek <= selectedWeek)

    let allCount = hypothesis.length;
    let untestedCount = hypothesis.filter(h => !h.is_tested).length;
    let validCount = hypothesis.filter(h => h.is_tested && h.is_valid).length;
    let invalidCount = hypothesis.filter(h => h.is_tested && !h.is_valid).length;


    const format = this.getFormat(canvasType, hypothesis, allHPhase2, this.props.match);
    return (
      <div className={c.module}>
        <div className={c.header}>
          <div className={c.menu}>
            <div className={c.weeks}>
              <span>{lcs("week")}</span>
              <select id="week" value={selectedWeek} onChange={this.onWeekChange} style={{border: "1px solid #ddd"}}>{weeks}</select>
            </div>
          </div>
          <div className={c.menu}>
            <div className={c.filters}>
              <span>{lcs("filters")}</span>
              <input type="checkbox" id="filter-all" checked={filterAll} onChange={this.onFilterAll} />{lcs("all")} <label>{allCount}</label>
              <input type="checkbox" id="filter-untested" checked={filterUntested} onChange={this.onFilterUntested} />{lcs("untested")} <label>{untestedCount}</label>
              <input type="checkbox" id="filter-valid" checked={filterValid} onChange={this.onFilterValid} />{lcs("valid")} <label>{validCount}</label>
              <input type="checkbox" id="filter-invalid" checked={filterInvalid} onChange={this.onFilterInvalid} />{lcs("invalid")} <label>{invalidCount}</label>
            </div>
          </div>
          <div className={c.menu + " " + c.options}
            onClick={this.openOptionMenu}>
            <span>{lcs("options")}</span>
          </div>
          <Menu
            anchorEl={optionMenu}
            open={Boolean(optionMenu)}
            onClose={this.closeOptionMenu}>
            {" TODO <MenuItem onClick={this.onClickActivity}>{lcs('activity_feed')}</MenuItem>"}
            <MenuItem onClick={this.onClickExportImage}>{lcs("export_image")}</MenuItem>
            <MenuItem>
              <CSVLink
                data={hypothesisToCsv(hypothesis, canvasType)}
                filename={"hypothesis.csv"}
                style={{ color: "#444" }}>{lcs("export_csv")}</CSVLink>
            </MenuItem>

          </Menu>

        </div>

        <div className={c.panel}>
          {format}
        </div>
      </div>
    );
  }

  getFormat(type, hypothesis, allHPhase2, match)
  {
    switch (type.type) {
      case "BASIC":
        return <Basic type={type} hypothesis={hypothesis} allHPhase2={allHPhase2} match={match} />
      case "BMC":
        return <BMC type={type} hypothesis={hypothesis} allHPhase2={allHPhase2} match={match} />
      case "EXO":
        return <Exo type={type} hypothesis={hypothesis} match={match} />
      case "SYSTEMIC":
        return <Systemic type={type} hypothesis={hypothesis} match={match} />
      case "IMPACT":
        return <Impact type={type} hypothesis={hypothesis} allHPhase2={allHPhase2} match={match} />
      case "PUBLIC":
        return <Public type={type} hypothesis={hypothesis} allHPhase2={allHPhase2} match={match} />
      case "REPUTATION":
        return <Reputation type={type} hypothesis={hypothesis} match={match} />
      case "PRODUCTIVITY":
        return <Productivity type={type} hypothesis={hypothesis} match={match} />
      case "BLANK":
        return <Blank type={type} hypothesis={hypothesis} allHPhase2={allHPhase2} match={match} />
      case "SCALING":
        return <Scaling type={type} hypothesis={hypothesis} match={match} />
      default:
        return <BMC type={type} hypothesis={hypothesis} allHPhase2={allHPhase2} match={match} />
    }
  }

  constructor(props)
  {
    super(props);
    this.state = {
      filterAll: true,
      filterUntested: false,
      filterValid: false,
      filterInvalid: false,
      optionMenu: null,
      activeWeek: 0,
    };

    this.onFilterAll = this.onFilterAll.bind(this);
    this.onFilterUntested = this.onFilterUntested.bind(this);
    this.onFilterValid = this.onFilterValid.bind(this);
    this.onFilterInvalid = this.onFilterInvalid.bind(this);
    this.onWeekChange = this.onWeekChange.bind(this);
    this.onClickActivity = this.onClickActivity.bind(this);
    this.onClickExportImage = this.onClickExportImage.bind(this);
    this.openOptionMenu = this.openOptionMenu.bind(this);
    this.closeOptionMenu = this.closeOptionMenu.bind(this);
  }

  componentDidMount()
  {
    const { canvasId } = this.props;
    this.loadData(canvasId);
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.canvasId !== this.props.canvasId)
      this.loadData(nextProps.canvasId);
  }

  loadData(canvasId)
  {
    const { getCanvasDetails, getCanvasList, getHypothesisList } = this.props;
    const callback = res =>
    {
      if (res.ok)
        this.props.getCanvasTypeDetails(res.body.type.id)
    }
    getCanvasDetails(canvasId, callback)
    getHypothesisList({ canvas: canvasId })

    let projectId = localStorage.getItem('projectId');
    getCanvasList({ project: projectId });
    getHypothesisList({ "canvas.project": projectId })
  }

  // Events

  onFilterAll = e =>
  {
    let target = e.target;
    this.setState(s => ({
      filterAll: target.checked,
      filterUntested: false,
      filterValid: false,
      filterInvalid: false,
    }));
  }

  onFilterUntested = e =>
  {
    let target = e.target;
    this.setState(s => ({
      filterUntested: target.checked,
      filterAll: false
    }));
  }

  onFilterValid = e =>
  {
    let target = e.target;
    this.setState(s => ({
      filterValid: target.checked,
      filterAll: false
    }));
  }

  onFilterInvalid = e =>
  {
    let target = e.target;
    this.setState(s => ({
      filterInvalid: target.checked,
      filterAll: false
    }));
  }

  onWeekChange = e => 
  {
    const week = e.target.value;
    this.setState({ activeWeek: week });

  }

  onClickActivity = e => 
  {
    const { url } = this.props.match;
    this.props.history.push(`${url}/activity`)
  }

  onClickExportImage = e =>
  {
    var node = $("." + c.panel)[0];
    domtoimage.toBlob(node)
      .then(function (blob)
      {
        saveAs(blob, 'canvas.png');
      });
    this.closeOptionMenu();
  }

  openOptionMenu(e)
  {
    this.setState({ optionMenu: e.currentTarget });
  }

  closeOptionMenu(e)
  {
    this.setState({ optionMenu: null });
  }
}

export default redux(Canvas);