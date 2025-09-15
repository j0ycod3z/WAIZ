import React from 'react';

function GameChangerFunnel({ url }) {

  return (
    <div>
      <iframe
        title='Game Changer Funnel'
        src={url || 'https://www.gamechangerfunnel.com/'}
        width='100%'
        height='750px'
        allow='fullscreen'
        target='_parent'
      />
    </div>
  );
}


export default GameChangerFunnel;