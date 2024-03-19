import * as React from 'react';
import redux from 'seed/redux'
import { lcs, lc } from "components/util/Locales"
import c from 'resources/css/canvas_forms/deepdives/Item.module.css'

class Item extends React.Component
{
  render()
  {
    const { numItems, activeItem } = this.props;
    const { question } = this.props;

    if (question.id == null) return <div></div>

    const next = activeItem < numItems ?
      <a onClick={this.onClickNext}>{lcs("next")}</a> : null;
    const prev = activeItem > 1 ?
      <a onClick={this.onClickPrev}>{lcs("previous")}</a> : null;

    return (
      <div className={c.module}>

        <div className={c.title}><span>{activeItem}.</span>{lc(question.l_content)}</div>
        <div className={c.options}>
          {next}{prev}
        </div>
        <div className={c.formContainer}>
          <form onSubmit={this.onSubmit}>
            <textarea name="text"
              placeholder={lcs("write_your_answer")}
              value={this.state.answer.text}
              onChange={this.onAnswerChange} required />
            <button type="submit">{lcs("save")}</button>
          </form>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = { answer: {} };
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount()
  {
    if (this.props.question.id != null)
      this.loadData(this.props.question.id);
  }

  onSubmit = e =>
  {
    e.preventDefault();
    let answer = this.state.answer;
    const { numItems, activeItem } = this.props;
    if (activeItem < numItems)
      this.props.onNavChange(parseInt(activeItem) + 1)
    if (answer.id == null) {
      answer.canvas_id = this.props.match.params.canvas_id;
      answer.question_id = this.props.question.id;
      this.props.saveDeepAnswer(answer);
    } else
      this.props.setDeepAnswer(answer.id, answer);
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.question !== this.props.question && nextProps.question.id != null)
      this.loadData(nextProps.question.id);
  }

  loadData(questionId)
  {
    const callback = res =>
    {
      if (res.body.length > 0)
        this.setState(s => ({ answer: res.body[0] }))
      else this.setState(s => ({ answer: { text: "" } }))
    }

    this.props.getDeepAnswerList(
      {
        question: questionId,
        canvas: this.props.match.params.canvas_id
      }, callback);
  }

  onClickNext = e =>
  {
    const { activeItem } = this.props;
    this.props.onNavChange(parseInt(activeItem) + 1)
  }

  onClickPrev = e =>
  {
    const { activeItem } = this.props;
    this.props.onNavChange(parseInt(activeItem) - 1)
  }

  onAnswerChange = e =>
  {
    let answer = this.state.answer;
    answer.text = e.target.value;
    this.setState({
      answer: answer
    })
  }
}

export default redux(Item);