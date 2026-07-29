import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    console.log("Nova versão disponível");
  },

  onOfflineReady() {
    console.log("Aplicativo pronto offline");
  },
});
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
      <App />
    </BrowserRouter>
);