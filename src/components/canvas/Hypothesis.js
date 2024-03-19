import * as React from 'react';
import redux from 'seed/redux';
import { useDrag } from 'react-dnd'

import $ from 'jquery'
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { lcs, lc } from 'components/util/Locales'
import { hasProjectPermission } from 'components/util/Permissions';
import { getBrText } from 'components/util/Format'

import Caption from 'components/helpers/Caption';

import c from 'resources/css/canvas/Hypothesis.module.css'
import color from '@material-ui/core/colors/yellow';

class Hypothesis extends React.Component
{
  render()
  {
    const { area, hypothesis, project } = this.props;
    const { selectedColor = "" } = this.props;
    const { url } = this.props.match;


    let hypothesisSelected = false;
    for (let color of hypothesis.customers)
      if (color.color == selectedColor) {
        hypothesisSelected = true;
        break;
      }
    let colors = hypothesis.customers.map(color =>
      <Caption text={color.text}>
        <div
          className={c.color}
          onMouseEnter={() => this.onColorEnter(color.color)}
          onMouseLeave={() => this.onColorLeave()}
          style={{
            backgroundColor: color.color,
            height: selectedColor == color.color ? "12px" : "6px",
            width: selectedColor == color.color ? "21px" : "19px"
          }} />
      </Caption>
    );

    if (area.category == "CUSTOMERS") {
      colors.push(
        <Caption text={hypothesis.text}>
          <div
            className={c.color}
            style={{ backgroundColor: hypothesis.color }} />
        </Caption>
      )
    }
    const tags = hypothesis.tags.map(t =>
      <Caption text={lc(t.l_name)}>
        <div className={c.tag}>{lc(t.l_name).substring(0, 1)}</div>
      </Caption>
    );

    let styleContent = "";
    if (hypothesis.is_tested)
      if (hypothesis.is_valid) styleContent = c.valid
      else styleContent = c.invalid

    return (
      <div className={c.module}
        style={{ backgroundColor: !hypothesisSelected ? "#ffffff" : "#f5f5f5" }}
        onMouseEnter={this.showOptions}
        onMouseLeave={this.hideOptions}>

        <div className={c.colors}>
          {colors}
        </div>

        {hasProjectPermission(project, ["MEMBER"]) ?
          <div className={c.options}>
            <Caption text={lcs("validate")}>
              <div className={cx(c.validate, c.optionItem, "fas fa-check")}
                onClick={this.onClickValidate}></div>
            </Caption>
            <Caption text={lcs("invalidate")}>
              <div className={cx(c.invalidate, c.optionItem, "fas fa-ban")}
                onClick={this.onClickInvalidate}></div>
            </Caption>
            <Caption text={lcs("edit")}>
              <Link to={`${url}/edit-hypothesis/${hypothesis.id}`}>
                <div className={c.edit + " " + c.optionItem + " fas fa-edit"}></div>
              </Link>
            </Caption>
            <Caption text={lcs("delete")}>
              <div className={cx(c.delete, c.optionItem, "fas fa-trash")}
                onClick={this.onClickDelete}></div>
            </Caption>
          </div> : null}

        <div className={cx(c.content, styleContent)}>
          { getBrText(hypothesis.text)}
        </div>
        <div className={c.footer}>
          <div className={c.tags}>
            {tags}
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.onClickValidate = this.onClickValidate.bind(this);
    this.onClickInvalidate = this.onClickInvalidate.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  //Events

  onClickValidate = e =>
  {
    const { hypothesis } = this.props;
    let isValid = hypothesis.is_valid;
    let isTested = hypothesis.is_tested;
    let tested = !(isValid && isTested);

    let body = {
      is_valid: true,
      is_tested: tested
    };
    return this.props.setHypothesis(hypothesis.id, body);
  }

  onClickInvalidate = e =>
  {
    const { hypothesis } = this.props;
    let isInvalid = !hypothesis.is_valid;
    let isTested = hypothesis.is_tested;
    let tested = !(isInvalid && isTested);

    let body = {
      is_valid: false,
      is_tested: tested
    };
    return this.props.setHypothesis(hypothesis.id, body);
  }

  onClickDelete = e => 
  {
    const { hypothesis } = this.props;
    let body = {
      is_active: false
    };
    return this.props.setHypothesis(hypothesis.id, body);
  }

  showOptions = e =>
  {
    const call = element =>
    {
      if (element.hasClass(c.focused))
        element.fadeIn(250);
    }
    let element = $(e.currentTarget).find("." + c.options);
    element.addClass(c.focused);
    window.setTimeout(function () { call(element) }, 100);

  }
  hideOptions = e =>
  {
    let element = $(e.currentTarget).find("." + c.options);
    element.removeClass(c.focused);
    element.fadeOut(200);
  }

  onColorEnter = color =>
  {
    const { setSelectedColor = () => { } } = this.props;
    setSelectedColor(color)
  }


  onColorLeave = () =>
  {
    const { setSelectedColor = () => { } } = this.props;
    setSelectedColor("")
  }
}


const DndWrapper = (props) =>
{
  const [{ isDragging }, drag] = useDrag({
    item: { name: props.hypothesis, type: 'HYPOTHESIS' },
    end: (item, monitor) =>
    {
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