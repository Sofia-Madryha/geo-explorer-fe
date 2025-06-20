"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { getCategories, getSubCategories } from "@/api";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [continent, setContinent] = useState("world");
  const [subCategoryId, setSubCategoryId] = useState(1);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1); // pagination
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(1);
  const [subCategories, setSubCategories] = useState([]);
  const [level, setLevel] = useState("Beginner");
  const [quiz, setQuiz] = useState(1);

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategories(categories);
        if (categories.length > 0) setActiveCategory(categories[0].category_id);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      });

    getSubCategories()
      .then((subs) => {
        const formattedSubs = subs.map((s) => ({
          id: s.sub_category_id,
          label: s.sub_category_name,
        }));
        setSubCategories(formattedSubs);
      })
      .catch((error) => {
        console.error("Failed to fetch subCategories:", error);
        setSubCategories([]);
      });
  }, []);

  return (
    <FilterContext.Provider
      value={{
        continent,
        setContinent,
        subCategoryId,
        setSubCategoryId,
        cards,
        setCards,
        page,
        setPage,
        loading,
        setLoading,
        hasMore,
        setHasMore,
        categories,
        activeCategory,
        setActiveCategory,
        subCategories,
        level,
        setLevel,
        quiz,
        setQuiz,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used inside FilterProvider");
  }
  return context;
};
