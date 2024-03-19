import * as React from 'react';
import * as Util from 'seed/util'
import redux from 'seed/redux';

import TagPicker from 'components/helpers/TagPicker'
import Multiselect from 'components/helpers/Multiselect'
import { lcs, lc } from "components/util/Locales"
import Loading from 'seed/components/helpers/Loading'

import c from 'resources/css/canvas_forms/Hypothesis.module.css'


class HypothesisForm extends React.Component
{
  render()
  {
    const { canvases = [], hypotheses = [] } = this.props;
    const { hypothesis } = this.state;
    const { hypothesis_id } = this.props.match.params;
    const { error } = this.state;
    const errorMessage =
      error ? <div className={c.error + ' animated fadeIn'}><div> {error}</div></div> : null;

    let canvas = canvases.filter(canvas => canvas.id == hypothesis.canvas_id)[0];
    let canvasType = this.props.canvasTypes.filter(type => type.id == canvas.type.id)[0];
    if (canvas == null || canvasType == null ||
      (hypothesis_id != null && hypothesis.id == null)) return <Loading />;

    let area = { tags: [] };
    let cArea = {};
    if (canvas != null) {
      area = canvasType.areas.filter(a => a.id == hypothesis.area_id)[0];
      cArea = canvasType.areas.filter(a => a.category == "CUSTOMERS")[0];
      if (cArea == null) cArea = {}
    }

    let title = hypothesis_id == null ? lcs("add_hypothesis") : lcs("edit_hypothesis");
    // COLORS
    let colorsV = [
      { value: "#D5304F", color: "#D5304F" },
      { value: "#EF6C42", color: "#EF6C42" },
      { value: "#F6AD60", color: "#F6AD60" },
      { value: "#FFE375", color: "#FFE375" },
      { value: "#F7C4BF", color: "#F7C4BF" },
      { value: "#E09EB5", color: "#E09EB5" },
      { value: "#ED82F3", color: "#ED82F3" },
      { value: "#9E5FB2", color: "#9E5Fb2" },
      { value: "#4178CD", color: "#4178CD" },

      { value: "#2E9EFB", color: "#2E9EFB" },
      { value: "#53D0FB", color: "#53D0FB" },
      { value: "#A0CCf4", color: "#a0CCf4" },
      { value: "#ABDDA4", color: "#ABDDA4" },
      { value: "#A6D94A", color: "#A6D94A" },
      { value: "#60BD63", color: "#60BD63" },
    ]

    let colors = area.category == "CUSTOMERS" ?
      <div className={c.customers}>
        <b>{lcs("color")}</b>
        <TagPicker
          onChange={this.onColorChanged}
          singleChoice={true}
          value={[hypothesis.color]}
          values={colorsV} />
      </div> : null

    // CUSTOMERS

    let customersD = hypotheses.filter(h => h.canvas_id == hypothesis.canvas_id && h.area_id == cArea.id && h.is_active);

    let customerV = customersD.map(h =>
    {
      return {
        value: h.id,
        color: h.color,
        label: h.text && h.text.length > 24 ?
          h.text.substring(0, 24) + "…" : h.text
      }
    })

    let customerss = customersD.length > 0 && area.category != "CUSTOMERS" ?
      <div className={c.customers}>
        {canvasType.type == "BMC" ? <b>{lc(cArea.l_name)}</b> : null}
        <TagPicker
          onChange={this.onCustomerChanged}
          value={hypothesis.customer_ids}
          values={customerV} />
      </div> : null

    //TYPES

    let typeV = area.tags.sort((t1, t2) => ('' + lc(t1.l_name)).localeCompare(lc(t2.l_name)))
      .map(t =>
      {
        return {
          value: t.id,
          label: lc(t.l_name)
        }
      })

    let typess = typeV.length > 0 ?
      <div className={c.types}>
        <b>{lcs("types")}</b>
        <div className={c.typeContainer}>
          <Multiselect
            onChange={this.onTypeChanged}
            value={hypothesis.tag_ids}
            values={typeV} />
        </div>
      </div> : null



    return (
      <div className={c.module}>
        <div className={c.header}>
          {title}
        </div>
        <div className={c.content}>
          <form onSubmit={this.onSubmit}>
            <textarea type="text"
              value={hypothesis.text}
              onChange={this.onTextChanged}
              className={c.hypothesis}
              rows={hypothesis.text && hypothesis.text.length > 90 ? 4: 2}
              placeholder={lcs("write_your_hypothesis")}
              required></textarea>
            {colors}
            {customerss}
            {typess}
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
    const { area_id, canvas_id } = this.props.match.params;

    this.state = {
      hypothesis: {
        is_active: true,
        color: "#a0a0a0",
        creator_id: sessionStorage.getItem('id'),
        customer_ids: [],
        tag_ids: [],
        canvas_id: canvas_id,
        area_id: area_id
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.onColorChanged = this.onColorChanged.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
    this.onTypeChanged = this.onTypeChanged.bind(this);
  }

  componentDidMount()
  {
    this.loadData();
  }

  loadData = () =>
  {
    const { getHypothesisDetails } = this.props;
    const { hypothesis_id } = this.props.match.params;

    if (getHypothesisDetails != null && hypothesis_id != null) {
      const callback = res => 
      {
        this.setState({
          hypothesis: res.body
        })
      }
      getHypothesisDetails(hypothesis_id, callback);
    }
  }

  saveData = () =>
  {
    const { saveHypothesis, setHypothesis } = this.props;
    const { hypothesis_id } = this.props.match.params;
    const onSave = res => 
    {
      if (res == "error")
        return this.setState({
          error: "An error has occurred, try again"
        })
      this.props.onClose();
    }
    if (hypothesis_id == null && saveHypothesis != null)
      saveHypothesis(this.state.hypothesis, onSave)
    if (hypothesis_id != null && setHypothesis != null)
      setHypothesis(hypothesis_id, this.state.hypothesis, onSave);
  }

  onSubmit(e)
  {
    e.preventDefault();
    this.saveData()
  }

  // Events

  onTextChanged = e =>
  {
    let hypothesis = this.state.hypothesis ? this.state.hypothesis : {}
    hypothesis.text = e.target.value
    this.setState({
      hypothesis: hypothesis
    })
  }

  onColorChanged = data =>
  {
    let hypothesis = this.state.hypothesis ? this.state.hypothesis : {}
    hypothesis.color = data
    this.setState({
      hypothesis: hypothesis
    })
  }

  onCustomerChanged = data =>
  {
    let hypothesis = this.state.hypothesis ? this.state.hypothesis : {}
    hypothesis.customer_ids = data
    this.setState({
      hypothesis: hypothesis
    })
  }

  onTypeChanged = data =>
  {
    let hypothesis = this.state.hypothesis ? this.state.hypothesis : {}
    hypothesis.tag_ids = data
    this.setState({
      hypothesis: hypothesis
    })
  }
}

export default redux(HypothesisForm);