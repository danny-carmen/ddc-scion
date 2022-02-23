import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyListItemContent } from "../features/list-item-slice";

const EditMenu = (props) => {
  const dispatch = useDispatch();
  const currentFocusItemId = useSelector((state) => {
    return state.listItems.currentFocusItemId;
  });
  const itemToEdit = useSelector((state) => {
    return state.listItems.listItems[currentFocusItemId];
  });

  debugger;
  if (itemToEdit) {
    return (
      <div>
        <textarea
          onChange={(e) => {
            dispatch(
              modifyListItemContent({
                idToModify: currentFocusItemId,
                content: e.target.value,
              })
            );
          }}
        >
          {itemToEdit.content}
        </textarea>
      </div>
    );
  } else {
    return <div>Select an Item to edit</div>;
  }
};

export default EditMenu;
