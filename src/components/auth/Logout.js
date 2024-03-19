import * as React from "react";
import redux from 'seed/redux';

class Logout extends React.Component
{
  render()
  {
    return <div></div>;
  }

  componentDidMount()
  {
    let callback = () => {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/login";
    }
    this.props.logout(callback);
  }
}

export default redux(Logout);
