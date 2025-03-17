export const initialStore = () => ({
  characters: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || []
});

export default function storeReducer(store, action) {
  switch (action.type) {
    case "SET_CHARACTERS":
      return { ...store, characters: action.payload };

    case "ADD_FAVORITE":
      const added = [...store.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(added));
      return { ...store, favorites: added };

    case "REMOVE_FAVORITE":
      const removed = store.favorites.filter((item) => item !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(removed));
      return { ...store, favorites: removed };

    default:
      return store;
  }
}
