"use client";

import CpInputText from "./InputTextWithLabel";

export default function CpLogin() {
  return (
    <div className="flex flex-col justify-center h-[calc(100svh_-_16rem)]">
      <div className="flex justify-center">
        <div className="w-1/3 rounded-lg border border-slate-100 shadow-md">
          <div className="flex justify-start py-5 pl-6">
            <h2 className="font-semibold text-lg">
              Admin Login
            </h2>
          </div>
          <div className="bg-slate-300 h-px" />
          <div className="flex flex-col gap-5 px-5 pt-7 pb-6">
            <div className="flex flex-col gap-5">
              <CpInputText label="username" />
              <CpInputText label="password" type="password" />
            </div>
            <button className="bg-sky-600 text-white p-2 rounded-sm">Login</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}