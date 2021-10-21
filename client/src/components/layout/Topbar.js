import {
  Navbar,
  Button
} from "reactstrap";
import GlobalLoader from "./GlobalLoader";

const Topbar = ({ toggleSidebar }) => {
  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
      style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}
    >
      <Button color="muted" onClick={toggleSidebar}>
        Menu
      </Button>
      <GlobalLoader></GlobalLoader>
    </Navbar>
  );
};

export default Topbar;