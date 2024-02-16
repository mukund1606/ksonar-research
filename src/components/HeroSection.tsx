"use client";
import { useState } from "react";

import { Card, CardBody, CardHeader, Image, Input } from "@nextui-org/react";

import { type Report } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";

export default function HeroSection({ reports }: { reports: Report[] }) {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState<Report[] | null>(null);

  return (
    <div className="relative flex w-full flex-col items-center lg:px-20 xl:px-52">
      <Image
        alt="Hero Image"
        src="/hero.jpg"
        className="flex aspect-[2/3] w-full flex-col items-center object-cover sm:aspect-square md:aspect-[5/4] lg:aspect-[2/1] xl:aspect-[2/1]"
      />
      <div className="absolute bottom-4 z-10">
        <Input
          placeholder="Search"
          className="w-64 sm:w-72 md:w-80 lg:w-96 "
          classNames={{
            input: "text-lg md:text-xl",
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value === "") {
              setSearchData(null);
            } else {
              setSearchData(
                reports
                  .filter((document) =>
                    document.title
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()),
                  )
                  .slice(0, 4),
              );
            }
          }}
          endContent={<Search />}
        />
        {search && searchData?.length === 0 ? (
          <div className="absolute mt-2 flex w-full flex-col gap-2">
            <Card className="z-20">
              <CardHeader className="text-lg font-bold">
                No results found
              </CardHeader>
            </Card>
          </div>
        ) : (
          <div className="absolute mt-2 flex w-full flex-col gap-2">
            {searchData?.map((document) => (
              <Card
                key={document.id}
                as={Link}
                href={`/report/${document.id}`}
                className="z-20"
              >
                <CardHeader className="pb-0 text-lg font-bold">
                  {document.title}
                </CardHeader>
                <CardBody className="pt-0">
                  {document.description.slice(0, 75)}
                  {document.description.length > 75 ? "..." : ""}
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
