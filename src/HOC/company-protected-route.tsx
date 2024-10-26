import { useAuthContext } from "@/context/ auth-context";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type CompanyProtectedRoutesTypes = {
  children: ReactNode;
};

export default function CompanyProtectedRoutes({ children }: CompanyProtectedRoutesTypes) {
  const { user } : any = useAuthContext(); // No need for the exclamation mark
  const route = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "job seeker") {
        route.push("/jobseeker");
      } else if (user.role === "admin") {
        route.push("/admin");
      } else if (user.role === "company" && !("name" in user)) {
        route.push("/company/companyinfo");
      }
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // or any loading component you have
  }

  return <>{children}</>;
}
