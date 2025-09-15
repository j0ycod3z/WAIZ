import { useEffect } from 'react';
import redux from 'seed/redux';

import YouTube from 'react-youtube';
import { lc, lang } from "components/util/Locales"
import c from 'resources/css/canvas_forms/Help.module.css'

function Help(props) {
  const { match, areaHelps, getAreaHelpList } = props;
  const { area_id } = match.params;

  useEffect(() => {
    getAreaHelpList({ area: area_id });
  }, [area_id, getAreaHelpList]);

  const areaHelp = areaHelps.find((ah) => ah.area_id == area_id);
  if (areaHelp == null) return <></>;

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
  
  return (
    <div className={c.module}>
      { (videoId != "0" && videoId != null) &&
        <YouTube
          videoId={videoId}
          opts={opts}
          className={c.video}
        />
      }
      <div
        className={c.content}
        dangerouslySetInnerHTML={{ __html: lc(areaHelp.l_content) }}>
      </div>
    </div>
  );
}

export default redux(Help);