"use client";
import React from "react";
import { Flex, Button, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const currentQueries = useSearchParams();

  const router = useRouter();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(currentQueries.toString());

    // for (const element of currentQueries.keys()) {
    //   params.set(element, currentQueries.get(element)!);
    // }

    params.set("page", String(page));

    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" gap="3" justify="center">
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </Button>

      <Flex gap="2" align="center">
        {pages.map((page) => (
          <Button
            disabled={currentPage === page}
            key={page}
            variant={page === currentPage ? "solid" : "soft"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </Flex>

      <Button
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>

      <Text size="2" color="gray">
        Page {currentPage} of {pageCount}
      </Text>
    </Flex>
  );
}

export default Pagination;
