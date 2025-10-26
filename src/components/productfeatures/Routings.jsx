import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Specification from './Specification'
import Overview from './Overview'
import Review from './Review'

const Routings = () => {
    return (
        <Routes>
            <Route path="specification" element={<Specification />} />
            <Route path="overview" element={<Overview />} />
            <Route path="review" element={<Review />} />
        </Routes>
    )
}

export default Routings