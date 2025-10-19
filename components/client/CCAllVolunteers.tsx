"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { PiLegoSmiley, PiLegoSmileyDuotone } from "react-icons/pi";
import GCInputSearch from "@/components/global/GCInputSearch";
import { IoPersonAdd } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteVolunteer } from "@/utils/apis/delete";
import { toast } from "react-toastify";
import { sleep } from "@/utils/helpers";

interface Data {
  _id: string
  name: string
  firstName: string
  lastName: string
  nickName: string
  status: string
  segment: string
  gender: string
  roles: string[]
  active: boolean
}

interface Columns {
  name: string
  selector: (row: Data) => string
  sortable: boolean
  button?: boolean
  width?: string
  wrap?: boolean
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

export default function CCAllVolunteers({ data, isAdmin }: { data: Data[], isAdmin: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const deleteVol = async (volunteerId: string, volunteerName: string) => {
    const confirmed = confirm(`Are you sure you want to remove ${volunteerName} as volunteer?`);
    if (!confirmed) return;

    try {
      const res = await deleteVolunteer(volunteerId);
      if (res.success) {
        toast.info(res.message);
      }
    } catch (error) {
      toast.error("Failed to remove volunteer!");
    } finally {
      await sleep(1000);
      router.refresh();
    }
  }

  const columns: Columns[] = [
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
      selector: (row: Data) => row.nickName || "--",
      sortable: true,
    },
    {
      name: "Segment",
      selector: (row: Data) => row.segment,
      sortable: true,
    },
  ];

  if (isAdmin) {
    columns.splice(0, 0, {
      name: "ID",
      selector: (row: Data) => {
        const volunteerId = (row as any).volunteerId;
        return volunteerId ? volunteerId : "Not Assigned";
      },
      sortable: true,
      width: "140px",
      wrap: true
    });
  }

  if (isAdmin) {
    columns.push(
      {
        name: "Gender",
        selector: (row: Data) => row.gender,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row: Data) => row.status,
        sortable: true,
      },
      {
        name: "Roles",
        selector: (row: Data) => row.roles?.join(', ') || '--',
        sortable: true,
        width: '250px',
        wrap: true,
      }
    );
  }

  if (isAdmin) {
    columns.push({
      name: "Actions",
      selector: (row: Data) => <RiDeleteBinLine className="text-rose-600" onClick={() => deleteVol(row._id, row.name)} size={18} /> as any,
      sortable: false,
      button: true,
    })
  }

  const filteredVolunteers = useMemo(() => {
    if (!isAdmin) {
      return []; // Non-admin users see no volunteers in the list
    }
    
    const filteredValues = data.filter((volunteer) => {
      const matchesQuery = volunteer.name.toLowerCase().includes(query.toLowerCase());
      const matchesGender = !genderFilter || volunteer.gender === genderFilter;
      const matchesStatus = !statusFilter || volunteer.status === statusFilter;
      const matchesRole = !roleFilter || volunteer.roles?.some(role => role.toLowerCase().includes(roleFilter.toLowerCase()));
      
      return matchesQuery && matchesGender && matchesStatus && matchesRole;
    });

    if (query === '' && !genderFilter && !statusFilter && !roleFilter) return data;
    return filteredValues;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, genderFilter, statusFilter, roleFilter, isAdmin, data])

  const noDataMessage = () => {
    if (isAdmin) return "There are no records to display";
    return "Enter your Volunteer ID above to access your profile";
  }

  const openModal = () => {
    router.push("/volunteer/add");
  }

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="flex flex-col gap-7 text-slate-700 px-32 pt-8">
          <div className="flex justify-end items-end mb-6">
            {isAdmin && (
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select 
                    value={genderFilter} 
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="trainee">Trainee</option>
                    <option value="observer">Observer</option>
                    <option value="on leave">On Leave</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input 
                    type="text"
                    value={roleFilter} 
                    onChange={(e) => setRoleFilter(e.target.value)}
                    placeholder="Filter by role"
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}
            <div className="flex gap-3 justify-end">
              {isAdmin ? (
                <div className="w-64">
                  <GCInputSearch onChange={(event) => setQuery(event.target.value)} />
                </div>
              ) : (
                <div className="flex gap-2 items-end">
                  <div className="w-64">
                    <label className="block text-sm font-medium mb-1">Enter Volunteer ID</label>
                    <input
                      type="text"
                      placeholder="CCF-LP-00001"
                      className="w-full p-2 border border-gray-300 rounded"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const volunteerId = (e.target as HTMLInputElement).value.trim();
                          console.log('Volunteer ID entered:', volunteerId);
                          if (volunteerId) {
                            console.log('Navigating to:', `/volunteer/id/${volunteerId}`);
                            router.push(`/volunteer/id/${volunteerId}`);
                          }
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="CCF-LP-00001"]') as HTMLInputElement;
                      const volunteerId = input?.value.trim();
                      console.log('Go button clicked, volunteer ID:', volunteerId);
                      if (volunteerId) {
                        console.log('Navigating to:', `/volunteer/id/${volunteerId}`);
                        router.push(`/volunteer/id/${volunteerId}`);
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 h-10"
                  >
                    Go
                  </button>
                </div>
              )}
              { isAdmin &&
                <button
                  onClick={openModal}
                  id="add-volunteer"
                  className="flex flex-col justify-center bg-sky-600 py-1 px-2 rounded-xl h-10"
                >
                  <IoPersonAdd size={24} className="text-slate-50" />
                </button>
              }
            </div>
          </div>
          <div className={`${isAdmin && !!filteredVolunteers.length ? "border border-slate-200" : ""} rounded-md`}>
            <DataTable
              columns={columns}
              data={filteredVolunteers}
              conditionalRowStyles={conditionalRowStyles}
              pagination={isAdmin}
              {...(isAdmin && {
                paginationPerPage: 25,
                paginationRowsPerPageOptions: [10, 25, 50, 100]
              })}
              onRowClicked={isAdmin ? (row: Data) => router.push(`/volunteer/profile/${row._id}`) : undefined}
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
                    color: "white",
                    backgroundColor: "#1e293b"
                  }
                },
                rows: {
                  style: {
                    minHeight: "2.8rem"
                  }
                }
              }}
            />
          </div>
        </div>
        <Tooltip variant="info" anchorSelect="#add-volunteer" place="top-end">Add Volunteer</Tooltip>
      </div>
    </div>
  )
}
