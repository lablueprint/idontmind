import React, { createContext, useState } from 'react';

const TagContext = createContext();

export const TagProvider = ({ children }) => {
    const [Tags, setTags] = useState([]);
    const [Favorites, setFavorites] = useState(new Set());

    const addFavorite = (newFavorite) => {
        const newSet = new Set(Favorites);
        newSet.add(newFavorite);
        setFavorites(newSet);
    };

    const deleteFavorite = (oldFavorite) => {
        const newSet = new Set(Favorites);
        console.log("HELLLO");
        const result = newSet.delete(oldFavorite);
        console.log("the result is " + result);
        setFavorites(newSet);
    }

    const findFavorite = (Favorite) => {
        return Favorites.has(Favorite);
    }

    const initFavorites = (allFavorites) => {
        const newSet = new Set(allFavorites);
        setFavorites(newSet);
    }
    
    const updateTag = (index, newTag) => {
        const newTags = [...Tags];
        newTags[index] = newTag
        setTags(newTags);
    };

    const initTags = (allTags) => {
        setTags(allTags);
    };

    const findTag = (_id) => {
        for (let index = 0; index < Tags.length; index++) {
            if (Tags[index]._id == _id) {
                return index;
            }
        }
    }

    return (
        <TagContext.Provider value={{ Tags, updateTag, initTags, findTag, Favorites, addFavorite, deleteFavorite, findFavorite, initFavorites }}>
          {children}
        </TagContext.Provider>
      );    
}

export default TagContext;