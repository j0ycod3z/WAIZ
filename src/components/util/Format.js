const getBrText = (text) => {
  let res = []
  let rows = text.split("\n")
  for (let i = 0; i < rows.length; i++) {
    res.push(<div key={i}>{rows[i]}<br/></div>)
  }
  return res;
}

export { getBrText };