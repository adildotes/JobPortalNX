import { AdminType } from "./admin-type";
import { CompanyType } from "./company-type";
import { jobSeekerType } from "./jobseeker-type";





export type UserType = jobSeekerType | CompanyType | AdminType;