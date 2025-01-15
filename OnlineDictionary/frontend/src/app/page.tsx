"use client";
import React from 'react';
import Header from "@/app/components/header";
import Search from "@/app/components/search"
import Footer from "@/app/components/footer";
import Curiosity from "@/app/components/curiosity";
import Favorites from "@/app/components/favorites.tsx";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-24 py-8 space-y-8">
        <Search />
        <Curiosity />
      </main>
      <Footer />
    </div>
  );
}
