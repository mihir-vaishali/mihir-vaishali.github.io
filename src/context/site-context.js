import { createContext } from "react";

import { site } from "../config/site";

/** Every section reads its copy from here, so one config object drives the page. */
export const SiteContext = createContext(site);
