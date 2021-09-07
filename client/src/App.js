import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/layout/sidebar/Sidebar";
import { Content } from "./components/layout/content/Content.js";
import "./components/layout/layout.css";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient()

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Router>
      <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <QueryClientProvider client= { queryClient }>
          <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
        </QueryClientProvider>
      </div>
    </Router>
  );
};

export default App;