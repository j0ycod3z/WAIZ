const selectStyle = {
  control: c => ({
    ...c,
    backgroundColor: "#6c757d;",
    border: "0px",
    boderRadious: "3px",
  }),
  singleValue: c => ({
    ...c,
    color: "#cbcbcb",
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: "0px 5px"
  }),
  indicatorSeparator: c => ({
    ...c,
    backgroundColor: "rgba(255,255,255,0.4)",
  }),
  option: (c, state) => ({
    ...c,
    backgroundColor: state.isSelected ? '#409ce5' : '#fff',
    color: state.isSelected ? '#fff' : '#333'
  }),
  placeholder: c => ({
    ...c,
    color: "rgba(255,255,255,0.7)"
  })
};

export { selectStyle };
