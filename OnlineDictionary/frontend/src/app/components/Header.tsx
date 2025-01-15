"use client";
import React from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-t from-blue-600 via-blue-400 to-blue-200 text-white py-4 px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold">DicioLuna</h1>
            <p className="text-sm">Dicionário online</p>
          </div>
        </div>
      </div>
    </header>
  );
}
