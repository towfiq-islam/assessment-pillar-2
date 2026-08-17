import SectionTitle from "@/components/common/SectionTitle";
import { customerAddresses } from "@/components/data/addresses";
import { FiEdit2, FiPlus, FiTrash2, FiUser } from "react-icons/fi";

export default function AddressesPage() {
  return (
    <div>
      <div className="mb-5 md:mb-6 flex items-start justify-between gap-4">
        <div>
          <SectionTitle>Addresses</SectionTitle>
          <p className="mt-0.5 md:mt-1 xl:mt-2 text-gray-500 text-sm md:text-base">
            Manage the addresses on your account.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-1 md:gap-2 rounded-full bg-primary-orange px-3.5 md:px-5 py-2 md:py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 cursor-pointer"
        >
          <FiPlus className="h-4 w-4" />
          Add address
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-5 sm:grid-cols-2">
        {customerAddresses.map(address => (
          <div
            key={address.id}
            className="rounded-xl md:rounded-2xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-gray-900">
                  {address.label}
                </span>

                {address.isDefault && (
                  <span className="rounded-full bg-primary-orange/10 px-2.5 py-0.5 text-xs font-medium text-primary-orange">
                    Default
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label={`Edit ${address.label} address`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                >
                  <FiEdit2 className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  aria-label={`Delete ${address.label} address`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors cursor-pointer hover:bg-gray-100 hover:text-primary-orange"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-1.5 md:mt-4 flex items-start gap-2 text-sm text-gray-500">
              <FiUser className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

              <div>
                <p className="text-gray-900">{address.recipient}</p>
                <p className="mt-0.5">{address.line}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
