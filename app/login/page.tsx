"use client";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type AuthMode = "login" | "signup";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthForm />
    </Suspense>
  );
}

function AuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const isLogin = mode === "login";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");

  const onSubmit = () => {
    toast.error(
      "Email/password sign-in isn't available yet. Please continue with Google.",
    );
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-transparent text-sm text-gray-900 focus:outline-none ${
      hasError ? "placeholder:text-red-400" : "placeholder:text-gray-400"
    }`;

  const wrapperClass = (hasError: boolean) =>
    `flex items-center gap-2 rounded-lg outline-none border bg-gray-50 px-3 py-2 transition-colors focus-within:bg-white ${
      hasError ? "border-red-400" : "border-gray-200"
    }`;

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setShowPassword(false);
    setShowConfirmPassword(false);
    reset();
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      await signIn("google", {
        callbackUrl,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="animate-fade-up my-5 relative mx-auto max-w-md items-center justify-center rounded-xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm">
          <Link
            href="/"
            className="absolute left-5 top-5 mx-auto flex w-fit items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-orange-500"
          >
            <FiArrowLeft className="size-4.5" />
          </Link>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {isLogin ? (
                <>
                  Welcome <span className="text-orange-500">back</span>
                </>
              ) : (
                <>
                  Create your <span className="text-orange-500">account</span>
                </>
              )}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {isLogin
                ? "Sign in to continue to your account."
                : "Join us and start shopping today."}
            </p>
          </div>

          <div className="mt-5 relative grid grid-cols-2 rounded-xl bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`relative rounded-lg py-2.5 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                isLogin ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {isLogin && (
                <span className="animate-fade-in absolute inset-0 rounded-lg bg-white shadow-sm" />
              )}

              <span className="relative z-10">Login</span>
            </button>

            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`relative rounded-lg py-2.5 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                !isLogin ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {!isLogin && (
                <span className="animate-fade-in absolute inset-0 rounded-lg bg-white shadow-sm" />
              )}

              <span className="relative z-10">Sign Up</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
            {!isLogin && (
              <div key="name-field" className="animate-fade-in overflow-hidden">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Full name
                </label>

                <div className={wrapperClass(!!errors.name)}>
                  <FiUser
                    className={`shrink-0 ${
                      errors.name ? "text-red-400" : "text-gray-400"
                    }`}
                  />

                  <input
                    type="text"
                    placeholder="John Doe"
                    className={inputClass(!!errors.name)}
                    {...register("name", { required: true })}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email address
              </label>

              <div className={wrapperClass(!!errors.email)}>
                <FiMail
                  className={`shrink-0 ${
                    errors.email ? "text-red-400" : "text-gray-400"
                  }`}
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass(!!errors.email)}
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                {isLogin && (
                  <Link
                    href=""
                    className="text-xs font-medium text-orange-500 hover:text-orange-600"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              <div className={wrapperClass(!!errors.password)}>
                <FiLock
                  className={`shrink-0 ${
                    errors.password ? "text-red-400" : "text-gray-400"
                  }`}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={inputClass(!!errors.password)}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-gray-400 transition-colors hover:text-gray-700"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div
                key="confirm-password-field"
                className="animate-fade-in overflow-hidden"
              >
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Confirm password
                </label>

                <div className={wrapperClass(!!errors.confirmPassword)}>
                  <FiLock
                    className={`shrink-0 ${
                      errors.confirmPassword ? "text-red-400" : "text-gray-400"
                    }`}
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={inputClass(!!errors.confirmPassword)}
                    {...register("confirmPassword", {
                      required: true,
                      validate: value => value === password,
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="shrink-0 text-gray-400 transition-colors hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-4 w-4" />
                    ) : (
                      <FiEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98]"
            >
              {isLogin ? "Sign in" : "Create account"}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 transition-[transform,border-color,background-color] duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGoogleLoading ? (
                <FiLoader className="h-5 w-5 animate-spin text-gray-500" />
              ) : (
                <FcGoogle className="h-5 w-5" />
              )}
              {isGoogleLoading ? "Signing in..." : "Continue with Google"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
