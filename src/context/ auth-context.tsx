"use client";
import { auth, db } from "@/firebase/firebaseconfig";
import { UserType } from "@/types/ user-type"; // Corrected path
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextProps = {
    children: ReactNode;
};

type AuthContextType = {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: AuthContextProps) {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                fetchUserData(firebaseUser.uid);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Clean up the subscription
    }, []);

    const fetchUserData = async (uid: string): Promise<void> => {
        try {
            const docRef = doc(db, "users", uid);
            const userFound = await getDoc(docRef);

            if (userFound.exists()) {
                setUser(userFound.data() as UserType);
            } else {
                console.warn("User data not found.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within an AuthContextProvider");
    return context;
};
