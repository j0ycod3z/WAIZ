import * as React from 'react';
import * as Util from 'seed/util'
import redux from 'seed/redux';

import { lcs, lc } from "components/util/Locales"

import c from 'resources/css/canvas_forms/Area.module.css'


class AreaForm extends React.Component
{
  render()
  {
    const { areaName } = this.state;

    const { error } = this.state;
    const errorMessage =
      error ? <div className={c.error + ' animated fadeIn'}><div> {error}</div></div> : null;

    return (
      <div className={c.module}>
        <div className={c.header}>
          {lcs("rename_area")}
        </div>
        <div className={c.content}>
          <form onSubmit={this.onSubmit}>
            <input type="text"
              value={areaName.ref}
              onChange={this.onTextChanged}
              className={c.name}
              placeholder={lcs("area_name")}
              required></input>
            {errorMessage}
            <button type="submit" className={c.call}>{lcs("save")}</button>
          </form>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      areaName: { ref: "" }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
  }

  componentDidMount()
  {
    this.loadData();
  }

  loadData = () =>
  {
    const areaId = this.props.area.id;
    const callback = res => 
    {
      const area = Util.get(this.props.areas, areaId);
      if (area.id != null)
        this.setState({
          areaName: area.l_name
        })
    }
    this.props.getAreaDetails(areaId, callback);
  }

  saveData = () =>
  {
    const areaName = this.state.areaName;
    const { canvas_id } = this.props.match.params;
    const typeId = this.props.area.canvas_type_id;

    const onSave = res => 
    {
      if (res.ok) {
        this.props.setCanvasType(typeId, {})
        this.props.setCanvas(canvas_id, {})
        this.onSave(res.body);
      }
      else this.onError(res.body)
    };
    let body = {
      ref: areaName.ref
    }
    this.props.setLocale(areaName.id, body, onSave);


  }

  onSave(res)
  {
    this.props.onClose();
  }

  onError(error)
  {
    this.setState({
      error: 'An error has occurred, try again'
    });
  }

  onSubmit(e)
  {
    e.preventDefault();
    this.saveData()
  }

  // Events

  onTextChanged = e =>
  {
    let areaName = this.state.areaName ? this.state.areaName : {}
    areaName.ref = e.target.value
    this.setState({
      areaName: areaName
    })
  }
}

export default redux(AreaForm);