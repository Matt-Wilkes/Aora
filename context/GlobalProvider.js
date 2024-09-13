import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
// callback function that calls the useContext hook, specifies which context we want to get
export const useGlobalContext = () => useContext(GlobalContext);

// context provider
const GlobalProvider = ({children}) => {
    // declare what we want our entire app to have access to
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
// redirect the user to the homepage if they are already logged in 
    useEffect( () => {
        getCurrentUser()
        .then((res) => {
            if (res) {
                // console.log(`res = ${res}`)
                setIsLoggedIn(true);
                setUser(res)
            } else {
                setIsLoggedIn(false)
                setUser(null)
            }
        })
        .catch((error) => {
            // console.log(`error: ${error}`);
        })
        .finally(() => {
            // loading is complete regardless of outcome
            setIsLoading(false)
        })
    }, []);

    return (
        // wrap everything but still display all of the screens properly
        <GlobalContext.Provider 
        // provide values of state to the rest of the application
        value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider