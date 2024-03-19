import React, { Component } from "react";
import redux from 'seed/redux';

import YouTube from 'react-youtube';
import { lc, getLang } from "components/util/Locales"
import cx from "classnames";
import Loading from 'seed/components/helpers/Loading'

import "resources/bootstrap.min.module.css";
import c from "resources/css/knowledge_base/Details.module.css";

class Details extends Component
{
  render()
  {
    const { kbItems = [] } = this.props;
    const { item_id } = this.props.match.params;
    let item = kbItems.filter(p => p.id == item_id)[0];

    if (item == null)
      return <Loading />;

    const opts = {
      playerVars: {
        color: "white",
        modestbranding: 0,
        rel: 0,
        showinfo: 0,
        cc_load_policy: getLang().startsWith("EN") ? 0 : 1
      }
    };

    const videoId = item.video_id;
    const video = videoId != "0" && videoId != null ?
      <YouTube
        videoId={videoId}
        opts={opts}
        className={c.video} /> : null

    return (
      <div className={c.module}>
        <div className={cx("card", c.card)}>
          <div className={cx("card-body")}>

            <div className={c.title}>{lc(item.l_title)}</div>
            {video}
            <div className={c.files}>
              {
                item.files
                  .filter(i => i.lang == getLang())
                  .map(i =>
                    <a href={i.url}>
                      <div className={c.file} style={{color: "#409CE5"}}>
                        {i.url.split("/")[i.url.split("/").length - 1]}
                      </div>
                    </a>)
              }
            </div>
            <div className={c.content}
              dangerouslySetInnerHTML={{ __html: lc(item.l_text) }} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount()
  {
    const { item_id } = this.props.match.params;
    this.loadData(item_id);
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.match.params.item_id !== this.props.match.params.item_id)
      this.loadData(nextProps.match.params.item_id);
  }

  loadData(itemId) 
  {
    this.props.getKbItemDetails(itemId);
  }
}

export default redux(Details);
