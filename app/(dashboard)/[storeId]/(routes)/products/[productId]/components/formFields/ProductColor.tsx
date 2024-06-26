import React, { FC, useState } from "react";
import { Iform } from "../ProductForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddColorModal from "@/components/modals/AddColorModal";
import Loader from "@/components/commons/Loader";
import { Color } from "@prisma/client";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { useParams } from "next/navigation";

const ProductColor: FC<Iform> = ({ form, loading }) => {
  const { storeId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => {
    setIsOpen(false);
  };
  const { data, error, isLoading } = useSWR(`/api/${storeId}/color`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (error) console.log(`Error in getCategories`, error);
  return (
    <>
      <AddColorModal isOpen={isOpen} onClose={handleOnClose} />
      <FormField
        control={form.control}
        name="colorId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Color</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={loading || isLoading}
            >
              <FormControl>
                <SelectTrigger>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <SelectValue placeholder="SelectColor" />
                  )}
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {data?.map((color: Color) => (
                  <SelectItem value={color.id} key={color.id}>
                    {color.name}
                  </SelectItem>
                ))}
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="ghost"
                  className="flex gap-2 w-full justify-start"
                >
                  <PlusCircle />
                  Add Color
                </Button>
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      ></FormField>
    </>
  );
};

export default ProductColor;
