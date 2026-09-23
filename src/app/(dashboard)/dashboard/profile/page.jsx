import React from "react";
import ProfileSettingsTab from "@/components/Dashboard/tabs/Profile/ProfileSettingsTab";

export const metadata = {
  title: "Profile & Account Settings | Egostix Dashboard",
  description: "Manage user account credentials, preferences, and session security.",
};

export default function ProfilePage() {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
      <ProfileSettingsTab />
    </div>
  );
}
