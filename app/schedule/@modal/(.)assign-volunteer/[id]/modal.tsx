import { Modal } from "@/components/Modal";

export function AssignVolunteerModal(props: Readonly<{
  children: React.ReactNode;
}>) {
  return <Modal title="Select Volunteer" maxHeight="max-h-[550px]">
    {props.children}
  </Modal>
}
