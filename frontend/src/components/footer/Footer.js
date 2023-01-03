import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="footer shadow" style={{ backgroundColor: `${colors.primary[400]}` }}>
      <div className="container-fluid">
        <div className="d-flex p-1 justify-content-between align-items-center align-items-center">
          <div className="">
            <div className=" bolder">
              ©<script>document.write(new Date().getFullYear());</script>, made
              by
              <a href="https://yamhub.netlify.app" className="font-weight-bold ">
                {" "}
                Yakut Ahmedin{" "}
              </a>
            </div>
          </div>

          <div className="">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a href="#" className="nav-link text-muted">
                  Creative Projects
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-muted">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-muted">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link pe-0 text-muted">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
