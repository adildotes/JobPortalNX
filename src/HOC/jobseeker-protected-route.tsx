
import { useAuthContext } from "@/context/ auth-context"; // Ensure path is correct
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type JobSeekerProtectedRoutesTypes = {
    children: ReactNode;
};

export default function JobSeekerProtectedRoute({ children }: JobSeekerProtectedRoutesTypes) {
    const { user } = useAuthContext()!;
    const route = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") { // Ensure this runs on the client side
            if (user?.role === "company") {
                route.push("/company/all-jobs");
            } else if (user?.role === "admin") {
                route.push("/admin");
            } else if (user && user.role === "job seeker" && !("name" in user)) {
                route.push("/jobseeker/jobseekerinfo");
            }
        }
    }, [user, route]);

    return <>{children}</>;
}
