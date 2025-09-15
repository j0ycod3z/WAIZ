import * as React from 'react';
import c from 'resources/css/navigation/About.module.css';
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
