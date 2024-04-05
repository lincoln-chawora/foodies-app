import Link from "next/link";

export default function MealsPage() {
    return (
        <main>
            <h1>Meals Page</h1>
            <p>Welcome to our meals page</p>
            <Link href="/meals/share">Share</Link>
        </main>
    )
}