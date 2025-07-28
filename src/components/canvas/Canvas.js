import React, { useState, useEffect, useRef } from 'react';
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

function Canvas(props) {
  const {
    canvases = [],
    hypotheses = [],
    canvasTypes = [],
    canvasId,
    history,
    match,
    getCanvasDetails,
    getCanvasList,
    getHypothesisList,
  } = props;

  const [filterAll, setFilterAll] = useState(true);
  const [filterUntested, setFilterUntested] = useState(false);
  const [filterValid, setFilterValid] = useState(false);
  const [filterInvalid, setFilterInvalid] = useState(false);
  const [optionMenu, setOptionMenu] = useState(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    loadData(canvasId);
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMountedRef.current) {
      loadData(canvasId);
    }
  }, [canvasId]);

  const loadData = (canvasId) => {
    const callback = (res) => {
      if (res.ok && isMountedRef.current) {
        props.getCanvasTypeDetails(res.body.type.id)
      }
    }

    getCanvasDetails(canvasId, callback)
    getHypothesisList({ canvas: canvasId })

    const projectId = localStorage.getItem('projectId');
    getCanvasList({ project: projectId });
    getHypothesisList({ "canvas.project": projectId })
  }


  let canvas = canvases.filter(canvas => canvas.id == canvasId)[0];
  if (canvas == null)
    return <div className={c.loading}><div><CircularProgress size={75} /></div></div>;

  let canvasType = canvasTypes.filter(type => type.id == canvas.type.id)[0];
  if (canvasType == null)
    return <div className={c.loading}><div><CircularProgress size={75} /></div></div>;
  
  const projectId = localStorage.getItem('projectId');
  if (canvas.project_id != projectId) history.replace(`/`)

  let hypothesis = hypotheses.filter((h) =>
    h.is_active == true &&
    h.canvas_id == canvasId &&
    (filterAll ||
      (filterUntested && !h.is_tested) ||
      (filterValid && h.is_tested && h.is_valid) ||
      (filterInvalid && h.is_tested && !h.is_valid)
    )
  );
  let allHPhase2 = hypotheses.filter((h) => {
    const relatedCanvas = canvases.find(c => c.id == h.canvas_id);
    
    if (!relatedCanvas) return false;

    const type = relatedCanvas.type.type;

    if (!["BMC", "BASIC", "IMPACT", "PUBLIC"].includes(type)) return false;
    if (h.canvas_id == canvasId) return false;
    if (relatedCanvas.project_id != projectId) return false;

    return (
      h.is_active == true &&
      (filterAll ||
        (filterUntested && !h.is_tested) ||
        (filterValid && h.is_tested && h.is_valid) ||
        (filterInvalid && h.is_tested && !h.is_valid)
      ))
  });

  hypotheses.filter((h) => h.canvas_id == canvasId).map((h) =>
    h.week = Math.ceil((Date.now() - new Date(h.created_at).getTime()) / (86400000 * 7))
  );
  
  let currentWeek = 1;
  let minWeek = 10000;
  hypotheses.filter((h) => h.canvas_id == canvasId).map((h) => { 
    if (h.week > currentWeek) currentWeek = h.week;
    if (h.week < minWeek) minWeek = h.week;
  });

  let selectedWeek = activeWeek == 0 ? currentWeek : activeWeek;

  const weeks = [];
  for (let i = currentWeek; i >= 1; i--){
    weeks.push(<option key={i} value={i}>{i}</option>);
  }

  hypothesis = hypothesis.filter(h => h.week - minWeek <= selectedWeek)
  allHPhase2 = allHPhase2.filter(h => h.week - minWeek <= selectedWeek)

  const allCount = hypothesis.length;
  const untestedCount = hypothesis.filter(h => !h.is_tested).length;
  const validCount = hypothesis.filter(h => h.is_tested && h.is_valid).length;
  const invalidCount = hypothesis.filter(h => h.is_tested && !h.is_valid).length;

  const getFormat = () => {
    const commonProps = {type: canvasType, hypothesis, allHPhase2, match}

    switch (canvasType.type) {
      case "BASIC":         return <Basic {...commonProps}/>
      case "BMC":           return <BMC {...commonProps}/>
      // case "EXO":           return <Exo {...commonProps}/>
      case "SYSTEMIC":      return <Systemic {...commonProps}/>
      case "IMPACT":        return <Impact {...commonProps}/>
      case "PUBLIC":        return <Public {...commonProps}/>
      case "REPUTATION":    return <Reputation {...commonProps}/>
      case "PRODUCTIVITY":  return <Productivity {...commonProps}/>
      case "BLANK":         return <Blank {...commonProps}/>
      case "SCALING":       return <Scaling {...commonProps}/>
      default:              return <BMC {...commonProps}/>
    }
  };

  const onClickExportImage = () => {
    let node = $("." + c.panel)[0];
    
    if (!node) {
      node = document.querySelector('.panel');
    }
    
    if (!node) {
      node = document.querySelector('[class*="panel"]');
    }
    
    if (!node) {
      console.error('Panel element not found for export. Available classes:', c);
      return;
    }
    
    setTimeout(() => {
      if (!node || !node.cloneNode) {
        console.error('Invalid node for export');
        return;
      }
      
      const options = {
        quality: 0.95,
        bgcolor: '#fff',
        style: {
          'transform': 'scale(1)',
          'transform-origin': 'top left'
        }
      };
      
      domtoimage.toBlob(node, options)
        .then((blob) => {
          saveAs(blob, 'canvas.png');
        })
        .catch((error) => {
          console.error('Error exporting image:', error);
        });
    }, 100);
    
    setOptionMenu(null);
  };

  const onClickActivity = () => {
    history.push(`${match.url}/activity`);
  };

  return (
    <div className={c.module}>
      <div className={c.header}>
        <div className={c.menu}>
          <div className={c.weeks}>
            <span>{lcs("week")}</span>
            <select
              id="week"
              value={selectedWeek}
              onChange={(e) => setActiveWeek(Number(e.target.value))}
            >
              {weeks}
            </select>
          </div>
        </div>

        <div className={c.menu}>
          <div className={c.filters}>
            <span>{lcs("filters")}</span>
            <div>
              <input type="checkbox" id="filter-all" checked={filterAll}
                onChange={(e) => {
                  setFilterAll(e.target.checked);
                  if (e.target.checked) {
                    setFilterUntested(false);
                    setFilterValid(false);
                    setFilterInvalid(false);
                  }
                }}
              />
              {lcs("all")}
              <label>{allCount}</label>
            </div>
            <div>
              <input type="checkbox" id="filter-untested" checked={filterUntested}
                onChange={(e) => {
                  setFilterUntested(e.target.checked);
                  setFilterAll(false);
                }}
              />
              {lcs("untested")}
              <label>{untestedCount}</label>
            </div>
            <div>
              <input type="checkbox" id="filter-valid" checked={filterValid}
                onChange={(e) => {
                  setFilterValid(e.target.checked);
                  setFilterAll(false);
                }}
              />
              {lcs("valid")}
              <label>{validCount}</label>
            </div>
            <div>
              <input type="checkbox" id="filter-invalid" checked={filterInvalid}
                onChange={(e) => {
                  setFilterInvalid(e.target.checked);
                  setFilterAll(false);
                }}
              />
              {lcs("invalid")}
              <label>{invalidCount}</label>
            </div>
          </div>
        </div>
        
        <div className={c.menu + " " + c.options} onClick={(e) => setOptionMenu(e.currentTarget)}>
          <span>{lcs("options")}</span>
        </div>

        <Menu
          anchorEl={optionMenu}
          open={Boolean(optionMenu)}
          onClose={() => setOptionMenu(null)}
        >
          {/* {" TODO <MenuItem onClick={onClickActivity}>{lcs('activity_feed')}</MenuItem>"} */}
          <MenuItem onClick={onClickExportImage}>{lcs("export_image")}</MenuItem>
          <MenuItem>
            <CSVLink
              data={hypothesisToCsv(hypothesis, canvasType)}
              filename={"hypothesis.csv"}
              style={{ color: "#444" }}
            >
              {lcs("export_csv")}
            </CSVLink>
          </MenuItem>
        </Menu>
      </div>

      <div className={c.panel}>
        {getFormat()}
      </div>
    </div>
  );
}

export default redux(Canvas);