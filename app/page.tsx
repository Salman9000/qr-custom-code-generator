"use client";

import { QRCodeGenerator } from "./QRCodeGenerator";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">QR Code Generator</h1>
      <QRCodeGenerator />
    </div>
  );
}
