import './App.css';
import {StrictMode} from "react";
import Authorization from "./pages/Auth.tsx";

export default function App() {
    return (
        <StrictMode>
            <Authorization />
        </StrictMode>
    );
}
