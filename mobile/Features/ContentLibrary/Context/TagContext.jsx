import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const TagContext = createContext();

export function TagProvider({ children }) {
  const [Tags, setTags] = useState([]);
  const [Favorites, setFavorites] = useState(new Set());
  const [RecommendedTags, setRecommendedTags] = useState([]);

  const initRecommendedTags = (allRecommendedTags) => {
    setRecommendedTags(allRecommendedTags);
  };

  const addFavorite = (newFavorite) => {
    const newSet = new Set(Favorites);
    newSet.add(newFavorite);
    setFavorites(newSet);
  };

  const deleteFavorite = (oldFavorite) => {
    const newSet = new Set(Favorites);
    newSet.delete(oldFavorite);
    setFavorites(newSet);
  };

  const findFavorite = (Favorite) => Favorites.has(Favorite);

  const initFavorites = (allFavorites) => {
    const newSet = new Set();
    for (let index = 0; index < allFavorites.length; index += 1) {
      newSet.add(allFavorites[index].id);
    }
    setFavorites(newSet);
  };

  const updateTag = (index, newTag) => {
    const newTags = [...Tags];
    newTags[index] = newTag;
    setTags(newTags);
  };

  const initTags = (allTags) => {
    setTags(allTags);
  };

  const findTag = (_id) => {
    for (let index = 0; index < Tags.length; index += 1) {
      if (Tags[index]._id === _id) {
        return index;
      }
    }
    return -1;
  };

  const contextValue = useMemo(() => ({
    Tags,
    updateTag,
    initTags,
    findTag,
    Favorites,
    addFavorite,
    deleteFavorite,
    findFavorite,
    initFavorites,
    RecommendedTags,
    initRecommendedTags,
  }), [Tags, updateTag, initTags, findTag, Favorites, addFavorite, deleteFavorite,
    findFavorite, initFavorites, initRecommendedTags, RecommendedTags]);

  return (
    <TagContext.Provider value={contextValue}>
      {children}
    </TagContext.Provider>
  );
}

export default TagContext;

TagProvider.propTypes = {
  children: PropTypes.shape({
  }).isRequired,
};
