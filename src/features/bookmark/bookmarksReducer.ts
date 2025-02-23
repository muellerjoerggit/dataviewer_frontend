import {ADD_BOOKMARK, TOGGLE_BOOKMARK} from "@/features/bookmark/overviewBookmarksConstants.ts";
import {NULL_ENTITY} from "@/features/entity/entityConstants.ts";
import {BookmarkList} from "@/features/bookmark/bookmarksTypes.ts";


export function changeBookmarks(state, action)  {

  let newState = {...state};

  switch (action.type) {
    case ADD_BOOKMARK:
      const entityType = getEntityType(action.entityKey);
      if(!newState[entityType]) newState[entityType] = {};
      newState[entityType][action.entityKey] = {};
      break;
    case TOGGLE_BOOKMARK:
      const entityKeyToggle = action.entityKey;
      const entityTypeToggle = getEntityType(entityKeyToggle);
      if(!(entityTypeToggle in newState)) newState[entityTypeToggle] = {};
      if(entityKeyToggle in newState[entityTypeToggle]) {
        delete newState[entityTypeToggle][entityKeyToggle];
      } else {
        newState[entityTypeToggle][entityKeyToggle] = {};
      }
  }

  newState = Object.keys(newState)
      .filter( (entityTypeFilter: string) => Object.keys(newState[entityTypeFilter]).length > 0 )
      .reduce( (filteredState, key) => (filteredState[key] = newState[key], filteredState), {} );

  return newState;
}

function getEntityType(entityKey: string) {
  const split = entityKey.split('::');
  if(split.length > 1) {
    return split[1];
  }

  return NULL_ENTITY;
}

export function isBookmarkedInternal(entityKey: string | undefined, bookmarksList: BookmarkList) {
  if(!entityKey) return false;

  const entityType = getEntityType(entityKey);

  if(!(entityType in bookmarksList)) return false;
  return entityKey in bookmarksList[entityType];
}