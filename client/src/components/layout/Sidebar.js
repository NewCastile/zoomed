import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>ZooMed</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>For our best friends</p>
        <NavItem>
          <NavLink tag={Link} to={"/patients"}>
            Patients
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/historials"}>
            Historials
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/reports"}>
            Reports
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/info"}>
            Info
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

export default SideBar;