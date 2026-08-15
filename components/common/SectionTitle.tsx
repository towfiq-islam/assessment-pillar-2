import React from "react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
      {children}
    </h2>
  );
};

export default SectionTitle;
