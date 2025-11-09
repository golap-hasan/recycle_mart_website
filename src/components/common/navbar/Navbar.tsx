import NavBottom from "./NavBottom";
import NavMiddle from "./NavMiddle";
import NavTop from "./NavTop";

export default function Navbar() {
  return (
    <header>
      <NavTop />
      <NavMiddle />
      <NavBottom />
    </header>
  );
}
