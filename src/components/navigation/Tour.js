import * as React from 'react';
import redux from 'seed/redux'
import Tour from 'reactour'

import c from 'resources/css/navigation/Tour.module.css';
import c2 from 'resources/css/canvas/Area.module.css';
import c3 from 'resources/css/canvas/Hypothesis.module.css';
import cSide from 'resources/css/navigation/SideNav.module.css';
import cSideCanvas from 'resources/css/navigation/sideNav/Canvas.module.css';
import cSideProject from 'resources/css/navigation/sideNav/Project.module.css';
import cProfile from 'resources/css/users/Profile.module.css';



class TourC extends React.Component
{
  welcome = [
    {
      content: () => (
        <div>
          <div className={c.title}>Welcome to waiz!</div>
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
      selector: '.' + cProfile.spacingContainer,
      content: () => (
        <div>
          <div className={c.title}>Fill your profile. </div>
          <div className={c.sub}>This helps you to interact with others in waiz.</div>
        </div>
      )
    },
    {
      selector: '.' + cSideCanvas.canvasSection,
      content: () => (
        <div>
          <div className={c.title}>Select and leverage the tools you want to work with. </div>
        </div>
      )
    },
    {
      selector: '.' + cSide.projects,
      content: () => (
        <div>
          <div className={c.title}>Manage all your projects and invite your team and mentors</div>
        </div>
      )
    },
    {
      selector: '.' + cSideProject.element,
      content: () => (
        <div>
          <div className={c.title}>Document interviews and track performance dashboards.</div>
        </div>
      )
    },
  ]
  

  render()
  {
    return (
      <Tour
        steps={this.state.steps}
        isOpen={this.state.isTourOpen}
        onRequestClose={this.closeTour} />
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      isTourOpen: false,
      steps: []
    }
    this.closeTour = this.closeTour.bind();
  }

  componentDidMount()
  {
    const callback = res =>
    {
      if (!res.ok) return;
      let status = res.body.intro_status;
      if (status == "FINISH") return;
      this.runWelcome();

    }
    const userId = parseInt(sessionStorage.getItem('id'));
    if (userId != null)
      this.props.getUserDetails(userId, callback)
  }

  runWelcome()
  {
    const { url } = this.props.match;
    this.setState({ isTourOpen: true, steps: this.welcome })
    this.props.history.push(`${url}/profile`)
  }

  closeTour = () =>
  {
    this.setState({ isTourOpen: false })
    const userId = parseInt(sessionStorage.getItem('id'));
    this.props.setUser(userId, { intro_status: "FINISH" })
  }
}

export default redux(TourC);
