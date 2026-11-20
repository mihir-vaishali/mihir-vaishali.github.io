import { Invitation } from "./Invitation";
import { site } from "./config/site";

export default function App() {
  return <Invitation config={site} />;
}
