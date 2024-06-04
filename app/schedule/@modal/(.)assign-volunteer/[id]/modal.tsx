import { Modal } from "@/components/Modal";

export function AssignVolunteerModal(props: Readonly<{
  children: React.ReactNode;
}>) {
  return <Modal title="Select Volunteer" maxHeight="550px">
    {props.children}
  </Modal>
}
