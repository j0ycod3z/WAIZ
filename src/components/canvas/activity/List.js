import * as React from 'react';
import cx from 'classnames';

import c from 'resources/css/canvas/activity/List.module.css';


function ActivityFeed() {
  return (
    <section className={c.module}>
  
      <div className={c.feedBody}>
        <h1 className={c.title}>Updates</h1>
  
        <div className={c.feeds}>
  
          <div className={c.feed}>
            <div className={c.feedLeft}>
              <div className={cx(c.ring, c.red)}></div>
            </div>
            <div className={c.feedRight}>
              <div className={c.feedTop}>
                <p className={c.feedTitle}><b>Gerardo Torres</b> ha validado una hipótesis</p>
                <p className={c.date}>Today, 2:45 PM</p>
              </div>
              <div className={c.feedText}>
                <p className={c.feedTextInfo}>Registro del 100% de las actividades para reducir en un 68% la contratación de consultores para la integración del expediente para el cumplimiento ante la ASEA.</p>
              </div>
            </div>
          </div>
  
          <div className={c.feed}>
            <div className={c.feedLeft}>
              <div className={cx(c.ring, c.purple)}></div>
            </div>
            <div className={c.feedRight}>
              <div className={c.feedTop}>
                <p className={c.feedTitle}><b>Marina Gomez</b> ha creado una hipótesis en Blue Origin</p>
                <p className={c.date}>Yesterday, 9:05 PM</p>
              </div>
              <div className={c.feedText}>
                <p className={c.feedTextInfo}>Registro del 100% de las actividades para reducir en un 68% la contratación de consultores para la integración del expediente para el cumplimiento ante la ASEA.</p>
              </div>
            </div>
          </div>
  
          <div className={c.feed}>
            <div className={c.feedLeft}>
              <div className={cx(c.ring, c.green)}></div>
            </div>
            <div className={c.feedRight}>
              <div className={c.feedTop}>
                <p className={c.feedTitle}><b>Gerardo Torres</b> ha validado una hipótesis en Tesla</p>
                <p className={c.date}>April 13, 10:32 PM</p>
              </div>
              <div className={c.feedText}>
                <p className={c.feedTextInfo}>Registro del 100% de las actividades para reducir en un 68% la contratación de consultores para la integración del expediente para el cumplimiento ante la ASEA.</p>
              </div>
            </div>
          </div>
  
        </div>
  
      </div>
    </section>
  )
}

export default ActivityFeed;