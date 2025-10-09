//components/Header.tsx
import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import MobileMenu from "./MobileMenu";
import HeaderAuth from "./HeaderAuth";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  const orders = userId ? await getMyOrders(userId) : [];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all duration-300">
      <Container className="flex items-center justify-between py-3 md:py-4 text-gray-800">
        {/* Left: Logo + Mobile */}
        <div className="flex items-center gap-3 md:w-[20%]">
          <MobileMenu />
          <Logo />
        </div>

        {/* Middle: Menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <HeaderMenu />
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-5 justify-end md:w-[20%]">
          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <CartIcon />
          <FavoriteButton />

          {user && (
            <Link
              href="/orders"
              className="relative group text-gray-700 hover:text-emerald-600 transition-colors duration-200"
            >
              <Logs className="w-5 h-5" />
              {orders?.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                  {orders.length}
                </span>
              )}
            </Link>
          )}

          <HeaderAuth />
        </div>
      </Container>
    </header>
  );
};

export default Header;
