import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import axios from "../../utils/axios";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormFields =
    | "firstName"
    | "lastName"
    | "phone"
    | "email"
    | "password"
    | "confirmPassword";

const nameFields: FormFields[] = ["firstName", "lastName"];

const initialTouched: Record<FormFields, boolean> = {
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
};

const initialErrors: Record<FormFields, string> = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [touched, setTouched] =
        useState<Record<FormFields, boolean>>(initialTouched);



    const [errors, setErrors] =
        useState<Record<FormFields, string>>(initialErrors);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const googleButtonRef = useRef<HTMLDivElement>(null);

    const { login, loginLoading } = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isOpen) {
            setIsLogin(true);
            setFormData({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setTouched(initialTouched);
            setErrors(initialErrors);
        }
    }, [isOpen]);


    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);


    useEffect(() => {
        if (!isOpen || !googleButtonRef.current || !window.google) return;

        googleButtonRef.current.innerHTML = "";

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: async (response: { credential: string }) => {
                try {
                    const res = await axios.post(
                        "/api/auth/google",
                        { token: response.credential },
                        { withCredentials: true }
                    );

                    queryClient.setQueryData(["authUser"], res.data.user);
                    onClose();
                } catch (err) {
                    console.error("Google login error:", err);
                }
            },
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            width: 320,
        });
    }, [isOpen, isLogin, queryClient, onClose]);

    if (!isOpen) return null;


    const handleChange =
        (field: FormFields) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;

                console.log(field, value);

                setFormData((prev) => ({
                    ...prev,
                    [field]: value,
                }));

                setErrors((prev) => ({
                    ...prev,
                    [field]: "",
                }));
            };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        validate();
    };

    const toggleForm = () => {
        setIsLogin((prev) => !prev);
        setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setTouched({
            firstName: false,
            lastName: false,
            phone: false,
            email: false,
            password: false,
            confirmPassword: false,
        });
        setErrors(initialErrors);
    };

    const validate = () => {
        const newErrors: Partial<Record<FormFields, string>> = {};

        if (!formData.email.trim())
            newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Please enter a valid email";

        if (!formData.password)
            newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        if (!isLogin) {
            if (!formData.firstName.trim())
                newErrors.firstName = "First name is required";

            if (!formData.lastName.trim())
                newErrors.lastName = "Last name is required";

            if (!formData.phone.trim())
                newErrors.phone = "Mobile number is required";

            if (!formData.confirmPassword)
                newErrors.confirmPassword = "Confirm password is required";
            else if (formData.password !== formData.confirmPassword)
                newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors({
            ...initialErrors,
            ...newErrors,
        });

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                onClose();
                return;
            }

            await axios.post("/api/auth/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
            });

            await login(formData.email, formData.password);
            onClose();
        } catch (err: any) {
            if (err.response?.data?.message) {
                setErrors({
                    ...initialErrors,
                    email: err.response.data.message,
                });
            }
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative flex w-full max-w-4xl min-h-[400px] rounded-2xl bg-white shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <div className="hidden w-1/2 md:block">
                    <img
                        src={isLogin ? "https://pub-5d1c46c0377d42918cc7f96a831e3f36.r2.dev/website-assets/loginimg.webp" : "https://pub-5d1c46c0377d42918cc7f96a831e3f36.r2.dev/website-assets/registerimg.webp"}
                        alt="Auth banner"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8">
                    <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
                        {isLogin ? "Welcome Back" : "Get Started"}
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {nameFields.map((field) => (
                                    <div key={field}>
                                        <input
                                            type="text"
                                            placeholder={field === "firstName" ? "First Name" : "Last Name"}
                                            value={formData[field]}
                                            onChange={handleChange(field)}
                                            onBlur={() =>
                                                setTouched((prev) => ({ ...prev, [field]: true }))
                                            }
                                            className={`w-full rounded-lg border px-4 py-2 text-gray-900 bg-white ${errors[field] ? "border-red-500" : ""
                                                }`}
                                        />

                                        {errors[field] && touched[field] && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors[field]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {!isLogin && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange("phone")}
                                    onBlur={handleBlur}
                                    className={`w-full rounded-lg border px-4 py-2 text-gray-900 bg-white ${errors.phone ? "border-red-500" : ""
                                        }`}
                                />
                                {errors.phone && touched.phone && (
                                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange("email")}
                                onBlur={handleBlur}
                                className={`w-full rounded-lg border px-4 py-2 text-gray-900 bg-white ${errors.email ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.email && touched.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange("password")}
                                onBlur={handleBlur}
                                className={`w-full rounded-lg border px-4 py-2 pr-12 text-gray-900 bg-white text-base ${errors.password ? "border-red-500" : ""
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                            {errors.password && touched.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {!isLogin && (
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange("confirmPassword")}
                                    className={`w-full rounded-lg border px-4 py-2 pr-12 text-gray-900 bg-white text-base ${errors.confirmPassword ? "border-red-500" : ""
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirmPassword ? "🙈" : "👁️"}
                                </button>
                                {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loginLoading
                                ? "Please wait..."
                                : isLogin
                                    ? "Login"
                                    : "Sign Up"}
                        </button>
                    </form>

                    {isLogin && (
                        <>
                            <div className="my-6 flex items-center gap-3">
                                <div className="h-px w-full bg-gray-300" />
                                <span className="text-sm text-gray-500">OR</span>
                                <div className="h-px w-full bg-gray-300" />
                            </div>
                            <div ref={googleButtonRef} className="flex justify-center" />
                        </>
                    )}
                    <div className="mt-6 text-center text-gray-500 text-sm">
                        {isLogin ? (
                            <>
                                Don’t have an account?{" "}
                                <button
                                    type="button"
                                    onClick={toggleForm}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={toggleForm}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;