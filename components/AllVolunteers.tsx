"use client";

import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { HiPencilAlt } from "react-icons/hi";

interface Data {
  _id: string
  name: string
  tier: string
  segment: string
  active: boolean
}

const columns = [
	{
		name: "Name",
		selector: (row: Data) => row.name,
    sortable: true,
    // onclick: (row: Data) => console.log("row"),
    // conditionalCellStyles: [
    //   {
    //     when: (row: Data) => true,
    //     classNames: ["cursor-pointer"],
    //   }
    // ]
	},
	{
		name: "Tier",
		selector: (row: Data) => row.tier,
    sortable: true,
    // right: true,
	},
	{
		name: "Segment",
		selector: (row: Data) => row.segment,
    sortable: true,
    // right: true,
	},
  // {
  //   name: "Actions",
  //   selector: () => <HiPencilAlt size={15} /> as any,
  //   sortable: false,
  //   right: true,
  //   width: "10%"
  // }
];

const conditionalRowStyles = [
  {
    when: () => true,
    classNames: ["hover:bg-slate-200 capitalize cursor-pointer"],
  },
  {
    when: (row: Data) => !row.active,
    style: {
      color: "rgb(239, 68, 68)",
    },
  }
];

export default function AllVolunteers({data}: {data: Data[]}) {
  const router = useRouter();

	return (
		<DataTable
			columns={columns}
			data={data}
      conditionalRowStyles={conditionalRowStyles}
      pagination
      onRowClicked={(row: Data) => router.push(`/volunteer/profile/${row._id}`)}
		/>
	);
};
