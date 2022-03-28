import React, { Fragment, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCaretRight,
  faPlus,
  faCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  addListItem,
  deleteListItem,
  modifyListItem,
  selectListItems,
  selectCount,
  toggleOpen,
  setFocusItem,
  toggleCompleted,
  orderChildItems,
  setActionType,
  removeChild,
  determineLowestSetPriority,
  getSelectedItem,
  setParentItemId,
} from "../features/list-item-slice";
import * as actionTypes from "../app/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { doc, writeBatch, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../firebase-config";

const StatusBar = (props) => {
  const previousPriority = useRef();
  const dispatch = useDispatch();
  const isCompleted = useSelector((state) => {
    return state.listItems.listItems[props.listItemId]?.isCompleted;
  });

  const actionType = useSelector((state) => {
    return state.listItems.listItems[props.listItemId]?.actionType;
  });

  useEffect(() => {
    if (actionType === actionTypes.ORDER_CHILD_ITEMS) {
      dispatch(orderChildItems(props.listItemId));
    }
    dispatch(
      setActionType({
        idToModify: props.listItemId,
        newActionType: actionTypes.NO_ACTION,
      })
    );
  }, [actionType]);

  useEffect(() => {
    const setPriorityInDb = async () => {
      const batch = writeBatch(db);
      batch.update(doc(db, "list-items", props.parentId), {
        childrenIds: arrayRemove({
          id: props.listItemId,
          priority: previousPriority.current,
        }),
      });
      batch.update(doc(db, "list-items", props.parentId), {
        childrenIds: arrayUnion({
          id: props.listItemId,
          priority: props.priority,
        }),
      });
      await batch.commit();
    };
    if (previousPriority.current !== undefined) {
      //also check if new priority is an integer
      setPriorityInDb();
    }
    previousPriority.current = props.priority;
  }, [props.priority]);

  return (
    <div className="status-bar-wrapper">
      <Priority
        handleCheckItem={props.handleCheckItem}
        isCompleted={isCompleted}
        priority={props.priority}
        hasChildren={props.hasChildren}
      />
      {props.isOpen && props.hasChildren ? (
        <ChildLine
          handleFocusClick={() => {
            props.handleFocusClick(true);
          }}
        />
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
        onClick={() => props.handleCheckItem(!props.isCompleted)}
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
