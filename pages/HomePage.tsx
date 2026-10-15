import ConcentrationLoader from "./components/ConcentrationLoader";
import SiteFlags from "./components/SiteFlags";
import ScentRail from "./components/ScentRail";
import BeamHero from "./components/BeamHero";
import DarkStatement from "./components/DarkStatement";
import TheDrop from "./components/TheDrop";
import ServiceTicker from "./components/ServiceTicker";
import GlassCollection from "./components/GlassCollection";
import WristMist from "./components/WristMist";
import SizeShelf from "./components/SizeShelf";
import NightFinder from "./components/NightFinder";
import GiftBento from "./components/GiftBento";
import NightNotes from "./components/NightNotes";
import RainClosing from "./components/RainClosing";
import ContactSection from "./components/ContactSection";
import WhatsAppButton from "./components/WhatsAppButton";
import NocturneFooter from "./components/NocturneFooter";
import SectionMotion from "./components/SectionMotion";
import Transitions from "./components/Transitions";
import Details from "./components/Details";
import CartDrawer from "./components/CartDrawer";

const ICON = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#0d0b0a"/><text x="32" y="44" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="40" fill="#e9a04c">Q</text></svg>`,
)}`;

/** AUREX: a perfume told in light and smoke. Plan + Motion map: site/DESIGN.md. */
export default function Page() {
  return (
    <>
      {/* never restore the old scroll position on reload · cover the page as it unloads so a reload never flashes
          the old page · ?record=1: hide the mouse arrow from the first frame */}
      <script
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration="manual";addEventListener("pagehide",function(){var c=document.createElement("div");c.style.cssText="position:fixed;inset:0;z-index:2147483647;background:#0d0b0a";document.body.appendChild(c)});addEventListener("pageshow",function(e){if(e.persisted)location.reload()});if(/[?&]record/.test(location.search)){var s=document.createElement("style");s.textContent="*,*::before,*::after{cursor:none!important}html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";document.head.appendChild(s)}`,
        }}
      />
      <link rel="icon" type="image/svg+xml" href={ICON} />
      <SiteFlags />
      <ConcentrationLoader />
      <SectionMotion />
      <Transitions />
      <Details />
      <ScentRail />
      <CartDrawer />
      <WhatsAppButton />
      <main className="relative overflow-x-clip">
        <BeamHero />
        <DarkStatement />
        <TheDrop />
        <ServiceTicker />
        <GlassCollection />
        <WristMist />
        <SizeShelf />
        <NightFinder />
        <GiftBento />
        <NightNotes />
        <RainClosing />
        <ContactSection />
      </main>
      <NocturneFooter />
    </>
  );
}
