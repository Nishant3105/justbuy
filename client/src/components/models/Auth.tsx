import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../utils/axios"; // only needed for REGISTER


interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

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

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const { login, setUser } = useAuth();

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const googleButtonRef = useRef<HTMLDivElement>(null);

    // Prevent background scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    // Google button
    useEffect(() => {
        if (!isOpen || !googleButtonRef.current) return;
        googleButtonRef.current.innerHTML = "";
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: async (response: { credential: string }) => {
                console.log("Google JWT:", response.credential);

                try {
                    setLoading(true);
                    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

                    // Send JWT to backend
                    const res = await axios.post(`${VITE_API_BASE_URL}/api/auth/google`, {
                        token: response.credential,
                    }, { withCredentials: true }); // to store cookies

                    const user = res.data.user;
                    const accessToken = res.data.accessToken;

                    // Login in context
                    setUser(user);

                    // onClose();
                } catch (err) {
                    console.error("Google login error:", err);
                } finally {
                    setLoading(false);
                }
            },
        });
        window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            width: 320,
        });
    }, [isOpen, isLogin]);

    if (!isOpen) return null;

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error immediately if user starts typing
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        validate();
    };

    // Toggle login/signup
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
        setErrors({});
    };

    // Validation
    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (!isLogin) {
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
            if (!formData.phone.trim()) newErrors.phone = "Mobile number is required";
            if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
            else if (formData.password !== formData.confirmPassword)
                newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);

            if (isLogin) {
                // 🔐 LOGIN via AuthContext
                await login(formData.email, formData.password);
                onClose();
                return;
            }

            // 📝 REGISTER
            await axios.post("/api/auth/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
            });

            // ✅ Auto-login after successful register
            await login(formData.email, formData.password);
            onClose();

        } catch (err: any) {
            console.error(err);

            // Optional: map backend errors to field-level errors
            if (err.response?.data?.message) {
                setErrors({ email: err.response.data.message });
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                {/* Left banner */}
                <div className="hidden w-1/2 md:block">
                    <img src="/auth.jpg" alt="Auth banner" className="h-full w-full object-cover" />
                </div>

                {/* Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
                        {isLogin ? "Welcome Back" : "Get Started"}
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full rounded-lg border px-4 py-2 text-gray-900 ${errors.firstName ? "border-red-500" : ""
                                            }`}
                                    />
                                    {errors.firstName && touched.firstName && (
                                        <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full rounded-lg border px-4 py-2 text-gray-900 ${errors.lastName ? "border-red-500" : ""
                                            }`}
                                    />
                                    {errors.lastName && touched.lastName && (
                                        <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full rounded-lg border px-4 py-2 text-gray-900 ${errors.phone ? "border-red-500" : ""
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full rounded-lg border px-4 py-2 text-gray-900 ${errors.email ? "border-red-500" : ""
                                    }`}
                            />
                            {errors.email && touched.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Password with eye toggle */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full rounded-lg border px-4 py-2 text-gray-900 ${errors.password ? "border-red-500" : ""
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                            {errors.password && touched.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {!isLogin && (
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full rounded-lg border px-4 py-2 text-gray-900 ${errors.confirmPassword ? "border-red-500" : ""
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? "🙈" : "👁️"}
                                </button>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={toggleForm} className="ml-1 font-medium text-blue-600 hover:underline">
                            {isLogin ? "Sign up" : "Login"}
                        </button>
                    </p>

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
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
