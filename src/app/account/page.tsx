import type { Metadata } from "next";
import AccountPageClient from "@/components/AccountPageClient";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your SeniorBrainGames account and preferences.",
  alternates: { canonical: "/account" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AccountPage() {
  return <AccountPageClient />;
}
