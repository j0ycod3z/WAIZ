import React, { Component } from "react";

class Chatbot extends Component {
  render() {
    const { url } = this.props;
    // const chatEmbedCode = "<script id='webchat' src='https://cdn.machaao.com/prod/web/js/widget.js' type='text/javascript' themecolor='#2196f3' mkey='YzIyNTcxZTAtZjZlZC0xMWVlLTk0ZDMtN2RkNzQ2NmRlMTg1' avatarurl='https://cdn.machaao.com/static/bots/default/bot-default-face.jpg' launcherposition='right'> </script>";
    return (
      <div>
        <iframe
          title="Embedded Content"
          src="https://www.messengerx.io/mx-waiz" 
          width="100%" 
          height="750px"
          allowFullScreen
        />
      </div>
      // <div>
      //           {/* Replace the below with the actual embed code */}
      //           <div id="messengerx-123456">
      //               <script id="webchat" src="https://cdn.machaao.com/prod/web/js/widget.js" type="text/javascript" themecolor="#2196f3" mkey="YzIyNTcxZTAtZjZlZC0xMWVlLTk0ZDMtN2RkNzQ2NmRlMTg1" avatarurl="https://cdn.machaao.com/static/bots/default/bot-default-face.jpg" launcherposition="right"> </script>
      //           </div>
      //       </div>
    );
  }
}

export default Chatbot;