import React, { useCallback } from 'react';

import c from 'components/helpers/TagPicker.module.scss';

function TagPicker(props) {
  const {
    value = [],
    values = [],
    onChange,
    singleChoice,
  } = props;

  const selected = {}
  for (let d of value)
    selected[d] = true;

  const onItemSelected = useCallback((e) => {
    const title = e.currentTarget.title;
    const tVal = !isNaN(title) ? parseInt(title) : title;
    
    const res = [...value];
    const pos = res.indexOf(tVal);
    if (pos === -1)
      res.unshift(tVal)
    else
      res.splice(pos, 1);

    if (!singleChoice)
      onChange(res);
    else
      onChange(res[0])
  }, [value, onChange, singleChoice]);

  const items = values.map((v) => {
    const isSelected = Boolean(selected[v.value]);

    return (
      <div
        key={v.value}
        className={c.item}
        onClick={onItemSelected}
        style={{ backgroundColor: v.color }}
        title={v.value}
      >
        {isSelected &&
          <div className={c.tick + " fas fa-check"} />
        }
      </div>
    );
  });
  
  return <div className={c.module}>{items}</div>;
}

// class TagPicker extends React.Component {
//   render() {
//     const { value = [], values = [] } = this.props;

//     let selected = {}
//     for (let d of value)
//       selected[d] = true;

//     let items = values.map((v) => {
//       const isSelected = Boolean(selected[v.value]);
//       let tick = isSelected && <div className={c.tick + " fas fa-check"} />;
//       return (
//         <div
//           className={c.item}
//           onClick={this.onItemSelected}
//           style={{
//             backgroundColor: v.color,
//             color: "#fff"
//           }}
//           title={v.value}
//         >
//           {v.label ? v.label : <span>&nbsp;</span>} {tick}
//         </div>
//       );
//     });

//     return <div className={c.module}>{items}</div>;
//   }

//   constructor(props) {
//     super(props);
//     this.onItemSelected = this.onItemSelected.bind(this);
//   }

//   onItemSelected = (e) => {
//     const singleChoice = this.props.singleChoice;
//     const title = e.currentTarget.title;
//     const tVal = !isNaN(title) ? parseInt(title) : title;
    
//     let res = this.props.value;
//     let pos = res.indexOf(tVal);
//     if (pos == -1)
//       res.unshift(tVal)
//     else res.splice(pos, 1);

//     if (!singleChoice)
//       this.props.onChange(res);
//     else this.props.onChange(res[0])
//   }
// }

export default TagPicker;