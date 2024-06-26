"use client";
import React, { FC, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn } from "@/components/ui/CategoryColumn";
import SearchBar from "@/components/commons/SearchBar";

interface HeaderProps {
  categories: CategoryColumn[];
}

const Header: FC<HeaderProps> = ({ categories }) => {
  useEffect(() => {
    router.prefetch(`/${storeId}/categories/new`);
  }, []);
  const router = useRouter();
  const { storeId } = useParams();
  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Categories({categories.length})
          </h1>
          <p className="text-sm text-slate-500">Manage Categories</p>
        </div>
        <SearchBar tableData={categories} />
        <Button
          onClick={() => router.push(`/${storeId}/categories/new`)}
          className="flex gap-2"
        >
          <PlusCircle />
          Add New
        </Button>
      </header>
    </>
  );
};

export default Header;
