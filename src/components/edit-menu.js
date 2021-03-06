import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  determineLowestSetPriority,
  modifyListItemContent,
  orderChildItems,
  setActionType,
  setPriority,
} from "../features/list-item-slice";
import { updateDoc, doc } from "firebase/firestore";

import * as actionTypes from "../app/actionTypes";
import { db } from "../firebase-config";

const EditMenu = (props) => {
  const [selectPriority, setSelectPriority] = useState();
  const timerRef = useRef();
  const dispatch = useDispatch();
  const currentFocusItemId = useSelector((state) => {
    return state.listItems.currentFocusItemId;
  });

  const itemToEdit = useSelector((state) => {
    return state.listItems.listItems[currentFocusItemId];
  });

  const itemPriority = useSelector((state) => {
    return state.listItems.listItems[itemToEdit?.parentId]?.childrenIds.find(
      (childItem) => {
        return childItem.id === currentFocusItemId;
      }
    )?.priority;
  });

  useEffect(() => {
    setSelectPriority(itemPriority);
  }, [itemPriority]);

  const lowestSetPriority = useSelector((state) => {
    const parentId = state.listItems.listItems?.[currentFocusItemId]?.parentId;
    if (parentId === null || parentId === undefined) return 0;
    const childItems = [...state.listItems.listItems[parentId].childrenIds];
    if (childItems.length === 0) {
      return 0;
    }

    const lowestPriority = childItems.reduce(
      (lowestSetPriority, currentChild) => {
        const currentChildPriority = currentChild.priority;
        if (lowestSetPriority <= currentChildPriority)
          return currentChildPriority;
        else return lowestSetPriority;
      },
      0
    );
    return lowestPriority;
  });

  const handlePriorityChange = (e) => {
    dispatch(
      setPriority({ itemId: currentFocusItemId, newPriority: e.target.value })
    );
    dispatch(
      setActionType({
        idToModify: itemToEdit.parentId,
        newActionType: actionTypes.ORDER_CHILD_ITEMS,
      })
    );
  };

  const priorityOptions = () => {
    //create an array of objects with the value and name
    const priorities = [
      { value: 0, text: "No priority" },
      { value: 0.5, text: "Before 1" },
    ];

    [...Array(Math.ceil(lowestSetPriority) + 1)].forEach((_, priority) => {
      if (priority === 0) return;
      priorities.push({ value: priority, text: `${priority}` });
      if (priority !== lowestSetPriority) {
        priorities.push({
          value: priority + 0.5,
          text: `Between ${priority} and ${priority + 1}`,
        });
      }
    });

    priorities.push({
      value: lowestSetPriority + 0.5,
      text: `After ${lowestSetPriority}`,
    });

    return priorities.map((priority) => {
      return <option value={priority.value}>{priority.text}</option>;
    });
  };

  if (itemToEdit) {
    return (
      <div>
        <textarea
          onChange={async (e) => {
            clearTimeout(timerRef.current);
            const newContent = e.target.value;
            timerRef.current = setTimeout(async () => {
              await updateDoc(doc(db, "list-items", currentFocusItemId), {
                content: newContent,
              });
            }, 5000);

            dispatch(
              modifyListItemContent({
                idToModify: currentFocusItemId,
                content: e.target.value,
              })
            );
          }}
          value={itemToEdit.content}
        ></textarea>

        <select
          name="priorities"
          value={selectPriority}
          onChange={handlePriorityChange}
        >
          {priorityOptions()}
        </select>
      </div>
    );
  } else {
    return <div>Select an Item to edit</div>;
  }
};

export default EditMenu;
