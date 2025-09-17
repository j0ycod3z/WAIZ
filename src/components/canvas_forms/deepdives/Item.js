import { useState, useEffect, useRef } from 'react';
import redux from 'seed/redux'
import { lcs, lc } from "components/util/Locales"
import c from 'components/canvas_forms/deepdives/Item.module.scss'

function Item(props){
  const {
    numItems,
    activeItem,
    question,
    match,
    getDeepAnswerList,
  } = props;

  const [answer, setAnswer] = useState({});
  const isMountedRef = useRef(true);
  
  const canvasId = match.params.canvas_id;

  useEffect(() => {
    isMountedRef.current = true;
    
    if (question?.id !== null){
      getDeepAnswerList({
        question: question.id,
        canvas: canvasId
      }, (res) => {
        if (isMountedRef.current) {
          if (res.body.length > 0)
            setAnswer(res.body[0]);
          else
            setAnswer({ text: "" });
        }
      });
    }
    
    return () => isMountedRef.current = false;
  }, [question]);

  // const loadData = (questionId) => {
  // };
  
  const onClickNext = () => props.onNavChange(parseInt(activeItem) + 1);
  const onClickPrev = () => props.onNavChange(parseInt(activeItem) - 1);

  const onAnswerChange = (e) => setAnswer({ ...answer, text: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (activeItem < numItems)
      props.onNavChange(parseInt(activeItem) + 1)
    if (answer.id == null) {
      const newAnswer = {
        ...answer,
        canvas_id: canvasId,
        question_id: question.id,
      };
      props.saveDeepAnswer(newAnswer);
    }
    else
      props.setDeepAnswer(answer.id, answer);
  }

  if (question.id == null) return <></>

  return (
    <div className={c.module}>
      <div className={c.title}><span>{activeItem}.</span>{lc(question.l_content)}</div>
      <div className={c.options}>
        { activeItem < numItems &&
          <button onClick={onClickNext}>{lcs("next")}</button>
        }
        { activeItem > 1 &&
          <button onClick={onClickPrev}>{lcs("previous")}</button>
        }
      </div>
      <div className={c.formContainer}>
        <form onSubmit={onSubmit}>
          <textarea
            name="text"
            placeholder={lcs("write_your_answer")}
            value={answer.text || ""}
            onChange={onAnswerChange}
            required
          />
          <button type="submit">{lcs("save")}</button>
        </form>
      </div>
    </div>
  );
}

export default redux(Item);