// src/routes/index.js
import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Home from "../containers/Home";
import Listpropertyfree from "../containers/Listpropertyfree";
import Signup from "../containers/Signup";
import Contactus from "../containers/Contactus";
import Signin from "../containers/signin";
import Landlord from "../containers/landlord";
import referearn from "../containers/referearn";
import tenant from "../containers/tenant";
import aboutus from "../containers/aboutus";
import howwework from "../containers/howwework";
import Support from "../containers/Support";
import Careers from "../containers/Careers";
import AddListing from "../containers/addListing";

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
            <Route path="/landlord" component={Landlord} />
            <Route path="/referearn" component={referearn} />
            <Route path="/tenant" component={tenant} />
            <Route path="/aboutus" component={aboutus} />
            <Route path="/howwework" component={howwework} />
            <Route path="/Support" component={Support} />
            <Route path="/Careers" component={Careers} />
            <Route path="/AddListing" component={AddListing} />
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default RoutesIndex;
