import { useState, useEffect, useRef } from 'react';
import redux from 'seed/redux';

import Nav from 'components/canvas_forms/deepdives/Nav'
import Item from 'components/canvas_forms/deepdives/Item'

import c from 'components/canvas_forms/DeepDive.module.scss'

function DeepDive(props) {
  const { match, deepQuestions, getDeepQuestionList } = props;
  const { area_id } = match.params;
  const isMountedRef = useRef(true);

  const [activeItem, setActiveItem] = useState(() => {
    const stored = localStorage.getItem(`nextItemTemp_${area_id}`);
    return stored ? parseInt(stored) : 1;
  });

  const questions = deepQuestions.filter((d) => d.area_id === parseInt(area_id));
  const numItems = questions.length;
  
  useEffect(() => {
    isMountedRef.current = true;
    getDeepQuestionList({ area: area_id });
    
    return () => {
      isMountedRef.current = false;
    };
  }, [area_id]);

  const onNavChange = (val) => {
    localStorage.setItem(`nextItemTemp_${area_id}`, val)
    setActiveItem(parseInt(val));
  };
  
  return (
    <div className={c.module}>
      <div className={c.navContainer}>
        <Nav
          numItems={numItems}
          activeItem={activeItem}
          onChange={onNavChange}
        />
      </div>
      <div className={c.itemContainer}>
        <Item
          numItems={numItems}
          activeItem={activeItem}
          question={numItems > 0 ? questions[activeItem - 1] : {}}
          onNavChange={onNavChange}
        />
      </div>
    </div>
  );
}

export default redux(DeepDive);