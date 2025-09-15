import React from 'react';
import redux from 'seed/redux';
import { Link } from 'react-router-dom';
import c from "resources/css/navigation/sideNav/Waiz.module.css";

function waiz() {
  return (
    <div className={c.element}>
      <Link to={`https://app.gamechangerfunnel.com`}>
        <p style={{ color: "#777" }}>GCF</p>
      </Link>
    </div>
  );
}

export default redux(waiz);