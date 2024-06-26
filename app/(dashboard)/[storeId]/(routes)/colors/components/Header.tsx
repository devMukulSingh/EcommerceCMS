"use client";
import React, { FC, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Color } from "@prisma/client";
import Link from "next/link";
import { ColorColumn } from "@/components/ui/ColorColumn";
import SearchBar from "@/components/commons/SearchBar";

interface HeaderProps {
  colors: ColorColumn[];
}

const Header: FC<HeaderProps> = ({ colors }) => {
  const { storeId } = useParams();

  return (
    <header className="flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">Colors({colors.length})</h1>
        <p className="text-sm text-slate-500">Manage colors</p>
      </div>
      <SearchBar tableData={colors} />
      <Link href={`/${storeId}/colors/new`} prefetch={true}>
        <Button className="flex gap-2">
          <PlusCircle />
          Add New
        </Button>
      </Link>
    </header>
  );
};

export default Header;
