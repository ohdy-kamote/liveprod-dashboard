import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";

export async function generateVolunteerId(): Promise<string> {
  await connectMongoDB();
  
  let volunteerId: string;
  let isUnique = false;
  
  // Keep generating random IDs until we find a unique one
  while (!isUnique) {
    // Generate random 5-digit number (10000-99999)
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    volunteerId = `CCF-LP-${randomNumber}`;
    
    // Check if this ID already exists
    const existing = await Volunteer.findOne({ volunteerId });
    if (!existing) {
      isUnique = true;
    }
  }
  
  return volunteerId!;
}