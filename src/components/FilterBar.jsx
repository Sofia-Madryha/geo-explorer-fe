"use client";

import React, { useState } from "react";
import { useFilter } from "@/contexts/FilterContext";

const continents = [
  "World",
  "Asia",
  "Europe",
  "Africa",
  "South America",
  "North America",
  "Australia/Oceania",
];

// FilterBar supports optional rendering of categories and sub-categories
export default function FilterBar({
  showCategories = true,
  showSubCategories = true,
}) {
  const {
    continent,
    setContinent,
    categories,
    activeCategory,
    setActiveCategory,
    subCategories,
    subCategoryId,
    setSubCategoryId,
  } = useFilter();

  const [isContinentOpen, setIsContinentOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 lg:max-w-5xl flex justify-between items-center p-4">
      <div className="w-full max-w-5xl mx-auto p-4">
        {/* Continent dropdown */}
        <div className="relative mb-6">
          <button
            className="w-full flex justify-between items-center border border-[#6ED788] rounded-md px-4 py-2"
            onClick={() => setIsContinentOpen(!isContinentOpen)}
            type="button"
          >
            <span>{continent}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M4.25334 3C2.52413 3 1.44124 4.86947 2.30159 6.36946L10.0461 19.8717C10.9107 21.3791 13.085 21.3791 13.9496 19.8717L21.6941 6.36947C22.5545 4.86948 21.4716 3 19.7424 3H4.25334Z"
                fill="#6ED788"
              />
            </svg>
          </button>
          {isContinentOpen && (
            <div className="absolute z-10 w-full border border-[#6ED788] rounded-md mt-1 bg-white shadow-lg max-h-60 overflow-auto">
              {continents.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setContinent(c);
                    setIsContinentOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-[#6ED788] hover:text-white"
                  type="button"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category button group */}
        {showCategories && (
          <div className="w-full flex justify-between items-center rounded-md ">
            {categories.map(({ id, category_name }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(category_name)}
                className={`pb-2 border-b-4 mr-1 ml-1 ${
                  activeCategory === category_name
                    ? "border-[var(--color-green)] w-1/2 font-bold text-[var(--color-green)]"
                    : "border-[var(--color-gray-900)] w-1/2 text-gray-700 hover:text-[var(--color-green)]"
                }`}
                type="button"
              >
                {category_name}
              </button>
            ))}
          </div>
        )}

        {/* Sub-category button group */}
        {showSubCategories && (
          <div className="w-full flex justify-between items-center rounded-md">
            {subCategories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSubCategoryId(id)}
                className={`pb-2 border-b-4 mr-1 ml-1 ${
                  subCategoryId === id
                    ? "border-[var(--color-green)] w-100 font-bold text-[var(--color-green)]"
                    : "border-[#51545d] w-100 text--[var(--color-gray-900)] hover:text-[var(--color-green)]"
                }`}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
