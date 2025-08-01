import { useState, useEffect } from 'react';
import redux from 'seed/redux'
import Tour from 'reactour'

import c from 'resources/css/navigation/Tour.module.css';
import cSide from 'resources/css/navigation/SideNav.module.css';
import cSideCanvas from 'resources/css/navigation/sideNav/Canvas.module.css';
import cSideProject from 'resources/css/navigation/sideNav/Project.module.css';
import cProfile from 'resources/css/users/Profile.module.css';

function TourC(props) {
  const { getUserDetails, setUser, history, match } = props;

  const [isTourOpen, setIsTourOpen] = useState(false);
  const [steps, setSteps] = useState([]);
  
  const welcome = [
    {
      content: () => (
        <div>
          <div className={c.title}>Welcome to wAIz!</div>
          <div className={c.sub}>Forget everything you think you know, instead discover your customer and validate</div>
          <img className={c.image} src={require("resources/images/tablet.png")} />
        </div>
      ),
      style: {
        width: '500px',
        height: '380px'
      }
    },
    {
      selector: `.${cProfile.spacingContainer}`,
      content: () => (
        <div>
          <div className={c.title}>Fill your profile. </div>
          <div className={c.sub}>This helps you to interact with others in wAIz.</div>
        </div>
      )
    },
    {
      selector: `.${cSideCanvas.canvasSection}`,
      content: () => (
        <div>
          <div className={c.title}>Select and leverage the tools you want to work with. </div>
        </div>
      )
    },
    {
      selector: `.${cSide.projects}`,
      content: () => (
        <div>
          <div className={c.title}>Manage all your projects and invite your team and mentors</div>
        </div>
      )
    },
    {
      selector: `.${cSideProject.element}`,
      content: () => (
        <div>
          <div className={c.title}>Document interviews and track performance dashboards.</div>
        </div>
      )
    },
  ];

  useEffect(() => {
    const userId = parseInt(sessionStorage.getItem('id'));

    if (userId != null)
      getUserDetails(userId, (res) => {
      if (!res.ok) return;
      if (res.body.intro_status == "FINISH") return;
      
      const { url } = match;
      setSteps(welcome);
      setIsTourOpen(true);
      history.push(`${url}/profile`)
    });
  });

  const closeTour = () => {
    setIsTourOpen(false);
    const userId = parseInt(sessionStorage.getItem('id'));
    setUser(userId, { intro_status: "FINISH" })
  };
  
  return (
    <Tour
      steps={steps}
      isOpen={isTourOpen}
      onRequestClose={closeTour}
    />
  );
}

export default redux(TourC);
