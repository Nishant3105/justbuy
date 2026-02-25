import { useState, useEffect } from "react";
import { useUserProfile } from "../../hooks/useUserProfile";

interface Address {
  type: "billing" | "shipping";
  fullName: string;
  phone: string;
  mobile: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: Address[];
  newsletterSubscribed: boolean;
  marketingConsent: boolean;
}

interface ProfileFormProps {
  onCancel: () => void;
}

const ProfileForm = ({ onCancel }: ProfileFormProps) => {
  const { user, updateProfile, updateLoading } = useUserProfile();
  const [formData, setFormData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;

    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleAddressChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) return;

    const target = e.target;
    const name = target.name;

    let value: string | boolean;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }

    const addresses = [...formData.addresses];
    addresses[idx] = {
      ...addresses[idx],
      [name]: value,
    };

    setFormData({ ...formData, addresses });
  };


  const addAddress = () => {
    if (!formData) return;
    setFormData({
      ...formData,
      addresses: [
        ...formData.addresses,
        {
          type: "shipping",
          fullName: "",
          phone: "",
          mobile: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
          isDefault: false,
        },
      ],
    });
  };

  const removeAddress = (idx: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      addresses: formData.addresses.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    const { _id, email, ...rest } = formData;
    updateProfile(rest);
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-xl font-semibold">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-lg border px-4 py-2"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded-lg border px-4 py-2"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="rounded-lg border px-4 py-2 bg-gray-100 cursor-not-allowed"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-lg border px-4 py-2"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Addresses</h3>
          {formData.addresses.map((addr, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-3 relative">
              <span
                className="absolute top-2 right-2 cursor-pointer text-red-500 font-bold"
                onClick={() => removeAddress(idx)}
              >
                ×
              </span>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-1">
                  <label>Type</label>
                  <select
                    name="type"
                    value={addr.type}
                    onChange={(e) => handleAddressChange(idx, e)}
                    className="rounded-lg border px-2 py-1"
                  >
                    <option value="billing">Billing</option>
                    <option value="shipping">Shipping</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={addr.fullName}
                    onChange={(e) => handleAddressChange(idx, e)}
                    className="rounded-lg border px-2 py-1"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={addr.phone}
                    onChange={(e) => handleAddressChange(idx, e)}
                    className="rounded-lg border px-2 py-1"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={addr.mobile}
                    onChange={(e) => handleAddressChange(idx, e)}
                    className="rounded-lg border px-2 py-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="Address Line 1"
                  value={addr.addressLine1}
                  onChange={(e) => handleAddressChange(idx, e)}
                  className="rounded-lg border px-2 py-1"
                />
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Address Line 2"
                  value={addr.addressLine2}
                  onChange={(e) => handleAddressChange(idx, e)}
                  className="rounded-lg border px-2 py-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={addr.city}
                  onChange={(e) => handleAddressChange(idx, e)}
                  className="rounded-lg border px-2 py-1"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={addr.state}
                  onChange={(e) => handleAddressChange(idx, e)}
                  className="rounded-lg border px-2 py-1"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={addr.country}
                  onChange={(e) => handleAddressChange(idx, e)}
                  className="rounded-lg border px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={addr.postalCode}
                  onChange={(e) => handleAddressChange(idx, e)}
                  className="rounded-lg border px-2 py-1"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={addr.isDefault}
                    onChange={(e) => handleAddressChange(idx, e)}
                  />
                  Default
                </label>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addAddress}
            className="rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
          >
            + Add Address
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="newsletterSubscribed"
              checked={formData.newsletterSubscribed}
              onChange={handleChange}
            />
            Subscribe to Newsletter
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
            />
            Marketing Consent
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateLoading}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {updateLoading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
