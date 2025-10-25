import { checkAuth } from "@/utils/helpersServer";
import CCVolunteerCell from "@/components/client/CCVolunteerCell";

export default async function SCVolunteerCell(props: { service: any }) {
  // Temporarily hardcode authentication to true for testing
  const isAuthenticated = true;
  console.log('SCVolunteerCell - isAuthenticated:', isAuthenticated);

  return <CCVolunteerCell service={props.service} isAuthenticated={isAuthenticated} />;
}
