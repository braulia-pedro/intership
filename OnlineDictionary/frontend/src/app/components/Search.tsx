"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Favorites from "@/app/components/favorites";

export default function Search() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWord = async () => {
    if (!word.trim()) {
      setError("Por favor, digite uma palavra!");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`http://localhost:5000/search/${word}`);
      if (!response.ok) {
        throw new Error("Error fetching the word");
      }
      const data = await response.json();

      setResult(data);
    } catch (error: any) {
      setError("Não foi possível buscar a palavra. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  const sections = [
    { title: "Definicao", key: "definitions" },
    { title: "Sinonimo", key: "synonyms" },
    { title: "Expressions", key: "expressions" },
  ];

  return (
    <section className="bg-gradient-to-t from-blue-500 via-blue-300 to-blue-200 rounded-lg py-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center bg-white rounded-lg shadow-lg px-4 py-2">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Procure no Dictionario"
            className="flex-1 outline-none text-gray-700 px-2"
          />
          <button onClick={fetchWord} className="text-blue-500" disabled={loading}>
            <FaSearch size={24} />
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {loading && <p className="text-blue-700 mt-4">Carregando...</p>}

        {result && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6 text-left">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">{result.word}</h2>
              <Favorites word={result.word} />
            </div>
            {sections.map(({ title, key }) =>
              result[key]?.length > 0 ? (
                <div className="mb-4" key={key}>
                  <h3 className="text-xl font-semibold">{title}:</h3>
                  <ul className="list-disc list-inside">
                    {result[key].slice(0, 8).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </section>
  );
}
