"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { updatePreference } from "@/server/actions/user";
import { useTransition } from "react";
import { useToast } from "@/client/hooks/use-toast";

interface PreferencesProps {
  defaultPublic: boolean;
  emailNotifications: boolean;
  darkMode: boolean;
  dict: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function Preferences({
  defaultPublic,
  emailNotifications,
  darkMode,
  dict,
}: PreferencesProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handlePreferenceChange = (key: string) => async (checked: boolean) => {
    startTransition(async () => {
      const result = await updatePreference(key, checked);
      if (!result.success) {
        toast({
          title: "Error",
          description: "Failed to update preference",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex gap-4 mt-4">
      <div className="flex items-center gap-2">
        <Switch
          checked={defaultPublic}
          onCheckedChange={handlePreferenceChange("defaultPublic")}
          id="defaultPublic"
          disabled={isPending}
        />
        <Label htmlFor="defaultPublic">
          {dict.profile.defaultPublicRecipes}
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={emailNotifications}
          onCheckedChange={handlePreferenceChange("emailNotifications")}
          id="emailNotifications"
          disabled={isPending}
        />
        <Label htmlFor="emailNotifications">
          {dict.profile.emailNotifications}
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={darkMode}
          onCheckedChange={handlePreferenceChange("darkMode")}
          id="darkMode"
          disabled={isPending}
        />
        <Label htmlFor="darkMode">{dict.profile.darkMode}</Label>
      </div>
    </div>
  );
}
