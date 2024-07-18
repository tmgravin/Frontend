
import { redirect } from "next/navigation";
export default function Home() {
 
 redirect('./homepage')
  return (
    <div>
      hello world
    </div>
  );
}
