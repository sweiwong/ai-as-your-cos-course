import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center text-center flex-1 px-6">
      <h1 className="text-3xl font-bold mb-8">AI as Your Chief of Staff</h1>
      <Link
        href="/docs"
        className="px-8 py-3 rounded-lg text-lg font-semibold bg-[hsl(40,85%,55%)] text-[hsl(30,20%,10%)] hover:opacity-90 transition-opacity"
      >
        Start the Course
      </Link>
    </div>
  );
}
