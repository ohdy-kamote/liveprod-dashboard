import EditTopicForm from "@/components/EditTopicForm";
import { Fragment } from "react";

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to get topic!");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function EditTopic({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await getTopicById(id);
  const { title, description } = data;

  return (
    <Fragment>
      <EditTopicForm id={id} title={title} description={description} />
    </Fragment>
  )
}