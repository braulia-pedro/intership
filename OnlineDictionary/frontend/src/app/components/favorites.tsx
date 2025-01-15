"use client";

import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import Cookies from "js-cookie";

interface FavoriteProps {
  word: string;
}

export default function Favorite({ word }: FavoriteProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  // carrega os favoritos salvos nos cookies ao inicializar
  useEffect(() => {
    const savedFavorites = Cookies.get("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // atualiza os cookies sempre que os favoritos mudarem
  useEffect(() => {
  if (favorites.length > 0) {
      Cookies.set("favorites", JSON.stringify(favorites), { expires: 365 });
  } else {
      Cookies.remove("favorites"); 
  }
}, [favorites]);
  
  const toggleFavorite = () => {
    const updatedFavorites = favorites.includes(word)
      ? favorites.filter((fav) => fav !== word) // remove se já for favorito
      : [...favorites, word]; // adiciona se não for favorito
  
    setFavorites(updatedFavorites); // atualiza o estado com os favoritos modificados
  };

  return (
    <FaHeart
      size={24}
      className={`cursor-pointer ${
        favorites.includes(word)
          ? "text-blue-600" 
          : "text-blue-200"
      }`}
      onClick={toggleFavorite}
      title={favorites.includes(word) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    />
  );
}
