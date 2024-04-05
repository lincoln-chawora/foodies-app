import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="/meals">View meals</Link>
            <Link href="/meals/share">Share Meal</Link>
            <Link href="/community">View community</Link>
        </div>
    </main>
  );
}
