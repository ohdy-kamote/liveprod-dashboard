import { auth } from "@/auth";
import SCMonthlyCalendar from "@/components/server/SCMonthlyCalendar";
import { category } from "@/utils/constants";
import { Fragment } from "react";

export default async function RoleCalendarPage({ params }: { params: { role: string } }) {
  const session = await auth();
  const isAdmin = session && session.user?.username;

  const role = decodeURI(params.role);
  
  if (!category.ROLES.includes(role)) {
    redirect("/schedule/calendar");
  }

  return (
    <Fragment>
      <div className="p-4 bg-green-50 border-l-4 border-green-400 mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2">
          {role.toUpperCase()} Calendar
        </h1>
        <p className="text-green-700">
          View all scheduled events for {role} role in a monthly calendar format.
          {isAdmin ? (
            <span className="block mt-2 text-sm font-medium text-green-600">
              ✅ You have admin access - you can edit and manage events.
            </span>
          ) : (
            <span className="block mt-2 text-sm font-medium text-gray-600">
              👁️ View-only mode - login as admin to edit events.
            </span>
          )}
        </p>
      </div>
      
      <SCMonthlyCalendar 
        role={role}
        showStatistics={true}
        showLiveProductionEvents={false}
        isAdmin={isAdmin}
      />
    </Fragment>
  );
}
