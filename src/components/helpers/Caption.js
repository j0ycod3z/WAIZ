import React, { useCallback } from 'react';
import $ from 'jquery'

import c from 'resources/css/helpers/Caption.module.css';

function Caption(props) {
  const {
    children,
    text,
    onTop = true,
    maxLen = 14,
  } = props;

  const sText = text && text.length > maxLen ? text.substring(0, maxLen) + "…" : text;

  const showCaption = useCallback((e) => {
    const element = $(e.currentTarget).find(`.${c.caption}`);
    element.addClass(c.focused);
    setTimeout(() => {
      if (element.hasClass(c.focused))
        element.fadeIn(250);
    }, 200);
  }, []);

  const hideCaption = useCallback((e) => {
    const element = $(e.currentTarget).find(`.${c.caption}`);
    element.removeClass(c.focused);
    element.fadeOut(200);
  }, []);

  return (
    <div
      className={c.module}
      onMouseEnter={showCaption}
      onMouseLeave={hideCaption}
    >
      {onTop &&
        <div className={c.caption}>
          {sText}
        </div>
      }
      {children}
      {!onTop &&
        <div className={`${c.caption} ${c.bottom}`}>
          {sText}
        </div>
      }
    </div>
  );
}

export default Caption;