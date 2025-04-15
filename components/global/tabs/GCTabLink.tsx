"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function GCTabLInk(props: Readonly<{
  links: string[];
  labels: string[];
  isSinglePath?: boolean;
  path?: string
}>) {
  const { links, labels, path = "service", isSinglePath = false } = props;
  const params = useParams<{role1: string, role2: string, role3: string, [path]: string}>();
  let numPaths = 1;

  if (params?.role3) {
    numPaths = 3;
  } else if (params?.role2) {
    numPaths = 2;
  }

  const getBackgroundByNumber = (pathNum: number) => {
    if (pathNum === numPaths) {
      return "bg-slate-800";
    } else {
      return "bg-slate-500";
    }
  }

  const getBackgroundByName = (name: string) => {
    if (name === params?.[path]) {
      return "bg-slate-800";
    } else {
      return "bg-slate-500";
    }
  }

  return (
    <div className="flex w-fit gap-px">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link}
          className={`text-white p-1.5 w-28 text-center first:rounded-ss-md last:rounded-se-md ${isSinglePath ? getBackgroundByName(link) : getBackgroundByNumber(index + 1)}`}
        >
          {labels[index]}
        </Link>
      ))}
    </div>
  )
}
