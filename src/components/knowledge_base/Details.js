import { useEffect } from "react";
import redux from 'seed/redux';

import YouTube from 'react-youtube';
import { lc, getLang } from "components/util/Locales"
import cx from "classnames";
import Loading from 'components/helpers/Loading'

import c from "components/knowledge_base/Details.module.scss";

function Details(props){
  const { kbItems = [], getKbItemDetails, match } = props;
  const { item_id } = match.params;

  useEffect(() => {
    getKbItemDetails(item_id);
  }, [item_id, getKbItemDetails]);

  const item = kbItems.filter(p => p.id == item_id)[0];

  if (item === null || item === undefined) return <Loading />;

  const opts = {
    playerVars: {
      color: "white",
      modestbranding: 0,
      rel: 0,
      showinfo: 0,
      cc_load_policy: getLang().startsWith("EN") ? 0 : 1
    }
  };
  console.log(kbItems);
  
  const videoId = item.video_id;
  
  return (
    <div className={c.module}>
      <div className={cx("card", c.card)}>
        <div className={cx("card-body")}>
          <div className={c.title}>{lc(item.l_title)}</div>
          {(videoId != "0" && videoId != null) &&
            <YouTube
              videoId={videoId}
              opts={opts}
              className={c.video}
            />
          }
          <div>
            {item.files.filter(i => i.lang == getLang()).map((i, index) =>
              <a href={i.url} key={`${i.url}-${index}`}>
                <div className={c.file} style={{color: "#409CE5"}}>
                  {i.url.split("/")[i.url.split("/").length - 1]}
                </div>
              </a>
            )}
          </div>
          <div className={c.content} dangerouslySetInnerHTML={{ __html: lc(item.l_text) }} />
        </div>
      </div>
    </div>
  );
}

export default redux(Details);
