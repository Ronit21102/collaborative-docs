import { Button } from "@/components/ui/button";
import Link from "next/link";
const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex">
        
        click
        <Button variant="outline">
          <Link href="/documents/123">here</Link>{" "}
        </Button>
        to see the particular document page.
      </div>
    </div>
  );
};

export default Home;
