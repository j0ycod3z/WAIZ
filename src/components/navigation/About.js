import * as React from 'react';
import c from 'components/navigation/About.module.scss';
import waizLogo from 'resources/images/waiz_logo_white.svg';

function About() {
  return (
    <div className={c.module}>
      <div className={c.container}>
        <div>
          <img className={c.logoCanou} alt="Logo" src={waizLogo} />
        </div>
        <div className={c.title}>v5.1.0<span>build12</span></div>
      </div>
    </div>
  );
}

export default About;
