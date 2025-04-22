"use client";

import { useState } from "react";

export default function Tabs({
  onTabChange,
}: {
  onTabChange: (tab: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("historic");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex space-x-4 border-b border-gray-300 mb-4">
      <button
        className={`pb-2 px-4 font-medium text-sm ${
          activeTab === "historic"
            ? "text-indigo-600 border-b-2 border-indigo-600"
            : "text-gray-500 hover:text-indigo-500"
        }`}
        onClick={() => handleTabClick("historic")}
      >
        Precios Históricos
      </button>
      <button
        className={`pb-2 px-4 font-medium text-sm ${
          activeTab === "trend"
            ? "text-indigo-600 border-b-2 border-indigo-600"
            : "text-gray-500 hover:text-indigo-500"
        }`}
        onClick={() => handleTabClick("trend")}
      >
        Tendencia Diaria
      </button>
    </div>
  );
}
