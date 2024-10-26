"use client";
import { auth, db } from "@/firebase/firebaseconfig";
import { UserType } from "@/types/ user-type"; // Fixed the space in the import path
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ChildrenType = {
    children: ReactNode;
};

type ContextType = {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
};

const AuthContext = createContext<ContextType | null>(null);

export default function AuthContextProvider({ children }: ChildrenType) {
    const [user, setUser] = useState<UserType | null>(null);
    const route = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                fetchUserData(uid);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Clean up the subscription
    }, []);

    const fetchUserData = async (uid: string): Promise<void> => {
        const docRef = doc(db, "users", uid);
        try {
            const userFound = await getDoc(docRef);
            const userData = userFound.data();

            if (!userData) return;

            setUser(userData as UserType);
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

export const useAuthContext = () => useContext(AuthContext);
