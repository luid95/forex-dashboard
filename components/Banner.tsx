"use client";

import { useEffect, useState } from "react";

type CurrencyData = {
  pair: string;
  point: number;
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
      console.log("🔌 Mensaje recibido desde WebSocket:", parsed); // 👈
      setData(parsed);
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
    <div className="bg-slate-900 text-white p-4 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-2">🧾 Banner de Divisa</h2>
      <p className="text-sm">
        Estado de conexión:{" "}
        <span className={connected ? "text-green-400" : "text-red-400"}>
          {connected ? "Conectado" : "Desconectado"}
        </span>
      </p>

      {data ? (
        <div className="mt-4">
          <p className="text-lg font-semibold">Par: {data.pair}</p>
          <p className="text-2xl font-bold">Precio: {data.point.toFixed(4)}</p>
        </div>
      ) : (
        <p className="mt-4">Cargando datos...</p>
      )}
    </div>
  );
}
