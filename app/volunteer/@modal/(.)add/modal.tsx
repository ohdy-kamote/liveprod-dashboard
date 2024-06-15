import { Modal } from "@/components/Modal";

export function AddVolunteerModal(props: Readonly<{
  children: React.ReactNode;
}>) {
  return <Modal title="Add Volunteer" maxHeight="max-h-[450px]">
    {props.children}
  </Modal>
}
