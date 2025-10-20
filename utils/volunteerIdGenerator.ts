import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";

export async function generateVolunteerId(segment?: string): Promise<string> {
  await connectMongoDB();
  
  let volunteerId: string;
  let isUnique = false;
  
  // Map segments to prefixes
  const segmentPrefixes: { [key: string]: string } = {
    'audio': 'A',
    'stage': 'S', 
    'lights': 'L',
    'camera': 'C',
    'graphics': 'G',
    'volunteer management': 'VM'
  };
  
  const prefix = segmentPrefixes[segment?.toLowerCase() || 'audio'] || 'A';
  const digitCount = prefix === 'VM' ? 5 : 6; // VM uses 5 digits, others use 6
  const minNumber = Math.pow(10, digitCount - 1);
  const maxNumber = Math.pow(10, digitCount) - 1;
  
  // Keep generating random IDs until we find a unique one
  while (!isUnique) {
    const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    volunteerId = `${prefix}${randomNumber.toString().padStart(digitCount, '0')}`;
    
    // Check if this ID already exists
    const existing = await Volunteer.findOne({ volunteerId });
    if (!existing) {
      isUnique = true;
    }
  }
  
  return volunteerId!;
}