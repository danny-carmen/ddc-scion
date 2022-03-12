import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCaretRight,
  faPlus,
  faCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const StatusBar = (props) => {
  return (
    <div className="status-bar-wrapper">
      <Priority
        handleCheckItem={props.handleCheckItem}
        isCompleted={props.isCompleted}
        priority={props.priority}
        hasChildren={props.hasChildren}
      />
      {props.isOpen && props.hasChildren ? (
        <ChildLine handleFocusClick={props.handleFocusClick} />
      ) : null}
    </div>
  );
};

const Priority = (props) => {
  const priority = props.priority ? props.priority : " ";
  return (
    <Fragment>
      <div
        className={props.hasChildren ? "priority with-children" : "priority"}
        onClick={props.handleCheckItem}
      ></div>
      <div className="priority-text">
        {props.isCompleted ? (
          <FontAwesomeIcon className="arrow" icon={faCheck} />
        ) : (
          priority
        )}
      </div>
    </Fragment>
  );
};

const OpenSymbol = (props) => {
  return (
    <div className="list-item-symbol-container">
      <div
        onClick={props.handleOpenClick}
        className={
          props.isOpen ? "list-item-symbol open" : "list-item-symbol closed"
        }
      >
        <FontAwesomeIcon className="arrow" icon={faCaretRight} />
      </div>
    </div>
  );
};

const ChildLine = (props) => {
  return (
    <div className="line-wrapper" onClick={props.handleFocusClick}>
      <div className="line"></div>
    </div>
  );
};
export default StatusBar;
