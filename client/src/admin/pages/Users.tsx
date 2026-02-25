import { useState } from "react";
import UserForm from "../components/UserForm";
import { User, UserRole, useUsers, usePatchUser } from "../../hooks/useUsers";
import { useAuth } from "../../context/AuthContext";

const Users = () => {
    const { user: currentUser } = useAuth();
    const { data: users = [], isLoading } = useUsers();
    const patchUser = usePatchUser();
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");

    const filteredUsers = Array.isArray(users)
        ? roleFilter === "all"
            ? users
            : users.filter((u) => u.role === roleFilter)
        : [];


    const handleSave = (user: User) => {
        if (!user.id) {
            patchUser.mutate(user as Partial<User> & { _id: string });
            setEditingUser(null);
        }
    };

    // const handleDelete = (id: string) => {
    //     if (window.confirm("Are you sure you want to delete this user?")) {
    //         // patchUser.mutate({ id, status: "deleted" });
    //     }
    // };

    if (isLoading) return <div>Loading users...</div>;

    if (editingUser) {
        return (
            <UserForm
                currentUserRole={currentUser?.role || "customer"}
                initialData={editingUser}
                onCancel={() => setEditingUser(null)}
                onSave={handleSave}
            />
        );
    }

    return (
        <div>
            {/* <div className="mb-6 flex items-center justify-between"> */}
            <div className="mb-6 mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Users</h1>
                {/* {currentUser?.role === "admin" && (
                    <button
                        onClick={() =>
                            setEditingUser({
                                id: crypto.randomUUID(),
                                firstName: "",
                                lastName: "",
                                email: "",
                                phone: "",
                                role: "customer",
                                status: "active",
                                emailVerified: false,
                                phoneVerified: false,
                                twoFactorEnabled: false,
                                addresses: [],
                                totalOrders: 0,
                                totalSpent: 0,
                                newsletterSubscribed: false,
                                marketingConsent: false,
                                permissions: { read: false, edit: false },
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                                authProvider: "email",
                            })
                        }
                        className="rounded-lg bg-black px-4 py-2 text-white"
                    >
                        + Add User
                    </button>
                )} */}
                <div className="mb-4 flex items-center gap-3">
                    <label className="text-sm font-medium">Filter by role:</label>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
                        className="border rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="all">All</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
                <table className="w-full text-sm">

                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold">User</th>
                            <th className="px-6 py-4 text-left font-semibold">Email</th>
                            <th className="px-6 py-4 text-left font-semibold">Role</th>
                            <th className="px-6 py-4 text-left font-semibold">Status</th>
                            <th className="px-6 py-4 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {filteredUsers.map((u, index) => (

                            <tr
                                key={u.id}
                                className={`
                                    transition duration-200 hover:bg-blue-50
                                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50/40"}
                                    `}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                                            {u.firstName?.charAt(0)}
                                        </div>
                                        <div className="font-medium text-gray-800">
                                            {u.firstName} {u.lastName}
                                        </div>

                                    </div>
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {u.email}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full capitalize
                                            ${u.role === "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : u.role === "staff"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }
                                        `}
                                    >
                                        {u.role}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full capitalize
                                            ${u.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : u.status === "blocked"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }
`}
                                    >
                                        {u.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right">

                                    <button
                                        onClick={() => setEditingUser(u)}
                                        className="px-4 py-1.5
                                                    rounded-lg
                                                    bg-blue-600
                                                    text-white
                                                    text-xs
                                                    font-medium
                                                    hover:bg-blue-700
                                                    transition
                                                    shadow-sm"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Users;
