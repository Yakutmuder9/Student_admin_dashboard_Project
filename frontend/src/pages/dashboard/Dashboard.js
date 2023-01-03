import { MyProSidebarProvider } from "../../components/global/sidebar/sidebarContext";
import Topbar from "../../components/global/Topbar";
import { Outlet } from "react-router";
import Footer from "../../components/footer/Footer";
import { useMediaQuery, useTheme } from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main className="oveflow-hidden">
          {!mdScreen ?  <Topbar /> : null}
          <Outlet />
          <Footer />
        </main>
      </div>
    </MyProSidebarProvider>
  );
};

export default Dashboard;
