import { SOURCE_URL } from "./source";

// ------------------------------------ SCHEDULES ------------------------------------

export const getSchduleByDateRange = async (saturday: string, sunday: string) => {
  try {
    const res = await fetch(`${SOURCE_URL}/api/schedule/filter-by-date/${saturday}/${sunday}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to get schedules by date range");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading schedules by date range", error);
  }
}

export const getSchedulesByRole = async (role: string) => {
  try {
    const res = await fetch(`${SOURCE_URL}/api/schedule/${role}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch schedules");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading schedules:", error);
    // Return a proper error response structure
    return { data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export const getScheduleById = async (id: string) => {
  try {
    const res = await fetch(`${SOURCE_URL}/api/schedule/id/${id}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch schedule");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading schedule:", error);
  }
}

export const getFilteredSchedules = async (request = {}) => {
  try {
    const res = await fetch(`${SOURCE_URL}/api/schedule/filter`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(request)
    });

    if (!res.ok) {
      throw new Error("Failed to get filtered schedule");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading filtered schedule", error);
  }
}

// ------------------------------------ VOLUNTEERS ------------------------------------

export const getAllVolunteers = async () => {
  try {
    const res = await fetch(`${SOURCE_URL}/api/volunteers`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to get volunteers");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading volunteers", error);
    return { data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export const getAllVolunteersPopulated = async () => {
  try {
    const res = await fetch(`${SOURCE_URL}/api/volunteers/populated`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to get volunteers");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading volunteers", error);
  }
}

export const getVolunteerById = async (id: string) => {
  try {
    if (!SOURCE_URL) {
      throw new Error("API source URL is not configured");
    }

    console.log(`Fetching volunteer with ID ${id} from ${SOURCE_URL}/api/volunteers/${id}`);
    const res = await fetch(`${SOURCE_URL}/api/volunteers/${id}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
      throw new Error(errorData.message || `Failed to get volunteer: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!data.data) {
      throw new Error("Invalid response format from server");
    }

    return data;
  } catch (error) {
    console.error("Error loading volunteer:", error);
    throw error; // Rethrow to handle in the component
  }
}
