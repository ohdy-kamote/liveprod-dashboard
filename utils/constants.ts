export const configs = {
  SESSION_MAX_AGE: process.env.SESSION_MAX_AGE || "12",
  SESSION_UPDATE_AGE: process.env.SESSION_UPDATE_AGE || "1",
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY
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
    "foh",
    "foh assistant",
    "foh observer 1",
    "foh observer 2",
    "monitor mix",
    "rf tech",
    "monitor mix trainee",
    "monitor mix observer",
    "broadcast mix",
    "broadcast mix assistant",
    "broadcast mix trainee",
    "broadcast mix assistant trainee",
    "broadcast mix observer",
    "nxtgen",
    "nxtgen trainee",
    "nxtgen observer",
    "audio volunteer 1",
    "audio volunteer 2"
  ],
  SNS_ROLES: [
    "foh",
    "foh assistant",
    "foh observer 1",
    "foh observer 2",
    "monitor mix",
    "monitor mix trainee",
    "monitor mix observer",
    "broadcast mix",
    "broadcast mix assistant",
    "broadcast mix trainee",
    "broadcast mix assistant trainee",
    "broadcast mix observer",
    "audio volunteer 1",
    "audio volunteer 2"
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
