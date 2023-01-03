import { MyProSidebarProvider } from "../../components/global/sidebar/sidebarContext";
import Topbar from "../../components/global/Topbar";
import { Outlet } from "react-router";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  
  
  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main className="oveflow-hidden">
          <Topbar />
          <Outlet />
          <Footer />
        </main>
      </div>
    </MyProSidebarProvider>
  );
};

export default Dashboard;
