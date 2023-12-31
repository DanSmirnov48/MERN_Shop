import { ProductFilters, ProductSorting, GridProductList, ListProductList } from "@/components/root";
import { FilterLoader } from "@/components/root/FilterLoader";
import { ProductLoader } from "@/components/root/ProductLoader";
import { Button } from "@/components/ui/button";
import { useSorting, useFiltering, useRatingFiltering, useStockFiltering } from "@/hooks/store";
import { useGetPaginatedProducts, useGetProducts } from "@/lib/react-query/queries";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, PaginationContent } from "@/components/ui/pagination"

const Explore = () => {
  const { selectedShowPerPage } = useSorting();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending: isProductLoading, refetch } = useGetPaginatedProducts(currentPage, +selectedShowPerPage);

  const totalPages = Math.ceil((data?.data.totalProducts || 0) / +selectedShowPerPage);

  useEffect(() => {
    refetch();
  }, [selectedShowPerPage]);

  return (
    <div className="flex flex-col flex-1 items-center bg-gray-100">
      <div className="w-full px-2.5 md:px-10 my-20 max-w-screen-2xl">
        <div className="flex flex-row min-h-[70rem]">
          <div className="basis-1/4">
            {!isProductLoading && <ProductFilters />}
          </div>
          <div className="flex flex-col basis-3/4 ml-5">
            {!isProductLoading && <ProductSorting />}
            {!isProductLoading && <GridProductList products={data?.data.products} />}
          </div>
        </div>
        <div className="flex rounded-xl border-2 shadow-lg bg-white my-5">
          <Pagination>
            <PaginationContent
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Explore;