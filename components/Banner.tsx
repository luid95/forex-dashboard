"use client";

import { useEffect, useState } from "react";

type CurrencyData = {
  pair: string;
  point: number;
  high: number;
  low: number;
  updatedAt: string;
};

export default function Banner() {
  const [data, setData] = useState<CurrencyData | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("wss://fe-challenge.cicadatech.net/live-data");

    socket.onopen = () => {
      console.log("🟢 WebSocket conectado");
      setConnected(true);
    };

    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      console.log("🔌 Mensaje recibido desde WebSocket:", parsed);

      const high = parsed.point + Math.random(); // Simulación
      const low = parsed.point - Math.random(); // Simulación
      const updatedAt = new Date().toISOString();

      setData({
        pair: parsed.pair,
        point: parsed.point,
        high: parseFloat(high.toFixed(4)),
        low: parseFloat(low.toFixed(4)),
        updatedAt,
      });
    };

    socket.onclose = () => {
      console.log("🔴 WebSocket desconectado");
      setConnected(false);
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    return () => socket.close();
  }, []);

  return (
    <div className="bg-slate-900 text-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="text-xl font-bold">Currency Pair</div>
        <div className="text-2xl font-mono text-green-400">
          {data?.pair ?? "---"}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-sm bg-slate-800 p-4 rounded-md">
        <div>
          <p className="text-gray-400">Current Exchange-Rate Value</p>
          <p className="text-lg font-bold text-green-400">
            {data ? data.point.toFixed(4) : "---"}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Highest Exchange-Rate Today</p>
          <p className="text-lg">{data ? data.high.toFixed(4) : "---"}</p>
        </div>
        <div>
          <p className="text-gray-400">Lowest Exchange-Rate Today</p>
          <p className="text-lg">{data ? data.low.toFixed(4) : "---"}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-400">Last Update (UTC)</p>
          <p className="text-lg">
            {data
              ? new Date(data.updatedAt)
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 19)
              : "---"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-400">
        Estado de conexión:{" "}
        <span className={connected ? "text-green-400" : "text-red-400"}>
          {connected ? "Conectado" : "Desconectado"}
        </span>
      </p>
    </div>
  );
}
