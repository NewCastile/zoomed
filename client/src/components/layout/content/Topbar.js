import { useState } from "react";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse
} from "reactstrap";
import GlobalLoader from "./GlobalLoader";

const Topbar = ({ toggleSidebar }) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button color="muted" onClick={toggleSidebar}>
        Menu
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
      </Collapse>
      <GlobalLoader></GlobalLoader>
    </Navbar>
  );
};

export default Topbar;