import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import Authorization from './pages/Auth.tsx'
import Feed from './pages/Feed.tsx'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Authorization />} />
                <Route path="/feed" element={<Feed />} />
            </Routes>
        </BrowserRouter>
    )
}
