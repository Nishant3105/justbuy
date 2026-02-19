import { useState } from "react";
import { Link } from "react-router-dom";
import { User, UserRole } from "../../hooks/useUsers";

interface UserFormProps {
    currentUserRole: UserRole;
    initialData: User;
    onCancel: () => void;
    onSave: (user: User) => void;
}

const UserForm = ({ currentUserRole, initialData, onCancel, onSave }: UserFormProps) => {
    const [formData, setFormData] = useState<User>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        setFormData((prev) => {
            if (name.startsWith("permissions.")) {
                const key = name.split(".")[1] as "read" | "edit";
                return {
                    ...prev,
                    permissions: {
                        ...prev.permissions,
                        [key]: checked,
                    },
                } as User;
            }
            if (type === "checkbox") {
                return { ...prev, [name]: checked } as User;
            }
            return { ...prev, [name]: value } as User;
        });
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: Partial<User> = { updatedAt: new Date().toISOString() };

        if (currentUserRole === "admin") {
            payload.role = formData.role;
            payload.status = formData.status;
            payload.newsletterSubscribed = formData.newsletterSubscribed;
            payload.marketingConsent = formData.marketingConsent;
            payload.totalOrders = formData.totalOrders;
            payload.totalSpent = formData.totalSpent;
            payload.permissions = {
                read: formData?.permissions.read ?? false,
                edit: formData?.permissions.edit ?? false,
            };
        }

        onSave({ ...formData, ...payload } as User);
    };

    return (
        <form className="space-y-6 p-4 bg-white rounded-xl shadow" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold">User Details</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="mb-1 font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstName" value={initialData.firstName} disabled className="border px-4 py-2 rounded bg-gray-100 cursor-not-allowed" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="lastName" className="mb-1 font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastName" value={initialData.lastName} disabled className="border px-4 py-2 rounded bg-gray-100 cursor-not-allowed" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
                    <input type="email" id="email" value={initialData.email} disabled className="border px-4 py-2 rounded bg-gray-100 cursor-not-allowed" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-1 font-medium text-gray-700">Phone</label>
                    <input type="text" id="phone" value={initialData.phone} disabled className="border px-4 py-2 rounded bg-gray-100 cursor-not-allowed" />
                </div>
            </div>

            {currentUserRole === "admin" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label htmlFor="role" className="mb-1 font-medium text-gray-700">Role</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} className="border px-4 py-2 rounded">
                            {["admin", "staff", "customer"].map((r) => (
                                <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="status" className="mb-1 font-medium text-gray-700">Status</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange} className="border px-4 py-2 rounded">
                            {["active", "blocked", "pending"].map((s) => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="flex gap-6 mt-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={formData?.emailVerified} disabled className="cursor-not-allowed" /> Email Verified
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={formData?.phoneVerified} disabled className="cursor-not-allowed" /> Phone Verified
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={formData?.twoFactorEnabled} disabled className="cursor-not-allowed" /> 2FA Enabled
                </label>
            </div>

            {currentUserRole === "admin" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="newsletterSubscribed" checked={formData?.newsletterSubscribed} onChange={handleChange} /> Newsletter
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="marketingConsent" checked={formData?.marketingConsent} onChange={handleChange} /> Marketing Consent
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="permissions.read" checked={formData?.permissions?.read} onChange={handleChange} /> Permission Read
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="permissions.edit" checked={formData?.permissions?.edit} onChange={handleChange} /> Permission Edit
                    </label>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                        <label className="flex flex-col">
                            <span className="font-medium text-gray-700 mb-1">Total Orders</span>
                            <span className="px-4 py-2 rounded  text-gray-700">{formData?.totalOrders}</span>
                        </label>

                        <label className="flex flex-col">
                            <span className="font-medium text-gray-700 mb-1">Total Spent</span>
                            <span className="px-4 py-2 rounded  text-green-700">₹{formData?.totalSpent}</span>
                        </label>

                        <label className="flex flex-col">
                            {/* <span className="font-medium text-gray-700 mb-1">Last Order Date</span> */}
                            <Link
                                to={`/admin/userorder/${formData?._id}`}
                                className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:underline font-medium"
                            >
                                View Orders
                            </Link>
                        </label>
                    </div>

                </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">Cancel</button>
                {currentUserRole === "admin" && <button type="submit" className="bg-black text-white px-6 py-2 rounded">Save User</button>}
            </div>
        </form>
    );
};

export default UserForm;
