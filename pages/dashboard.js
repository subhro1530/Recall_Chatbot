import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>
        Welcome to your Dashboard,{" "}
        {session?.user?.name || session?.user?.username}!
      </h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
