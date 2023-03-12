import { createContext, useState, useContext, useEffect } from "react"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";

// Create context
const AuthContext = createContext<any>({});

// Provider Context
export const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<Object | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);


    const signIn = (email: string, password: string) => {
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    const user = userCredential.user;
                    setCurrentUser(user);
                    setLoading(false)
                })
                .catch((error) => {
                    setCurrentUser(null)
                    setLoading(false)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } catch (error) {
            setLoading(false)
        }

    }

    // Register user
    const signUp = (email: string, password: string) => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setCurrentUser(user);
                    setLoading(false)
                })
                .catch((error) => {
                    setCurrentUser(null)
                    setLoading(false)
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                });
        } catch (error) {
            setLoading(false)
        }

    }

    // SignOut user
    const logOut = () => signOut(auth);

    const value = {
        currentUser,
        setCurrentUser,
        signIn,
        signUp,
        logOut,
    }

    // Set currentUser
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}