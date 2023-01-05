//Library
import { createContext, useReducer } from "react";

//Create an object for creating Context
export const myThemeContext = createContext();

//ThemeProvider for Wrapping (alias for context object)
export const MyThemeProvider = ({ children }) => {

    //My Themes
    const darkTheme = {
        isDark:true,
        headerStyle: "darkHeaderStyle",
        bodyStyle: "darkBodyStyle",
        postStyle: "darkPostStyle"
    }
    const lightTheme = {
        isDark: false,
        headerStyle: "lightHeaderStyle",
        bodyStyle: "lightBodyStyle",
        postStyle: "lightPostStyle"
    }

    //---------Reducer-start---------
    //Initial State
    const initialState = darkTheme;

    //Reducer Function
    const myThemeReducer = (state, action) => {
        switch (action.type) {
            case "LIGHTMODE":
                return { ...state, ...lightTheme };
            case "DARKMODE":
                return { ...state, ...darkTheme };
            default:
                return state;
        }
    }
    //Reducer Hook
    const [state, dispatch] = useReducer(myThemeReducer, initialState);
    //---------Reducer-end---------

    //This will return the Provider with context object
    return <myThemeContext.Provider value={{ myState:state, myDispatch:dispatch }}>
        {/*The children are the Components we wrap 
         * inside the MyThemeProvider in App.js*/}
        {children}
    </myThemeContext.Provider>
}