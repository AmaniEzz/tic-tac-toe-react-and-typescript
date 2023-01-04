import ReactDOM from "react-dom/client";
import { Game } from "./componants/game";
import "./index.css";

// ================== root ======================

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Game value={""} />);
