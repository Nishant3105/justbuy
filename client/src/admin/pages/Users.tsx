import { useState } from "react";
import UserOrders from "../components/UserOrders";

/* ===================== TYPES ===================== */

type UserRole = "admin" | "staff" | "customer" | "vendor";
type UserStatus = "active" | "blocked" | "pending";

interface Address {
    id: string;
    type: "billing" | "shipping";
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault: boolean;
}

interface User {
    id: string;

    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar?: string;

    role: UserRole;
    status: UserStatus;

    emailVerified: boolean;
    phoneVerified: boolean;
    twoFactorEnabled: boolean;
    lastLoginAt?: string;
    authProvider: "email",
    addresses: Address[];

    totalOrders: number;
    totalSpent: number;
    lastOrderDate?: string;

    newsletterSubscribed: boolean;
    marketingConsent: boolean;

    createdAt: string;
    updatedAt: string;
}

/* ===================== MOCK DATA ===================== */

const initialUsers: User[] = [
    {
        id: "1",
        firstName: "Nishant",
        lastName: "Kumar",
        email: "nishant@gmail.com",
        phone: "9999999999",
        role: "admin",
        status: "active",
        emailVerified: true,
        phoneVerified: true,
        twoFactorEnabled: false,
        addresses: [],
        authProvider: "email",
        totalOrders: 12,
        totalSpent: 5400,
        newsletterSubscribed: true,
        marketingConsent: true,
        createdAt: "2024-01-01",
        updatedAt: "2024-02-01",
    },
];

/* ===================== MAIN ===================== */

const Users = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleSave = (user: User) => {
        setUsers((prev) => {
            const exists = prev.find((u) => u.id === user.id);
            return exists
                ? prev.map((u) => (u.id === user.id ? user : u))
                : [...prev, user];
        });
        setEditingUser(null);
    };

    if (editingUser) {
        return (
            <UserForm
                initialData={editingUser}
                onCancel={() => setEditingUser(null)}
                onSave={handleSave}
            />
        );
    }

    if (selectedUser) {
        return (
            <UserOrders
                user={selectedUser}
                onBack={() => setSelectedUser(null)}
            />
        );
    }


    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Users</h1>
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
                            authProvider: "email",
                            addresses: [],
                            totalOrders: 0,
                            totalSpent: 0,
                            newsletterSubscribed: false,
                            marketingConsent: false,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        })
                    }
                    className="rounded-lg bg-black px-4 py-2 text-white"
                >
                    + Add User
                </button>
            </div>

            <div className="rounded-xl bg-white shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t">
                                <td className="px-4 py-3">
                                    {u.firstName} {u.lastName}
                                </td>
                                <td className="px-4 py-3">{u.email}</td>
                                <td className="px-4 py-3 capitalize">{u.role}</td>
                                <td className="px-4 py-3 capitalize">{u.status}</td>
                                <td className="px-4 py-3 text-right space-x-3">
                                    <button
                                        onClick={() => setEditingUser(u)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => setSelectedUser(u)}
                                        className="text-green-600 hover:underline"
                                    >
                                        View Orders
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

/* ===================== FORM ===================== */

interface UserFormProps {
    initialData: User;
    onCancel: () => void;
    onSave: (user: User) => void;
}

const UserForm = ({ initialData, onCancel, onSave }: UserFormProps) => {
    const [formData, setFormData] = useState<User>(initialData);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, updatedAt: new Date().toISOString() });
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold">User Details</h2>

            {/* Identity */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border px-4 py-2 rounded" />
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border px-4 py-2 rounded" />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border px-4 py-2 rounded" />
                <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border px-4 py-2 rounded" />
            </div>

            {/* Role & Status */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <select name="role" value={formData.role} onChange={handleChange} className="border px-4 py-2 rounded">
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                </select>

                <select name="status" value={formData.status} onChange={handleChange} className="border px-4 py-2 rounded">
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {/* Security */}
            <div className="flex gap-6">
                <label><input type="checkbox" name="emailVerified" checked={formData.emailVerified} onChange={handleChange} /> Email Verified</label>
                <label><input type="checkbox" name="phoneVerified" checked={formData.phoneVerified} onChange={handleChange} /> Phone Verified</label>
                <label><input type="checkbox" name="twoFactorEnabled" checked={formData.twoFactorEnabled} onChange={handleChange} /> 2FA Enabled</label>
            </div>

            {/* Preferences */}
            <div className="flex gap-6">
                <label><input type="checkbox" name="newsletterSubscribed" checked={formData.newsletterSubscribed} onChange={handleChange} /> Newsletter</label>
                <label><input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} /> Marketing Consent</label>
            </div>

            {/* Read-only stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-sm text-gray-600">
                <div>Total Orders: {formData.totalOrders}</div>
                <div>Total Spent: ₹{formData.totalSpent}</div>
                <div>Last Login: {formData.lastLoginAt ?? "—"}</div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
                <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">
                    Cancel
                </button>
                <button type="submit" className="bg-black text-white px-6 py-2 rounded">
                    Save User
                </button>
            </div>
        </form>
    );
};

export default Users;
