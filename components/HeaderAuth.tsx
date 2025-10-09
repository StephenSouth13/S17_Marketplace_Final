"use client";

import React, { useEffect, useState } from "react";
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SignIn from "./SignIn";

export default function HeaderAuth() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-8 h-8" aria-hidden />;

  return (
    <ClerkLoaded>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox:
                "ring-2 ring-emerald-500 hover:ring-emerald-600 transition-all duration-200",
            },
          }}
        />
      </SignedIn>

      <SignedOut>
        <SignIn />
      </SignedOut>
    </ClerkLoaded>
  );
}
