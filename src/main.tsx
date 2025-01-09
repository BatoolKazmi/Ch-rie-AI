import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider"



// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
        <App />
    </Provider>
  </React.StrictMode>
);
