"use client";
import React from "react";
import {FaBookOpen, FaLightbulb, FaCalendarDay} from "react-icons/fa";

export default function Curiosity() {
  const sections = [
    {
      title: "Origem de Palavras",
      icon: <FaBookOpen className="text-blue-600 w-8 h-8" />,
      content:
        "A palavra 'entusiasmo' vem do grego 'enthousiasmos', que significa estar cheio de inspiração divina.",
    },
    {
      title: "Dicas de Gramática",
      icon: (
        <div className="relative flex justify-center items-center">
          <FaLightbulb className="text-yellow-500 w-8 h-8 mt-4" />
          <div className="absolute px-4 top-0 w-16 h-16">
            <span className="w-2 h-2 bg-yellow-300 rounded-full absolute animate-ray left-0 top-4"></span>
            <span className="w-2 h-2 bg-yellow-300 rounded-full absolute animate-ray left-4 top-0"></span>
            <span className="w-2 h-2 bg-yellow-300 rounded-full absolute animate-ray right-0 top-4"></span>
            <span className="w-2 h-2 bg-yellow-300 rounded-full absolute animate-ray right-4 top-0"></span>
          </div>
        </div>
      ),
      content:
        "Atenção ao uso de 'há' e 'a': Use 'há' para tempo passado ('há dois anos') e 'a' para distância ou futuro ('daqui a duas horas').",
    },
    {
      title: "Palavra do Dia",
      icon: <FaCalendarDay className="text-green-600 w-8 h-8" />,
      content:
        "Serendipidade: A descoberta por acaso de algo valioso. Use em uma frase hoje!",
    },
  ];

  return (
    <section className="mt-8 px-8 py-6 bg-gradient-to-t from-blue-200 via-blue-300 to-blue-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Curiosidades
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 border rounded-lg bg-white shadow-sm"
          >
            <div className="mb-4">{section.icon}</div>
            <h3 className="text-xl font-semibold text-gray-700">{section.title}</h3>
            <p className="text-gray-600 mt-2">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
