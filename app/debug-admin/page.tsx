import connectMongoDB from "@/libs/mongodb";
import Admin from "@/models/admin";

export default async function DebugAdmin() {
  try {
    await connectMongoDB();
    
    const admins = await Admin.find({}).select('username');
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Debug</h1>
        <p>Total admins: {admins.length}</p>
        
        <h2 className="text-xl mt-4 mb-2">Admin usernames:</h2>
        {admins.map(admin => (
          <div key={admin._id} className="p-2 bg-gray-100 mb-2 rounded">
            <strong>{admin.username}</strong>
          </div>
        ))}
      </div>
    );
  } catch (error: any) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}