"use client";

import { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("pwa-install-dismissed");
    if (stored) setDismissed(true);

    function handleBeforeInstall(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    setDeferredPrompt(null);
    sessionStorage.setItem("pwa-install-dismissed", "1");
    setDismissed(true);
  }

  function handleDismiss() {
    sessionStorage.setItem("pwa-install-dismissed", "1");
    setDismissed(true);
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg animate-[fade-up_0.4s_ease-out] md:inset-x-auto md:right-6">
      <div className="alert border border-primary/20 bg-base-100 shadow-2xl">
        <div>
          <p className="font-semibold">Install GCTU Consult</p>
          <p className="text-sm text-base-content/70">Add to your home screen for quick booking on mobile.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="btn btn-ghost btn-sm" onClick={handleDismiss}>
            Later
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleInstall}>
            Install
          </button>
        </div>
      </div>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
