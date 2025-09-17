import React, { useCallback } from 'react';

import c from 'components/helpers/Multiselect.module.scss';

function Multiselect(props) {
  const {
    value = [],
    values = [],
    onChange,
    singleChoice
  } = props;

  const selected = {}
  for (let d of value)
    selected[d] = true;

  const onItemSelected = useCallback((e) => {
    const title = e.currentTarget.title;
    const tVal = !isNaN(title) ? parseInt(title) : title;
    
    let res = [...value];
    let pos = res.indexOf(tVal);

    if (pos === -1)
      res.unshift(tVal)
    else res.splice(pos, 1);
  
    if (!singleChoice)
      onChange(res);
    else onChange(res[0]);
  }, [value, onChange, singleChoice]);

  return (
    <div className={c.module}>{
      values.map((v) => 
        <div key={v.value} className={c.item}>
          <label htmlFor={v.label}>
            <input
              type="checkbox"
              name={v.label}
              id={v.label}
              title={v.value}
              checked={Boolean(selected[v.value])}
              onChange={onItemSelected}
            />
            {v.label}
          </label>
        </div>
      )
    }</div>
  );
}

export default Multiselect;