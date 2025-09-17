import React, { useState, useEffect } from 'react';
import redux from 'seed/redux';

import TagPicker from 'components/helpers/TagPicker'
import Multiselect from 'components/helpers/Multiselect'
import { lcs, lc } from "components/util/Locales"
import Loading from 'components/helpers/Loading'

import c from 'components/canvas_forms/Hypothesis.module.scss'

function HypothesisForm(props) {
  const {
    canvases = [],
    hypotheses = [],
    match,
    getHypothesisDetails,
    saveHypothesis,
    setHypothesis,
    onClose,
    canvasTypes
  } = props;
  const { area_id, canvas_id, hypothesis_id } = match.params;

  const [hypothesis, setHypothesisState] = useState({
    is_active: true,
    color: "#a0a0a0",
    creator_id: sessionStorage.getItem('id'),
    customer_ids: [],
    tag_ids: [],
    canvas_id,
    area_id,
  });

  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (getHypothesisDetails && hypothesis_id) {
      getHypothesisDetails(hypothesis_id, (res) => {
        setHypothesisState(res.body);
      });
    }
  }, [getHypothesisDetails, hypothesis_id]);

  const canvas = canvases.find((c) => c.id == hypothesis.canvas_id);
  if (!canvas) return <Loading />;

  const canvasType = canvasTypes.find((ct) => ct.id == canvas.type.id);
  if (!canvasType || (hypothesis_id && !hypothesis.id)) return <Loading />;

  const area = canvasType.areas.find((a) => a.id == hypothesis.area_id) || { tags: [] };
  let cArea = canvasType.areas.find((a) => a.category === "CUSTOMERS") || {};

  const title = hypothesis_id == null ? lcs("add_hypothesis") : lcs("edit_hypothesis");

  const colorsV = [
    "#D5304F", "#EF6C42", "#F6AD60",
    "#FFE375", "#F7C4BF", "#E09EB5",
    "#ED82F3", "#9E5FB2", "#4178CD",
    "#2E9EFB", "#53D0FB", "#A0CCf4",
    "#ABDDA4", "#A6D94A", "#60BD63"
  ].map(color => ({ value: color, color }));

  
  const onSubmit = (e) => {
    e.preventDefault();

    const onSave = (res) => {
      if (res == "error")
        setError("An error has occurred, try again");
      else
        onClose();
    }

    if (!hypothesis_id && saveHypothesis)
      saveHypothesis(hypothesis, onSave)
    if (hypothesis_id && setHypothesis)
      setHypothesis(hypothesis_id, hypothesis, onSave);
  };

  const onTextChanged = (e) => {
    const value = e.target.value;
    setHypothesisState((prev) => ({ ...prev, text: value }));
  };

  const onColorChanged = (data) => {
    setHypothesisState((prev) => ({ ...prev, color: data }));
  };

  const onCustomerChanged = (data) => {
    setHypothesisState((prev) => ({ ...prev, customer_ids: data }));
  };

  const onTypeChanged = (data) => {
    setHypothesisState((prev) => ({ ...prev, tag_ids: data }));
  };

  const colors = area.category === "CUSTOMERS" && (
    <div className={c.customers}>
      <b>{lcs("color")}</b>
      <TagPicker
        onChange={onColorChanged}
        singleChoice={true}
        value={[hypothesis.color]}
        values={colorsV}
      />
    </div>
  );

  const customersD = hypotheses.filter(h => h.canvas_id == hypothesis.canvas_id && h.area_id == cArea.id && h.is_active);

  const customerV = customersD.map(h => ({
    value: h.id,
    color: h.color,
    label: h.text && h.text.length > 24 ? h.text.substring(0, 24) + "…" : h.text
  }));

  const customerss = customersD.length > 0 && area.category !== "CUSTOMERS" && (
    <div className={c.customers}>
      {canvasType.type === "BMC" && <b>{lc(cArea.l_name)}</b>}
      <TagPicker
        onChange={onCustomerChanged}
        value={hypothesis.customer_ids}
        values={customerV}
      />
    </div>
  );

  const typeV = area.tags
    .sort((t1, t2) => ('' + lc(t1.l_name)).localeCompare(lc(t2.l_name)))
    .map((t) => ({ value: t.id, label: lc(t.l_name) }));

  const typess = typeV.length > 0 && (
    <div className={c.types}>
      <b>{lcs("types")}</b>
      <div className={c.typeContainer}>
        <Multiselect
          onChange={onTypeChanged}
          value={hypothesis.tag_ids}
          values={typeV}
        />
      </div>
    </div>
  );

  const errorMessage = error && (
    <div className={c.error + ' animated fadeIn'}>
      <div>{error}</div>
    </div>
  );
  
  return (
    <div className={c.module}>
      <div className={c.header}>
        {title}
      </div>
      <div className={c.content}>
        <form onSubmit={onSubmit}>
          <textarea type="text"
            value={hypothesis.text}
            name='hypothesis'
            onChange={onTextChanged}
            className={c.hypothesis}
            rows={hypothesis.text && hypothesis.text.length > 90 ? 4 : 2}
            placeholder={lcs("write_your_hypothesis")}
            required
          />
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

export default redux(HypothesisForm);