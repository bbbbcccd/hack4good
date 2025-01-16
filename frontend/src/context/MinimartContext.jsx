import { useReducer } from "react";
import { MinimartContext } from "./MinimartContext.js";

const minimartReducer = (minimartState, action) => {
  switch (action.type) {
    case "GET_ITEMS":
      return { items: action.payload };
    case "ADD_ITEM":
      return { items: [action.payload, ...minimartState.items] };
    case "DELETE_ITEM":
      return {
        items: minimartState.items.filter(
          (item) => item.name !== action.payload.name
        ),
      };
    case "UPDATE_ITEM":
      return {
        items: minimartState.items.map((item) =>
          item.id === action.payload.name ? action.payload : item
        ),
      };
    default:
      return minimartState;
  }
};

// eslint-disable-next-line react/prop-types
export const MinimartContextProvider = ({ children }) => {
  const [minimartState, minimartDispatch] = useReducer(minimartReducer, {
    items: [],
  });

  return (
    <MinimartContext.Provider value={{ minimartState, minimartDispatch }}>
      {children}
    </MinimartContext.Provider>
  );
};
