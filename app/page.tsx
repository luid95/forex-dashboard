"use client";

import { useState } from "react";
import Banner from "../components/Banner";
import Tabs from "../components/Tabs";

export default function Home() {
  const [activeTab, setActiveTab] = useState("historic");

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          💱 Forex Dashboard
        </h1>
        <Banner />
        <Tabs onTabChange={setActiveTab} />

        <div className="bg-white p-6 rounded-xl shadow-md mt-4">
          {activeTab === "historic" && (
            <p>📊 Aquí irán los precios históricos.</p>
          )}
          {activeTab === "trend" && <p>📈 Aquí irá la tendencia diaria.</p>}
        </div>
      </div>
    </main>
  );
}
