// src/routes/index.js
import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Home from "../containers/Home";
import Listpropertyfree from "../containers/Listpropertyfree";
import Signup from "../containers/Signup";
import Contactus from "../containers/Contactus";
import Signin from "../containers/signin";
import landlord from "../containers/landlord";
import referearn from "../containers/referearn";
import tenant from "../containers/tenant";
import aboutus from "../containers/aboutus";
import howwework from "../containers/howwework";
import Support from "../containers/Support";
import Careers from "../containers/Careers";
import AddListing from "../containers/addListing";
import Termsconditions from "../containers/Termsconditions";
import Privacy from "../containers/Privacy";
import Refund from "../containers/Refund";
import Blogs from "../containers/Blogs";


const RoutesIndex = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <div className="main-content">
          <Switch location={location}>
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
            <Route path="/AddListing" component={AddListing} />
            <Route path="/Termsconditions" component={Termsconditions} />
            <Route path="/Privacy" component={Privacy} />
            <Route path="/Refund" component={Refund} />
            <Route path="/Blogs" component={Blogs} />

          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default RoutesIndex;
