import * as React from 'react';
import $ from 'jquery'

import c from 'resources/css/helpers/Caption.module.css'


class Caption extends React.Component
{
  render()
  {
    const { children, text, onTop = true, maxLen = 14, offset=-25 } = this.props;

    let sText = text && text.length > maxLen ? text.substring(0, maxLen) + "…" : text;

    return (
      <div className={c.module}
        onMouseEnter={this.showCaption}
        onMouseLeave={this.hideCaption}>
        {onTop ? <div className={c.caption} style={{marginTop: offset}}>{sText}</div> : null}
        {children}
        {!onTop ? <div className={c.caption + " " + c.bottom}>{sText}</div> : null}
      </div>);
  }

  showCaption = e =>
  {
    const call = element =>
    {
      if (element.hasClass(c.focused))
        element.fadeIn(250);
    }
    let element = $(e.currentTarget).find("." + c.caption);
    element.addClass(c.focused);
    window.setTimeout(function () { call(element) }, 200);
  }

  hideCaption = e =>
  {
    let element = $(e.currentTarget).find("." + c.caption);
    element.removeClass(c.focused);
    element.fadeOut(200);
  }
}

export default Caption;