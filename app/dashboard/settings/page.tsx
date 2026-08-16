import { auth } from "@/auth";
import SectionTitle from "@/components/common/SectionTitle";
import { customer } from "@/components/data/customer";
import type { ReactNode } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";

export default async function SettingsPage() {
  const session = await auth();
  const name = session?.user?.name ?? customer.name;
  const email = session?.user?.email ?? customer.email;

  return (
    <div>
      <div className="mb-5 md:mb-6">
        <SectionTitle>Settings</SectionTitle>
        <p className="mt-0.5 md:mt-1 xl:mt-2 text-gray-500 text-sm md:text-base">
          Update your personal details and password.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl md:rounded-2xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm">
          <h2 className="mb-2 md:mb-5 text-lg font-semibold text-gray-900">
            Personal details
          </h2>

          <div className="grid grid-cols-1 gap-4 md:gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              icon={<FiUser />}
              defaultValue={name}
            />

            <Field
              label="Email address"
              icon={<FiMail />}
              defaultValue={email}
              type="email"
            />
          </div>

          <button
            type="button"
            className="mt-5 rounded-full bg-primary-orange px-4 md:px-6 py-2 md:py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 cursor-pointer"
          >
            Save changes
          </button>
        </div>

        <div className="rounded-xl md:rounded-2xl border border-gray-200 bg-white shadow-sm p-4 md:p-5">
          <h2 className="mb-2 md:mb-5 text-lg font-semibold text-gray-900">
            Change password
          </h2>

          <div className="space-y-3 md:space-y-5">
            <Field
              label="Current password"
              icon={<FiLock />}
              type="password"
              placeholder="••••••••"
            />

            <div className="grid grid-cols-1 gap-3 md:gap-5 sm:grid-cols-2">
              <Field
                label="New password"
                icon={<FiLock />}
                type="password"
                placeholder="••••••••"
              />

              <Field
                label="Confirm new password"
                icon={<FiLock />}
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-5 md:mt-6 rounded-full border border-gray-200 bg-gray-100 px-4 md:px-6 py-2 md:py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 cursor-pointer"
          >
            Update password
          </button>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  icon?: ReactNode;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}

function Field({
  label,
  icon,
  defaultValue,
  placeholder,
  type = "text",
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </span>

      <div className="flex items-center gap-2 rounded-lg md:rounded-xl border border-gray-200 bg-gray-50 px-3 md:px-4 py-2 md:py-3 transition-colors focus-within:border-primary-orange/50 focus-within:bg-white">
        {icon && <span className="shrink-0 text-gray-400">{icon}</span>}

        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
      </div>
    </label>
  );
}
