import { useState, useEffect } from 'react';
import redux from 'seed/redux'
import Tour from '@reactour/tour'

import c from 'components/navigation/Tour.module.scss';
import cSide from 'components/navigation/SideNav.module.scss';
import cSideCanvas from 'components/navigation/sideNav/Canvas.module.scss';
import cSideProject from 'components/navigation/sideNav/Project.module.scss';
import cProfile from 'components/users/Profile.module.scss';

import tabletPng from "resources/images/tablet.png";

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
          <img className={c.image} src={tabletPng} alt="table" />
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
      
      if (res.body.intro_status === "FINISH") return;
      
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
