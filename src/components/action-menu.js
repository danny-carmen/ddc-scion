import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addListItem,
  deleteListItem,
  setSelectedItem,
  toggleOpen,
  setMode,
  moveListItem,
  setChild,
  setFocusItem,
  finishAction,
  removeChild,
  deleteListItemAndChildren,
  orderChildItems,
  clearIdsToDelete,
  clearChildToRemove,
} from "../features/list-item-slice";
import {
  faArrowsAlt,
  faCog,
  faCopy,
  faEye,
  faInfo,
  faPlus,
  faSearch,
  faShare,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import * as actionTypes from "../app/actionTypes";
import IconButton from "./icon-button";
import * as TAB_NAMES from "../app/tabNames";
import { setMenu } from "../features/menu-slice";
import {
  addDoc,
  doc,
  collection,
  writeBatch,
  arrayUnion,
  setDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase-config";

const ActionMenu = (props) => {
  let dispatch = useDispatch();
  useEffect(() => {
    console.log("The action menu rendered.");
  });

  const {
    currentFocusItemId,
    currentMode,
    currentSelectedItemId,
    idsToDelete,
    childToRemove,
  } = useSelector((state) => {
    return state.listItems;
  });

  useEffect(() => {
    const deleteIdsFromDb = async () => {
      if (idsToDelete.length > 0) {
        const batch = writeBatch(db);

        idsToDelete.forEach((id) => {
          batch.delete(doc(db, "list-items", id));
        });

        await batch.commit();

        dispatch(clearIdsToDelete());
      }
    };

    deleteIdsFromDb();
  }, [idsToDelete]);

  useEffect(() => {
    const removeChildFromDb = async () => {
      if (Object.keys(childToRemove).length > 0) {
        await setDoc(
          doc(db, "list-items", childToRemove.parentId),
          {
            childrenIds: arrayRemove({
              id: childToRemove.childId,
              priority: childToRemove.priority,
            }),
          },
          { merge: true }
        );
        dispatch(clearChildToRemove());
      }
    };

    removeChildFromDb();
  }, [childToRemove]);

  async function handleAddNewListItem() {
    const newListItemRef = doc(collection(db, "list-items"));
    const batch = writeBatch(db);

    batch.set(
      doc(db, "list-items", currentFocusItemId),
      {
        isOpen: true,
        childrenIds: arrayUnion({ id: newListItemRef.id, priority: 0 }),
      },
      { merge: true }
    );
    batch.set(newListItemRef, {
      listItemVersion: "0.0.1",
      list: props.currentList,
      isOpen: true,
      content: "",
      childrenIds: [],
      isCompleted: false,
    });

    await batch.commit();

    dispatch(toggleOpen({ idToModify: null, setOpen: true }));

    dispatch(addListItem(newListItemRef.id));
  }

  function openMenu(payload) {
    dispatch(setMenu(payload));
  }

  function handleMoveListItem() {
    dispatch(setSelectedItem());
    dispatch(setMode(actionTypes.MOVE_LIST_ITEM));
  }

  useEffect(() => {
    if (currentMode === actionTypes.MOVE_LIST_ITEM) {
      dispatch(removeChild(currentSelectedItemId));
      dispatch(orderChildItems(currentFocusItemId));
      dispatch(setChild());
      dispatch(finishAction());
    }
  }, [currentFocusItemId]);

  async function handleDeleteListItem() {
    dispatch(removeChild(currentFocusItemId));
    dispatch(deleteListItemAndChildren());
  }

  return (
    <>
      <div className="action-menu general-actions">
        <IconButton
          icon={faSearch}
          text="Search"
          openMenu={openMenu}
          tabName={TAB_NAMES.SEARCH}
        />
        <IconButton
          icon={faEye}
          text="Appearance"
          openMenu={openMenu}
          tabName={TAB_NAMES.VIEW}
        />
        <IconButton
          icon={faCog}
          text="Settings"
          openMenu={openMenu}
          tabName={TAB_NAMES.SETTINGS}
        />
        <IconButton
          icon={faShare}
          text="Export"
          openMenu={openMenu}
          tabName={TAB_NAMES.EXPORT}
        />
        <IconButton
          icon={faUser}
          text="Account"
          openMenu={openMenu}
          tabName={TAB_NAMES.ACCOUNT}
        />
      </div>
      <div className="action-menu list-actions">
        <IconButton
          icon={faInfo}
          text="Edit List Item"
          openMenu={openMenu}
          tabName={TAB_NAMES.EDIT_LIST_ITEM}
        />
        <IconButton
          icon={faTrash}
          text="Delete List Item"
          primaryAction={handleDeleteListItem}
          openMenu={openMenu}
          tabName={TAB_NAMES.DELETE_LIST_ITEM}
        />
        <IconButton
          icon={faArrowsAlt}
          text="Move List Item"
          primaryAction={handleMoveListItem}
          openMenu={openMenu}
          tabName={TAB_NAMES.MOVE_LIST_ITEM}
        />
        <IconButton
          icon={faCopy}
          text="Copy List Item"
          primaryAction={handleAddNewListItem}
          openMenu={openMenu}
          tabName={TAB_NAMES.COPY_LIST_ITEM}
        />
        <IconButton
          icon={faPlus}
          text="Add List Item"
          primaryAction={handleAddNewListItem}
          openMenu={openMenu}
          tabName={TAB_NAMES.ADD_LIST_ITEM}
        />
      </div>
    </>
  );
};

export default ActionMenu;
