import Link from "next/link";

export default async function NotFoundPage() {
  return (
    <>
      <div className="mt-4 flex h-[85vh] w-full flex-col items-center justify-center gap-2 px-4 text-center md:px-8 xl:px-12">
        <p>Page You are looking for is Not Found.</p>
        <p>
          Go back to{" "}
          <Link className="underline" href="/">
            Home Page
          </Link>
        </p>
      </div>
    </>
  );
}
