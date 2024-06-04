import { ChangeEventHandler } from "react"

interface InputText {
  label: string
  value: string
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function CpInputText({ label, value, disabled, onChange }: InputText) {
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <label htmlFor="input" className="text-slate-500 pl-3 capitalize">{`${label}:`}</label>
      <input
        type="text"
        name={label}
        value={value}
        disabled={disabled}
        onChange={onChange}
        autoComplete="off"
        className="bg-zinc-100 rounded-sm border border-b-slate-500 focus:border-b-sky-500 px-3 py-2 focus:outline-none capitalize text-slate-700"
      />
    </div>
  )
}
