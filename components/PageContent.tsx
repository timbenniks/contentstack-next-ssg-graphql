"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EditableTagsPage, getPage } from "@/lib/contentstack";
import Image from "next/image";

export default function PageContent({
  initialPage,
}: {
  initialPage: EditableTagsPage;
}) {
  const [page, setPage] = useState(initialPage);
  const params = useSearchParams();
  const livePreview = params.get("live_preview") || "";

  useEffect(() => {
    if (livePreview) {
      getPage("/", livePreview).then((pageData) => {
        setPage(pageData as EditableTagsPage);
      });
    }
  }, [livePreview]);

  return (
    <main className="max-w-(--breakpoint-md) mx-auto">
      <section className="p-4">
        {page?.title ? (
          <h1
            className="text-4xl font-bold mb-4"
            {...(page?.$ && page?.$.title)}
          >
            {page?.title}
          </h1>
        ) : null}

        {page?.description ? (
          <p className="mb-4" {...(page?.$ && page?.$.description)}>
            {page?.description}
          </p>
        ) : null}

        {page?.image ? (
          <Image
            className="mb-4"
            width={768}
            height={414}
            src={page?.image.url}
            alt={page?.image.title || ""}
            {...(page?.image.$ && page?.image.$.url)}
          />
        ) : null}

        {page?.rich_text ? (
          <div
            {...(page?.$ && page?.$.rich_text)}
            dangerouslySetInnerHTML={{
              __html: page?.rich_text,
            }}
          />
        ) : null}

        <div
          className="space-y-8 max-w-full mt-4"
          {...(page?.$ && page?.$.blocks)}
        >
          {page?.blocks?.map((item, index) => {
            const { block } = item;
            const isImageLeft = block.layout === "image_left";

            return (
              <div
                key={`${block}-${index}`}
                {...(page?.$ && page?.$[`blocks__${index}`])}
                className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-white ${
                  isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2">
                  {block.image ? (
                    <Image
                      src={block.image.url}
                      alt={block.image.title || ""}
                      width={200}
                      height={112}
                      className="w-full"
                      {...(block?.image.$ && block?.image.$.url)}
                    />
                  ) : null}
                </div>
                <div className="w-full md:w-1/2 p-4">
                  {block.title ? (
                    <h2
                      className="text-2xl font-bold"
                      {...(block?.$ && block?.$.title)}
                    >
                      {block.title}
                    </h2>
                  ) : null}
                  {block.copy ? (
                    <div
                      {...(block?.$ && block?.$.copy)}
                      dangerouslySetInnerHTML={{
                        __html: block.copy,
                      }}
                      className="prose"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
