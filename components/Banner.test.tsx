// src/components/Banner.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import Banner from "./Banner";

// Mock del WebSocket
class MockWebSocket {
  static instances: MockWebSocket[] = [];
  onopen: () => void = () => {};
  onmessage: (event: MessageEvent) => void = () => {};
  onclose: () => void = () => {};
  onerror: () => void = () => {};

  constructor(url: string) {
    MockWebSocket.instances.push(this);
    setTimeout(() => this.onopen(), 100); // simula conexión abierta
    setTimeout(() => {
      const fakeData = JSON.stringify({ pair: "USD/MXN", point: 17.5432 });
      this.onmessage({ data: fakeData } as MessageEvent);
    }, 200); // simula recepción de datos
  }

  close() {
    this.onclose();
  }
}

// Reemplaza el WebSocket global por el mock
(global as any).WebSocket = MockWebSocket;

describe("Banner", () => {
  it("muestra estado de conexión y datos de divisa", async () => {
    render(<Banner />);

    expect(screen.getByText(/Estado de conexión/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Conectado/i)).toBeInTheDocument();
      expect(screen.getByText(/USD\/MXN/i)).toBeInTheDocument();
      expect(screen.getByText(/17\.5432/)).toBeInTheDocument();
    });
  });

  it('muestra "Cargando datos..." si aún no hay datos', () => {
    render(<Banner />);
    expect(screen.getByText(/Cargando datos/i)).toBeInTheDocument();
  });
});
