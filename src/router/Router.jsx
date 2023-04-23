import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Hall from '../home/Hall'

export default function Router() {
  return (
    <HashRouter>
        <Routes>
            <Route path="/" element={<Hall/>}/>
        </Routes>
    </HashRouter>
)
}
