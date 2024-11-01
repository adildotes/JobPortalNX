import { useAuthContext } from "@/context/ auth-context";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const CompanyProtectedRoutes: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "job seeker":
          router.push("/jobseeker");
          break;
        case "admin":
          router.push("/admin");
          break;
        case "company":
          if (!user.name) router.push("/company/companyinfo");
          break;
        default:
          router.push("/login");
      }
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>; // Replace with a loading spinner component if available
  }

  return <>{children}</>;
};

export default CompanyProtectedRoutes;
