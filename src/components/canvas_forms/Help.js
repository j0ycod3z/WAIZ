import * as React from 'react';
import * as Util from 'seed/util'
import redux from 'seed/redux';

import YouTube from 'react-youtube';
import { lcs, lc, lang } from "components/util/Locales"
import c from 'resources/css/canvas_forms/Help.module.css'


class Help extends React.Component
{

  render()
  {
    const { area_id } = this.props.match.params;
    const areaHelp = this.props.areaHelps.filter(ah => ah.area_id == area_id)[0];
    if (areaHelp == null) return <div></div>

    const opts = {
      playerVars: {
        color: "white",
        modestbranding: 0,
        rel: 0,
        showinfo: 0,
        cc_load_policy: lang.startsWith("EN") ? 0 : 1
      }
    };

    const videoId = lc(areaHelp.l_video_id)
    const video = videoId != "0" && videoId != null ?
      <YouTube
        videoId={videoId}
        opts={opts}
        className={c.video} /> : null

    return (
      <div className={c.module}>
        {video}
        <div className={c.content}
          dangerouslySetInnerHTML={{ __html: lc(areaHelp.l_content) }}>
        </div>
      </div>
    );
  }

  componentDidMount()
  {
    const { area_id } = this.props.match.params;
    this.props.getAreaHelpList({area: area_id});
  }
}

export default redux(Help);