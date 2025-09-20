/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExternalLink } from "lucide-react";
import { FC, memo } from "react";

interface Props {
  type: "webSearch" | "extractWebUrl";
  input: any;
  output: any;
}

export const SearchExtractPreview: FC<Props> = memo(
  ({ type, input, output }) => {
    const results = output?.results || [];

    const headerText =
      type === "webSearch"
        ? `Query: "${input?.query}"`
        : `URLs: "${input?.urls?.join(", ")}"`;

    const countText =
      type === "webSearch"
        ? `Used ${results?.length} sources`
        : `Found  ${results?.length} pages`;

    const itemText = (item: any) =>
      type === "webSearch" ? item.title : item.url;

    return (
      <div className="w-full border border-border/40 rounded-lg py-3 px-1.5">
        <p>{headerText}</p>
        <div className="mt-2 pl-2">
          <p className="font-normal textsm text-blue-500">{countText}</p>

          <ul className="list-disc pl-0 pb-4 pt-2 space-y-1 mx-h-48 overflow-y-auto">
            {Array.isArray(results) &&
              results?.map((item: any, i: number) => (
                <li key={i}>
                  <a
                    href={item?.url}
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center gap-2 w-full hover:underline text-blue-500 hover:text-blue-400"
                  >
                    {item.favicon && (
                      <img
                        src={item.favicon}
                        alt="favicon"
                        className="w-4 h-4 rounded-sm"
                      />
                    )}

                    <span className="text-[13px]">{itemText(item)} </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
);

SearchExtractPreview.displayName = "SearchExtractPreview";
