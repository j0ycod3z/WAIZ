import React, { Component } from "react";

class GameChangerFunnel extends Component {
  render() {
    const { url } = this.props;

    return (
      <div>
        <iframe
          title="Embedded Content"
          src="https://www.gamechangerfunnel.com/" 
          width="100%" 
          height="750px"
          allowFullScreen
          target="_parent" 
        />
      </div>
    );
  }
}

export default GameChangerFunnel;