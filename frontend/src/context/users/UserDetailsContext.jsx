import { useReducer } from "react";
import PropTypes from "prop-types";
import { UserDetailsContext } from "./UserDetailsContext.js";

const userDetailsReducer = (userDetailsState, action) => {
  switch (action.type) {
    case "GET_USER":
      return { user: action.payload };
    default:
      return userDetailsState;
  }
};

export const UserDetailsContextProvider = ({ children }) => {
  const [userDetailsState, userDetailsDispatch] = useReducer(
    userDetailsReducer,
    {
      user: {},
    }
  );

  return (
    <UserDetailsContext.Provider
      value={{ userDetailsState, userDetailsDispatch }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};
UserDetailsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
