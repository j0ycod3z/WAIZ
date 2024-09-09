import * as React from 'react';
import c from 'resources/css/navigation/About.module.css';

class About extends React.Component
{
  render()
  {
    return (
      <div className={c.background} style={{ background: "url(" + require("resources/images/wave.svg") + ") no-repeat center center", backgroundColor: "#29244e" }}>
        <div className={c.module}>
          <div className={c.container}>
            <div>
              <img className={c.logoCanou} alt="Logo"
                src={require("resources/images/waiz_logo_white.svg")} />
            </div>
            {/* <div className={c.title}>v5.1.0<span>build12</span></div> */}
          </div>
        </div>
      </div >
    );
  }

}

export default About;
