import type { Metadata } from "next";
import { CourseView } from "@/components/app/views/CourseView";

export const metadata: Metadata = { title: "Course" };
export default function Page() {
  return <CourseView />;
}
