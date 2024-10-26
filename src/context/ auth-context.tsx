"use client";

import { auth, db } from "@/firebase/firebaseconfig";
import { UserType } from "@/types/ user-type"; // Fixed the space in the import path
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ChildrenType = {
    children: ReactNode;
};

type ContextType = {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
};

// Create the context
const AuthContext = createContext<ContextType | null>(null);

export default function AuthContextProvider({ children }: ChildrenType) {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserData(user.uid); // Fetch user data
            } else {
                setUser(null); // Set user to null if not authenticated
            }
        });

        return () => unsubscribe(); // Clean up the subscription
    }, []);

    const fetchUserData = async (uid: string): Promise<void> => {
        const docRef = doc(db, "users", uid);
        try {
            const userFound = await getDoc(docRef);
            const userData = userFound.data();

            if (!userData) return; // Return if no user data found

            setUser(userData as UserType); // Update user state
        } catch (e) {
            console.error("Error fetching user data:", e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the auth context
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
