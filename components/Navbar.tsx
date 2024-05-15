import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-black px-10 py-6 rounded-md">
            <Link className="text-white font-semibold text-lg" href={"/"}>Live Prod Dashboard</Link>
            {/* <Link className="bg-white p-2" href={"/add-topic"}>Add Schedule</Link> */}
        </nav>
    )
}
