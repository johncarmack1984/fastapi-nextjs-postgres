import { type Post as PostType } from "@/client/requests";

export default function Post({
  title,
  num_hugs,
  patient_description,
  assessment,
  question,
  id,
  comments,
}: PostType) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600">{patient_description}</p>
      <p className="text-gray-600">{assessment}</p>
      <p className="text-gray-600">{question}</p>
      <p className="text-gray-600">Hugs: {num_hugs}</p>
    </div>
  );
}
