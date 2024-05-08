import { Modal } from "@/components/Modal";

export function AssignVolunteerModal(props: Readonly<{
  children: React.ReactNode;
}>) {
  return <Modal>
    {props.children}
  </Modal>
}
