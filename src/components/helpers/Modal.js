import React, { useState } from "react";
import cx from "classnames";
import ModalContainer from "@mui/material/Modal";
import c from "components/helpers/Modal.module.scss";

function Modal(props) {
  const { children: childrenProp, match, width, height, animation = "zoomIn", onClose: onCloseProp, history } = props;

  const [open, setOpen] = useState(false);

  const onClose = () => {
    if (onCloseProp == null) {
      history.goBack();
    } else {
      onCloseProp(match);
    }
  };

  const children = React.Children.map(childrenProp, (child) => {
    return React.cloneElement(child, {
      onClose: onClose,
      match: match
    });
  });

  const containerStyle = width && height ? {
    width: `${width}px`,
    marginLeft: `${-(width / 2)}px`,
    height: `${height}px`,
    marginTop: `${-(height / 2)}px`
  } : {};

  const closeStyle = width && height ? {
    marginLeft: `${width - 24}px`
  } : {};

  return (
    <ModalContainer
      className={c.module}
      open={true}
      transitionDuration={0}
      onClose={onClose}
    >
      <div className={cx(c.container, "animated", animation)}
        style={containerStyle}>
        <button
          className={c.close}
          style={closeStyle}
          onClick={onClose}
        >
          <i className="fas fa-times" />
        </button>
        {children}
      </div>
    </ModalContainer>
  );
}

export default Modal;