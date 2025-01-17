import { useReducer } from "react";
import PropTypes from "prop-types";
import { AdminsContext } from "./AdminsContext.js";

const adminsReducer = (adminsState, action) => {
  switch (action.type) {
    case "GET_ADMINS":
      return { admins: action.payload };
    case "ADD_ADMIN":
      return { admins: [action.payload, ...adminsState.admins] };
    case "DELETE_ADMIN":
      return {
        admins: adminsState.admins.filter(
          (admin) => admin.username !== action.payload.username
        ),
      };
    case "UPDATE_ADMIN":
      return {
        admins: adminsState.admins.map((admin) => {
          if (admin.username === action.payload.currentUsername) {
            return {
              username: action.payload.username,
            };
          } else {
            return admin;
          }
        }),
      };
    default:
      return adminsState;
  }
};

export const AdminsContextProvider = ({ children }) => {
  const [adminsState, adminsDispatch] = useReducer(adminsReducer, {
    admins: [],
  });

  return (
    <AdminsContext.Provider value={{ adminsState, adminsDispatch }}>
      {children}
    </AdminsContext.Provider>
  );
};
AdminsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
