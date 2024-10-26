"use client";

import UsersData from "@/components/users-data";
import { db } from "@/firebase/firebaseconfig";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AllUsers() {
    const [users, setUsers] = useState<DocumentData[]>([]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        const userRef = collection(db, "users");
        const usersSnapshot = await getDocs(userRef);
        const usersList = usersSnapshot.docs.map((user) => ({
            id: user.id, // Make sure to include user id for key prop
            ...user.data(),
        }));
        setUsers(usersList);
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>User Type</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 &&
                        users.map(({ id, name, email, role, pic, logo }) => (
                            <UsersData
                                key={id} // Key prop added here
                                name={name}
                                email={email}
                                role={role}
                                pic={pic}
                                logo={logo}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
}
