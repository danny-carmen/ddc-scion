import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../features/menu-slice";

const IconButton = (props) => {
  const dispatch = useDispatch();
  const clickCount = useRef(0);

  const clickListener = () => {
    clickCount.current += 1;
    if (clickCount.current <= 1) {
      setTimeout(() => {
        if (clickCount.current === 1) {
          props.openMenu({ tabName: props.tabName });
        } else {
          if (props.primaryAction) props.primaryAction();
          else props.openMenu({ tabName: props.tabName });
        }

        clickCount.current = 0;
      }, 200);
    }
  };

  const currentSelectedMenu = useSelector((state) => {
    return state.menu.currentMenu;
  });

  return (
    <div
      className={`${
        currentSelectedMenu === props.tabName
          ? "icon-button-selected"
          : "icon-button"
      }`}
    >
      <button
        onClick={() => {
          clickListener();
        }}
      >
        <FontAwesomeIcon icon={props.icon} />
      </button>
      <div className="icon-button-text">{props.text}</div>
    </div>
  );
};

export default IconButton;
