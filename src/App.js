// Init
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // v5
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// At the top with other components
import BackToHomeButton from "./components/BackToHomeButton";
import ScrollToTop from "./components/ScrollToTop";

// Files
import "./css/index.css";
import Whatapp from "./components/Whatapp";

// Pages / Containers
import Home from "./containers/Home"; // Main page
import Listpropertyfree from "./containers/Listpropertyfree"; // Form page
import Signup from "./containers/Signup";
import Contactus from "./containers/Contactus";
import Signin from "./containers/signin"; // ✅ fixed casing
import landlord from "./containers/landlord"; // ✅ fixed casing
import referearn from "./containers/referearn"; // ✅ fixed casing
import tenant from "./containers/tenant"; // ✅ fixed casing
import aboutus from "./containers/aboutus";
import howwework from "./containers/howwework";
import Support from "./containers/Support";
import Careers from "./containers/Careers";
import addListing from "./containers/addListing";
import Termsconditions from "./containers/Termsconditions";
import Privacy from "./containers/Privacy";
import Refund from "./containers/Refund";
import Blogs from "./containers/Blogs";
import AddListing from "./components/AddListing";

// Component
function App() {
  return (
    <Router>
      
      <div className="App">
        {/* Toastify Container for Notifications */}
        <ScrollToTop />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          transition={Flip}
        />
        
        

        {/* Routes */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/listpropertyfree" component={Listpropertyfree} />
          <Route path="/signup" component={Signup} />
          <Route path="/contactus" component={Contactus} />
          <Route path="/signin" component={Signin} /> 
          <Route path="/landlord" component={landlord} /> 
          <Route path="/referearn" component={referearn} /> 
          <Route path="/tenant" component={tenant} />
          <Route path="/aboutus" component={aboutus} />
          <Route path="/howwework" component={howwework} />
          <Route path="/Support" component={Support} />
          <Route path="/Careers" component={Careers} />
          <Route path="/addListing" component={addListing} />
          <Route path="/Termsconditions" component={Termsconditions} />
          <Route path="/Privacy" component={Privacy} />
          <Route path="/Refund" component={Refund} />
          <Route path="/Blogs" component={Blogs} />
          <Route path="/editlisting/:id" component={AddListing} />
          
        </Switch>

        {/* WhatsApp Floating Button */}
        <Whatapp />
       {/* Back to Home Button */}
<BackToHomeButton />
      </div>
    </Router>
  );
}

// Export
export default App;
