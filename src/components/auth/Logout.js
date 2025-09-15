import React from "react";
import { useEffect } from "react";
import redux from 'seed/redux';

function Logout(props) {
  useEffect(() => {
    let callback = () => {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/login";
    }
    props.logout(callback);
  }, []);

  return <></>;
}

export default redux(Logout);
