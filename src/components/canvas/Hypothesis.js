import React from 'react';
import redux from 'seed/redux';
import { useDrag } from 'react-dnd'

import $ from 'jquery'
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { lcs, lc } from 'components/util/Locales'
import { hasProjectPermission } from 'components/util/Permissions';
import { getBrText } from 'components/util/Format'

import Caption from 'components/helpers/Caption';

import c from 'components/canvas/Hypothesis.module.scss'
// import color from '@material-ui/core/colors/yellow';

function Hypothesis(props) {
  const {
    area,
    hypothesis,
    project,
    selectedColor = "",
    match,
    setHypothesis,
    setSelectedColor = () => {}
  } = props;
  const { url } = match;

  const onClickValidate = () => {
    const isValid = hypothesis.is_valid;
    const isTested = hypothesis.is_tested;
    const tested = !(isValid && isTested);
    const body = { is_valid: true, is_tested: tested };
    setHypothesis(hypothesis.id, body);
  };

  const onClickInvalidate = () => {
    const isInvalid = !hypothesis.is_valid;
    const isTested = hypothesis.is_tested;
    const tested = !(isInvalid && isTested);
    const body = { is_valid: false, is_tested: tested };
    setHypothesis(hypothesis.id, body);
  };

  const onClickDelete = () => {
    const body = { is_active: false };
    setHypothesis(hypothesis.id, body);
  };

  const showOptions = (e) => {
    const element = $(e.currentTarget).find("." + c.options);
    element.addClass(c.focused);
    window.setTimeout(() => {
      if (element.hasClass(c.focused))
        element.fadeIn(250);
    }, 100);
  };

  const hideOptions = (e) => {
    const element = $(e.currentTarget).find("." + c.options);
    element.removeClass(c.focused);
    element.fadeOut(200);
  };

  const onColorEnter = (color) => setSelectedColor(color);

  const onColorLeave = () => setSelectedColor("");

  let hypothesisSelected = hypothesis.customers.some((c) => c.color === selectedColor);
  
  const colors = hypothesis.customers.map((color, i) => (
    <Caption key={`${i}-${color.color}`} text={color.text}>
      <div
        className={c.color}
        onMouseEnter={() => onColorEnter(color.color)}
        onMouseLeave={() => onColorLeave()}
        style={{
          backgroundColor: color.color,
          height: selectedColor == color.color ? "12px" : "6px",
          width: selectedColor == color.color ? "21px" : "19px"
        }}
      />
    </Caption>
  ));

  if (area.category == "CUSTOMERS") {
    colors.push(
      <Caption key={`main-color-${hypothesis.id}`} text={hypothesis.text}>
        <div className={c.color} style={{ backgroundColor: hypothesis.color }} />
      </Caption>
    )
  }
  const tags = hypothesis.tags.map((t) => (
    <Caption key={t.id} text={lc(t.l_name)}>
      <div className={c.tag}>{lc(t.l_name).substring(0, 1)}</div>
    </Caption>
  ));

  let styleContent = "";
  if (hypothesis.is_tested){
    styleContent = hypothesis.is_valid ? c.valid : c.invalid
  }

  return (
    <div className={c.module}
      style={{ backgroundColor: hypothesisSelected && "#f5f5f5" }}
      onMouseEnter={showOptions}
      onMouseLeave={hideOptions}>
      {(colors.length !== 0) &&
        <div className={c.colors}>
          {colors}
        </div>
      }

      {hasProjectPermission(project, ["MEMBER"]) && (
        <div className={c.options}>
          <Caption text={lcs("validate")}>
            <div
              className={cx(c.validate, c.optionItem, "fas fa-check")}
              onClick={onClickValidate}
            />
          </Caption>
          <Caption text={lcs("invalidate")}>
            <div
              className={cx(c.invalidate, c.optionItem, "fas fa-ban")}
              onClick={onClickInvalidate}
            />
          </Caption>
          <Caption text={lcs("edit")}>
            <Link to={`${url}/edit-hypothesis/${hypothesis.id}`}>
              <div className={c.edit + " " + c.optionItem + " fas fa-edit"} />
            </Link>
          </Caption>
          <Caption text={lcs("delete")}>
            <div
              className={cx(c.delete, c.optionItem, "fas fa-trash")}
              onClick={onClickDelete}
            />
          </Caption>
        </div>

      )}

      <div className={cx(c.content, styleContent)}>
        {getBrText(hypothesis.text)}
      </div>

      {(tags.length !== 0) &&
        <div className={c.footer}>
          <div className={c.tags}>
            {tags}
          </div>
        </div>
      }
    </div>
  );
}

const DndWrapper = (props) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'HYPOTHESIS',
    item: { name: props.hypothesis },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        const { canvas_id } = props.match.params;
        const area_id = dropResult.name.id;
        const hypothesis_id = item.name.id;
        let body = {
          canvas_id: canvas_id,
          area_id: area_id
        };
        props.setHypothesis(hypothesis_id, body);
        props.setCanvas(canvas_id, {})
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  
  return (
    <div ref={drag}>
      <Hypothesis {...props} />
    </div>
  )
}

export default redux(DndWrapper);