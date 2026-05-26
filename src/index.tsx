import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./styles/global.css";
import "./styles/animations.css";
import App from "./App";
import SignIn from "./pages/SignIn";
import Careers from "./pages/Careers";
import RequestDemo from "./pages/RequestDemo";
import TalkExpert from "./pages/TalkExpert";

render(
  () => (
    <Router>
      <Route path="/" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/careers" component={Careers} />
      <Route path="/demo" component={RequestDemo} />
      <Route path="/talk" component={TalkExpert} />
    </Router>
  ),
  document.getElementById("root")!
);
