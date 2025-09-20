import React from "react";
import Link from "next/link";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <Link href={url} className="w-fit flex items-center  gap-2">
      <div
        className="flex aspect-square size-8 items-center justify-center rounded-md overflow-hidden bg-primary text-primary-foreground
    "
      >
        <img src="/logo.png" width={36} height={36} alt="Waveai" />
      </div>

      <div className="flex-1 text-left text-base leading-tight">
        <span className="font-medium">Wave AI</span>
      </div>
    </Link>
  );
};

export default Logo;
