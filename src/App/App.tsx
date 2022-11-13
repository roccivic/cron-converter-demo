import { Expression } from "./Expression";
import { Info } from "./Info";
import { Parts } from "./Parts";
import { Provider } from "react-redux";
import { Schedule } from "./Schedule";
import { store } from "../redux/store";
import { Title } from "./Title";
import { FaExternalLinkAlt } from "react-icons/fa";

export const App = () => (
  <div>
    <Title />
    <div className="container" style={{ padding: 15 }}>
      <p>
        <a href="https://github.com/roccivic/cron-converter">
          <FaExternalLinkAlt style={{ fontSize: 12, verticalAlign: -1 }} /> View the cron-converter
          repository on GitHub.
        </a>
      </p>
      <Provider store={store}>
        <div className="row">
          <div className="col-xl-6">
            <Expression />
          </div>
          <div className="col-xl-6">
            <Schedule />
          </div>
        </div>
        <Info />
        <Parts />
      </Provider>
    </div>
  </div>
);
