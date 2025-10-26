import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";

export default async function DebugLookup() {
  const testId = "A313273";
  
  try {
    await connectMongoDB();
    
    // Test the exact same logic as volunteer ID lookup
    const volunteer = await Volunteer.findOne({ volunteerId: testId });
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Debug Volunteer Lookup</h1>
        <p>Testing ID: {testId}</p>
        
        {volunteer ? (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <h3 className="font-bold">✅ Volunteer Found:</h3>
            <p>ID: {volunteer._id}</p>
            <p>Name: {volunteer.firstName} {volunteer.lastName}</p>
            <p>Volunteer ID: {volunteer.volunteerId}</p>
            <p>Redirect would go to: /volunteer/profile/{volunteer._id}</p>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-red-100 rounded">
            <h3 className="font-bold">❌ Volunteer Not Found</h3>
            <p>Would redirect to: /volunteer/all</p>
          </div>
        )}
      </div>
    );
  } catch (error: any) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Debug Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}