"use client";
import SupportAgentForm from "@repo/ui/src/pages/SupportAgentForm";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  console.log("RootLayout", process.env.NEXT_PUBLIC_BASE_URL);

  return (
    <main
      className="d-flex  justify-content-center  align-items-center "
      style={{ height: "100vh", width: "100vw" }}
    >
      <SupportAgentForm />
    </main>
  );
}
