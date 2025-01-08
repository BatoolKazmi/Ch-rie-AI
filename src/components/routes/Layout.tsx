import { Outlet } from "react-router-dom";
import NavBar from '../NavBar';
import Footer from '../Footer';
import { ColorModeProvider } from "@/components/ui/color-mode"
import { Theme } from "@chakra-ui/react"

export default function Layout() {
  return (
    <>
      <ColorModeProvider forcedTheme="light">
      <Theme appearance="light">
        <NavBar />
        <main className="pb-12">
          <Outlet />
        </main>
        <Footer />
      </Theme>
      </ColorModeProvider>
    </>
  );
}