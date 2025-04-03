import Nav from "../../../components/NavBar/NavBar";
import SideMenu from "../../../components/SideMenu/BOSide";
import "../../../../public/styles/common.css";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";

    
    

// Define types for PopupTable props


export default function test123() {

  return (
    <div className="main-container">
      <Nav />
      <SideMenu />
      <CreateEmployee/>
      <EditEmployee/>
    </div>
  );
}
