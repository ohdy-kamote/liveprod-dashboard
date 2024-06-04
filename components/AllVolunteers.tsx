"use client";

import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { PiLegoSmiley, PiLegoSmileyDuotone } from "react-icons/pi";
import CpInput from "./Input";
import { IoPersonAdd } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteVolunteer } from "@/utils/apis/delete";

interface Data {
  _id: string
  name: string
  firstName: string
  lastName: string
  nickName: string
  status: string
  segment: string
  active: boolean
}

const conditionalRowStyles = [
  {
    when: () => true,
    classNames: ["hover:bg-slate-200 capitalize cursor-pointer"],
    style: {
      color: "#334155"
    }
  },
  {
    when: (row: Data) => row.status === "inactive",
    style: {
      color: "rgb(239, 68, 68)",
    },
  }
];

export default function CpAllVolunteers({data}: {data: Data[]}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const isAdmin = true;

  const deleteVol = async (volunteerId: string, volunteerName: string) => {
    const confirmed = confirm(`Are you sure you want to remove ${volunteerName} as volunteer?`);
    if (!confirmed) return;

    const res = await deleteVolunteer(volunteerId);
    if (res.success) {
      alert(res.message);
      router.refresh();
    }
  }

  const columns = [
    {
      name: "First Name",
      selector: (row: Data) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: Data) => row.lastName,
      sortable: true,
    },
    {
      name: "Nickname",
      selector: (row: Data) => row.nickName || "N/A",
      sortable: true,
    },
    {
      name: "Segment",
      selector: (row: Data) => row.segment,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Data) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row: Data) => <RiDeleteBinLine onClick={() => deleteVol(row._id, row.name)} size={18} /> as any,
      sortable: false,
      button: true,
    }
  ];

  const filteredVolunteers = useMemo(() => {
    const filteredValues = data.filter((volunteer) => {
      return volunteer.name.toLowerCase().includes(query.toLowerCase());
    });

    if (isAdmin && query === '') return data;
    if (isAdmin) return filteredValues;
    if (filteredValues.length === 1) return filteredValues;
    return [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isAdmin])

  const noDataMessage = () => {
    if (isAdmin || query.length) return "There are no records to display";
    return "You're on guest mode. Please search for your name to view your profile";
  }

  const openModal = () => {
    router.push("/volunteer/add");
  }

  return (
    <Fragment>
        <div className="flex flex-col gap-7 text-slate-700 px-32">
          <div className="flex justify-between">
            <h1 className="text-2xl">
              Volunteers List
            </h1>
            <div className="flex gap-3 justify-end w-1/2">
              <div className="w-1/2">
                <CpInput onChange={(event) => setQuery(event.target.value)} />
              </div>
              <button
                onClick={openModal}
                id="add-volunteer"
                className="flex flex-col justify-center bg-sky-600 py-1 px-2 rounded-xl h-10"
              >
                <IoPersonAdd size={24} className="text-slate-50" />
              </button>
            </div>
          </div>
          <div className="py-1 border border-slate-200 rounded-md">
            <DataTable
              columns={columns}
              data={filteredVolunteers}
              conditionalRowStyles={conditionalRowStyles}
              pagination={isAdmin}
              onRowClicked={(row: Data) => router.push(`/volunteer/profile/${row._id}`)}
              noDataComponent={
                <div className="flex h-96 flex-col justify-center">
                  <div className="flex gap-1 text-slate-700">
                    <PiLegoSmileyDuotone size={27} />
                    <div className="flex flex-col justify-center">{noDataMessage()}</div>
                    <PiLegoSmiley size={27} />
                  </div>
                </div>
              }
              customStyles={{
                headCells: {
                  style: {
                    color: "#334155"
                  }
                },
              }}
            />
          </div>
        </div>
        <Tooltip variant="info" anchorSelect="#add-volunteer" place="top-end">Add Volunteer</Tooltip>
    </Fragment>
  )
}
