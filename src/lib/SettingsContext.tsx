import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSettings } from "./api";
import { DEFAULT_CONTACT, BRAND } from "../config";
import type { SiteSettings } from "../types";

const defaults: SiteSettings = {
  phone: DEFAULT_CONTACT.phone,
  whatsapp: DEFAULT_CONTACT.whatsapp,
  address: DEFAULT_CONTACT.address,
  instagram: DEFAULT_CONTACT.instagram,
  email: DEFAULT_CONTACT.email,
  about_text: BRAND.about,
};

const SettingsContext = createContext<SiteSettings>(defaults);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaults);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => setSettings(defaults));
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SiteSettings {
  return useContext(SettingsContext);
}
