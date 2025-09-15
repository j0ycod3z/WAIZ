import React, { useState, useEffect } from 'react';
import * as Util from 'seed/util'
import redux from 'seed/redux';

import cx from 'classnames'
import { lcs } from "components/util/Locales"

import c from 'resources/css/canvas_forms/Area.module.css'

function AreaForm(props) {
  const {
    area,
    areas,
    getAreaDetails,
    setLocale,
    setCanvas,
    setCanvasType,
    onClose,
    match,
  } = props;
  const [areaName, setAreaName] = useState({ ref: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const areaId = area.id;
  
    getAreaDetails(areaId, () => {
      const foundArea = Util.get(areas, areaId);
      if (foundArea.id != null) setAreaName(foundArea.l_name);
    });
  }, [area.id, areas, getAreaDetails]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    const { canvas_id } = match.params;
    const typeId = area.canvas_type_id;
    const body = { ref: areaName.ref }

    setLocale(areaName.id, body, (res) => {
      if (res.ok) {
        setCanvasType(typeId, {})
        setCanvas(canvas_id, {})
        onClose();
      }
      else
        setError('An error has occurred, try again');
    });
  };

  const onTextChanged = (e) => {
    const value = e.target.value;
    setAreaName({ ...areaName, ref: value });
  };

  return (
    <div className={c.module}>
      <div className={c.header}>
        {lcs("rename_area")}
      </div>
      <div className={c.content}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="rename_area"
            value={areaName.ref}
            onChange={onTextChanged}
            className={c.name}
            placeholder={lcs("area_name")}
            required
          />
          {error && (
            <div className={cx(c.error, 'animated', 'fadeIn')}>
              <div>{error}</div>
            </div>
          )}
          <button type="submit" className={c.call}>{lcs("save")}</button>
        </form>
      </div>
    </div>
  );
}

export default redux(AreaForm);