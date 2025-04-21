export const configs = {
  SESSION_MAX_AGE: process.env.SESSION_MAX_AGE || "12",
  SESSION_UPDATE_AGE: process.env.SESSION_UPDATE_AGE || "1",
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY
}

const role = {
  FOH: "foh",
  FOH_ASSISTANT: "foh assistant",
  FOH_OBSERVER_1: "foh observer 1",
  FOH_OBSERVER_2: "foh observer 2",
  MONITOR_MIX: "monitor mix",
  RF_TECH: "rf tech",
  MONITOR_MIX_TRAINEE: "monitor mix trainee",
  MONITOR_MIX_OBSERVER: "monitor mix observer",
  BROADCAST_MIX: "broadcast mix",
  BROADCAST_MIX_ASSISTANT: "broadcast mix assistant",
  BROADCAST_MIX_TRAINEE: "broadcast mix trainee",
  BROADCAST_MIX_ASSISTANT_TRAINEE: "broadcast mix assistant trainee",
  BROADCAST_MIX_OBSERVER: "broadcast mix observer",
  NXTGEN: "nxtgen",
  NXTGEN_TRAINEE: "nxtgen trainee",
  NXTGEN_OBSERVER: "nxtgen observer",
  AUDIO_VOLUNTEER_1: "audio volunteer 1",
  AUDIO_VOLUNTEER_2: "audio volunteer 2",
}

export const category: { [key: string]: string[] } = {
  SERVICES: [
    "sns1",
    "sns2",
    "sunday1",
    "sunday2",
    "sunday3",
    "sunday4",
    "idc",
    "b1g",
    "mmrc",
    "special event"
  ],
  SATURDAY_SERVICE: ["sns"],
  SATURDAY_SERVICES: [
    "sns1",
    "sns2",
  ],
  SUNDAY_SERVICES: [
    "sunday1",
    "sunday2",
    "sunday3",
    "sunday4",
  ],
  REGULAR_SERVICES: [
    "sns1",
    "sns2",
    "sunday1",
    "sunday2",
    "sunday3",
    "sunday4",
  ],
  ROLES: [
    role.FOH,
    role.FOH_ASSISTANT,
    role.FOH_OBSERVER_1,
    role.FOH_OBSERVER_2,
    role.MONITOR_MIX,
    role.RF_TECH,
    role.MONITOR_MIX_TRAINEE,
    role.MONITOR_MIX_OBSERVER,
    role.BROADCAST_MIX,
    role.BROADCAST_MIX_ASSISTANT,
    role.BROADCAST_MIX_TRAINEE,
    role.BROADCAST_MIX_ASSISTANT_TRAINEE,
    role.BROADCAST_MIX_OBSERVER,
    role.NXTGEN,
    role.NXTGEN_TRAINEE,
    role.NXTGEN_OBSERVER,
    role.AUDIO_VOLUNTEER_1,
    role.AUDIO_VOLUNTEER_2
  ],
  SNS_ROLES: [
    role.FOH,
    role.FOH_ASSISTANT,
    role.FOH_OBSERVER_1,
    role.FOH_OBSERVER_2,
    role.MONITOR_MIX,
    role.MONITOR_MIX_TRAINEE,
    role.MONITOR_MIX_OBSERVER,
    role.BROADCAST_MIX,
    role.BROADCAST_MIX_ASSISTANT,
    role.BROADCAST_MIX_TRAINEE,
    role.BROADCAST_MIX_ASSISTANT_TRAINEE,
    role.BROADCAST_MIX_OBSERVER,
    role.AUDIO_VOLUNTEER_1,
    role.AUDIO_VOLUNTEER_2
  ],
  TIERS: [
    "independent",
    "observer",
    "trainee"
  ],
  SEGMENTS: [
    "audio",
    "lights",
    "camera",
    "graphics",
    "stage",
    "volunteer management"
  ],
  STATUS: [
    "observer",
    "trainee",
    "active",
    "inactive",
    "on leave"
  ]
}

export const saturday = {
  FIRST_SERVICE: "4:00 pm",
  SECOND_SERVICE: "6:30 pm",
}

export const sunday = {
  FIRST_SERVICE: "9:00 am",
  SECOND_SERVICE: "12:00 pm",
  THIRD_SERVICE: "3:00 pm",
  FOURTH_SERVICE: "6:00 pm"
}

export const service = {
  SATURDAY: "saturday",
  SUNDAY: "sunday",
}

export const serviceTime = {
  [saturday.FIRST_SERVICE]: "16:00",
  [saturday.SECOND_SERVICE]: "18:30",
  [sunday.FIRST_SERVICE]: "09:00",
  [sunday.SECOND_SERVICE]: "12:00",
  [sunday.THIRD_SERVICE]: "15:00",
  [sunday.FOURTH_SERVICE]: "18:00"
}

export const color = {
  STATUS: {
    [category.STATUS[0]]: "text-blue-800",
    [category.STATUS[1]]: "text-yellow-800",
    [category.STATUS[2]]: "text-green-800",
    [category.STATUS[3]]: "text-red-800",
    [category.STATUS[4]]: "text-orange-800",
  }
}

export const roleFilter = [
  {
    label: "FOH",
    value: "foh",
    href: "/schedule/role/foh",
    roles: [
      role.FOH,
      role.FOH_ASSISTANT,
      role.FOH_OBSERVER_1,
      role.FOH_OBSERVER_2,
    ]
  },
  {
    label: "BC Mix",
    value: "bc-mix",
    href: "/schedule/role/bc-mix",
    roles: [
      role.BROADCAST_MIX,
      role.BROADCAST_MIX_ASSISTANT,
      role.BROADCAST_MIX_TRAINEE,
      role.BROADCAST_MIX_ASSISTANT_TRAINEE,
      role.BROADCAST_MIX_OBSERVER,
    ]
  },
  {
    label: "Mon Mix",
    value: "mon-mix",
    href: "/schedule/role/mon-mix",
    roles: [
      role.MONITOR_MIX,
      role.RF_TECH,
      role.MONITOR_MIX_TRAINEE,
      role.MONITOR_MIX_OBSERVER,
    ]
  },
  {
    label: "NXTGen",
    value: "nxtgen",
    href: "/schedule/role/nxtgen",
    roles: [
      role.NXTGEN,
      role.NXTGEN_TRAINEE,
      role.NXTGEN_OBSERVER,
    ]
  },
  {
    label: "Assistant",
    value: "assistant",
    href: "/schedule/role/assistant",
    roles: [
      role.FOH_ASSISTANT,
      role.BROADCAST_MIX_ASSISTANT
    ]
  },
  {
    label: "Observer",
    value: "observer",
    href: "/schedule/role/observer",
    roles: [
      role.FOH_OBSERVER_1,
      role.FOH_OBSERVER_2,
      role.MONITOR_MIX_OBSERVER,
      role.BROADCAST_MIX_OBSERVER,
      role.NXTGEN_OBSERVER
    ]
  },
  {
    label: "Volunteer",
    value: "volunteer",
    href: "/schedule/role/volunteer",
    roles: [
      role.AUDIO_VOLUNTEER_1,
      role.AUDIO_VOLUNTEER_2
    ]
  },
  {
    label: "All",
    value: "all",
    href: "/schedule/role/all",
    roles: category.ROLES
  }
]
