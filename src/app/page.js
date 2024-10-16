import { redirect } from 'next/navigation'
import Chatbot from "@/components/Chatbot";

export default function Home() {
  // return (
  //   <>
  //     <Chatbot />
  //   </>
  // );
  redirect('/chatbot')
}
