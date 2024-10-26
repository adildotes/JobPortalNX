
interface UsersDataProps {
    name: string;
    email: string;
    role: string;
    pic?: string; // Optional since pic or logo might be missing
    logo?: string; // Optional
}

export default function UsersData({ name, email, role, pic, logo }: UsersDataProps) {
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={pic || logo || "/default-avatar.png"} // Ensure fallback image if both pic and logo are null
                                alt={`${name}'s Avatar`}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{email}</div>
                    </div>
                </div>
            </td>
            <td>{role}</td>
            <td>
                <select className="select select-bordered w-full max-w-xs" defaultValue="">
                    <option value="" disabled>Select Action</option>
                    <option>Delete</option>
                    <option>Block</option>
                </select>
            </td>
        </tr>
    );
}
