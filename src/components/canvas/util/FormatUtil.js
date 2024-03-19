import { lc, lcs } from 'components/util/Locales'

const hypothesisToCsv = (hypothesis, type) =>
{
  let res = [];
  type.areas.map(area => 
  {
    const hs = hypothesis.filter(h => h.area_id == area.id && h.is_active).map(h => h.text);
    if (hs.length == 0) {
      let data = {};
      data[lcs("building_block")] = lc(area.l_name);
      data[lcs("hypotheses")] = "";
      res.push(data);
    } else {
      for (let h of hs) {
        let data = {};
        data[lcs("building_block")] = lc(area.l_name);
        data[lcs("hypotheses")] = h;
        res.push(data);
      }
    }
  });
  return res;
}

export { hypothesisToCsv };