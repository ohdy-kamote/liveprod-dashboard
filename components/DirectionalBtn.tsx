"use client";

import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

export default function DirectionalBtn({ direction }: {direction: string}) {
  const router = useRouter();

  const handleClick = async () => {
    if (direction === "prev") {
      
    }
  }
  return (
    <button onClick={handleClick} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  )
}