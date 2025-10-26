import CCVolunteerProfile from "@/components/client/CCVolunteerProfile";
import { getVolunteerById } from "@/utils/apis/get";
import { checkAuth, checkAdminAuth } from "@/utils/helpersServer";
import { redirect } from "next/navigation";

export default async function SCVolunteerProfile({ id }: { id: string }) {
  try {
    console.log('SCVolunteerProfile: Starting to fetch data for volunteer', id);
    
    const [isAuthenticated, isAdmin] = await Promise.all([
      checkAuth().catch(e => {
        console.error('Auth check failed:', e);
        return false;
      }),
      checkAdminAuth().catch(e => {
        console.error('Admin auth check failed:', e);
        return false;
      })
    ]);

    console.log('SCVolunteerProfile: Auth checks completed', { isAuthenticated, isAdmin });

    const res = await getVolunteerById(id);
    
    if (!res?.data) {
      console.error('SCVolunteerProfile: No volunteer data received');
      throw new Error('Volunteer data not found');
    }

    console.log('SCVolunteerProfile: Successfully fetched volunteer data');

    return (
      <CCVolunteerProfile 
        volunteer={res.data} 
        isAuthenticated={isAuthenticated} 
        isAdmin={isAdmin} 
      />
    )
  } catch (error: any) {
    console.error('SCVolunteerProfile Error:', {
      error: error.message,
      stack: error.stack,
      volunteerId: id
    });
    
    if (error.message.includes('not found')) {
      redirect("/volunteer/all?error=volunteer-not-found");
    }
    
    redirect("/volunteer/all?error=fetch-failed");
  }
}
