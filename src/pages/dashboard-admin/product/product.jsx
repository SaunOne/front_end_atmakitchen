import React from "react";
import { ProductTable } from "@/components/dashboard-admin/product/table";

export function ProductAdmin() {

  return (
    <div className="mb-8 flex flex-col gap-10">
      <ProductTable/>
    </div>
  );
}

export default ProductAdmin;
