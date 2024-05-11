import { category } from "@/utils/constants";



export default async function ScheduleBySegment() {
  return (
    <table className="table-auto border border-slate-500 w-3/5 bg-slate-300">
      <thead>
        <tr>
          <th className="border-l border-slate-500 bg-slate-100"></th>
          <th className="bg-slate-100"></th>
          <th className="border-l border-slate-500">May 11</th>
          <th className="border-l border-slate-500 bg-green-400">May 12</th>
          <th className="border-l border-slate-500 bg-green-400">May 12</th>
          <th className="border-l border-slate-500 bg-green-400">May 12</th>
        </tr>
        <tr>
          <th className="border-l border-slate-500 bg-slate-100"></th>
          <th className="bg-slate-100"></th>
          <th className="border-l border-slate-500">SNS</th>
          <th className="border-l border-slate-500 bg-green-400">9 AM</th>
          <th className="border-l border-slate-500 bg-green-400">12 NN</th>
          <th className="border-l border-slate-500 bg-green-400">3 PM</th>
        </tr>
      </thead>
      <tbody>
        { category.ROLES.map((role, i) => (
          <tr key={i}>
            <td className="border border-slate-500 bg-slate-100 w-9 text-center">{i}</td>
            <td className="border border-slate-500 bg-slate-100 px-1 w-64 uppercase">{role}</td>
            <td className="border border-slate-500 bg-slate-100"></td>
            <td className="border border-slate-500 bg-slate-100"></td>
            <td className="border border-slate-500 bg-slate-100"></td>
            <td className="border border-slate-500 bg-slate-100"></td>
          </tr>
        )) }
      </tbody>
    </table>
  )
}
