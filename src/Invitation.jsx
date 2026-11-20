import { useCallback, useEffect, useState } from "react";

import { SiteContext } from "./context/site-context";
import { CurtainIntro } from "./components/CurtainIntro";
import { FlowerRain } from "./components/FlowerRain";
import { InvitationHero } from "./components/InvitationHero";
import { CountdownSection } from "./components/CountdownSection";
import { EventsSection } from "./components/EventsSection";
import { VenueSection } from "./components/VenueSection";

/**
 * The complete invitation, driven entirely by `config`.
 *
 * `skipCurtain` is for the admin preview, where re-opening the curtain on every
 * keystroke would be unusable.
 */
export function Invitation({ config, skipCurtain = false }) {
  const [opened, setOpened] = useState(skipCurtain);

  const open = useCallback(() => setOpened(true), []);

  useEffect(() => {
    if (skipCurtain) setOpened(true);
  }, [skipCurtain]);

  // Keep the page still behind the curtain so the intro reads as one screen.
  useEffect(() => {
    if (opened) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [opened]);

  return (
    <SiteContext.Provider value={config}>
      {!opened ? <CurtainIntro onOpen={open}
        logoSrc="/images/logo.png"
        textureSrc="/images/mandala-texture.jpg" /> : null}

      {/* <FlowerRain active={opened} /> */}

      <InvitationHero active={opened} />
      <CountdownSection />
      <EventsSection />
      <VenueSection />
    </SiteContext.Provider>
  );
}
