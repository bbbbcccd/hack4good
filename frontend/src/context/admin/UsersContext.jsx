import { useReducer } from "react";
import PropTypes from "prop-types";
import { UsersContext } from "./UsersContext.js";

const usersReducer = (usersState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { users: action.payload };
    case "ADD_USER":
      return { users: [action.payload, ...usersState.users] };
    case "DELETE_USER":
      return {
        users: usersState.users.filter(
          (user) => user.username !== action.payload.username
        ),
      };
    case "UPDATE_USER":
      return {
        users: usersState.users.map((user) => {
          if (user.username === action.payload.currentUsername) {
            return {
              username: action.payload.username,
              vouchers: action.payload.vouchers,
              phone_number: action.payload.phone_number,
            };
          } else {
            return user;
          }
        }),
      };
    default:
      return usersState;
  }
};

export const UsersContextProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(usersReducer, {
    users: [],
  });

  return (
    <UsersContext.Provider value={{ usersState, usersDispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
UsersContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
