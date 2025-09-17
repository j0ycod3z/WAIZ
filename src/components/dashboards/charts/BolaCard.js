import React from 'react';
import c from 'components/dashboards/charts/Charts.module.scss';

function BolaCard() {
  return(
    <div className={c.module}>
      <div className={c.BolaCard}>
        <div className={c.circle}>
          <p className={c.number}>56</p>
          <p className={c.title}><span className={c.bigTitle}>Startups</span><br/>In this industry</p>
        </div>
      </div>
    </div>
  )
}

export default BolaCard;