"use client";

import { category } from "@/utils/constants";
import { getLinkedList } from "@/utils/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function DirectionalBtn({ children }: {children: ReactNode}) {
  const router = useRouter();
  const [roledetails, setRoleDetails] = useState(getLinkedList(category.ROLES));

  const goToPrev = () => {
    const role = roledetails?.prev?.data;
    setRoleDetails(roledetails?.prev || null);

    router.push(`/schedule/${role}`);
  }

  const goToNext = () => {
    const role = roledetails?.next?.data;
    setRoleDetails(roledetails?.next || null);

    router.push(`/schedule/${role}`);
  }

  return (
    <div className="flex items-center justify-evenly">
      <button onClick={goToPrev}>{"<< Prev"}</button>
      {children}
      <button onClick={goToNext}>{"Next >>"}</button>
    </div>
  );
}