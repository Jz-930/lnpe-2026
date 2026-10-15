import NextError from "next/error";
import Head from "next/head";

// Preserve the 500 page shown before the Next.js security update.
export default function ServerErrorPage() {
  return (
    <>
      <NextError statusCode={500} />
      <Head>
        <title>500: Internal Server Error.</title>
        <link rel="icon" href="/favicon.ico" sizes="256x256" type="image/x-icon" />
      </Head>
    </>
  );
}
