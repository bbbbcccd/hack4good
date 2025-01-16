<<<<<<< HEAD
import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
=======
import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
>>>>>>> auth

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

<<<<<<< HEAD
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
=======
  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
>>>>>>> auth
};
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
