import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";

export default async function TestVolunteerLookup() {
  let volunteers = [];
  let error = null;
  
  try {
    await connectMongoDB();
    volunteers = await Volunteer.find({}).limit(5).select('volunteerId name firstName lastName');
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Volunteer ID Lookup Test</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Sample Volunteer IDs:</h2>
        <div className="space-y-2">
          {volunteers.map((volunteer: any) => (
            <div key={volunteer._id} className="border p-2 rounded">
              <strong>ID:</strong> {volunteer.volunteerId || 'No ID'} | 
              <strong> Name:</strong> {volunteer.firstName} {volunteer.lastName}
              <br />
              <a 
                href={`/volunteer/id/${volunteer.volunteerId}`}
                className="text-blue-600 hover:underline"
              >
                Test Lookup: /volunteer/id/{volunteer.volunteerId}
              </a>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold">Environment Info:</h3>
        <p>VERCEL_URL: {process.env.VERCEL_URL || 'Not set'}</p>
        <p>NEXTAUTH_URL: {process.env.NEXTAUTH_URL || 'Not set'}</p>
      </div>
    </div>
  );
}