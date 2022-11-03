import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerHome from '../pages/CustomerHome';
import AddNewBuildingPage from '../pages/AddNewBuildingPage';
import SearchBuildingPage from '../pages/SearchBuildingPage';
import BuildingDetailsPage from '../pages/BuildingDetailsPage';
import EditBuildingPage from '../pages/EditBuildingPage';
import Home from '../pages/Home';
// import { AuthContext } from '../Helpers/AuthContext';
// import { useState, useEffect } from 'react';
// import Axios from 'axios';

function app() {

    // const [authState, setAuthState] = useState(false);

    // useEffect(() => {
    //     // "http://localhost:3001/Auth"
    //     // `${process.env.REACT_APP_SERVER}/Auth`
    //     Axios.get(`${process.env.REACT_APP_SERVER}/Auth`, {
    //         headers: {
    //             "x-access-token": localStorage.getItem("token")
    //         }
    //     })
    //         .then((response) => {

    //             setAuthState(true);

    //         }).catch((e) => {
    //             setAuthState(false);
    //         })

    // }, [])
    return (
        // <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AddNewBuilding" element={<AddNewBuildingPage />} />
                <Route path="/SearchBuilding" element={<SearchBuildingPage />} />
                <Route path="/BuildingDetails/:pageName" element={<BuildingDetailsPage />} />
                <Route path="/EditBuilding/:pageId" element={<EditBuildingPage />} />
                {/* <Route path="/MemberClientRequest/:clientId" element={<MemberClientRequest />} /> */}


                <Route path="*" element={<CustomerHome />} />
            </Routes>
        </Router>
        // </AuthContext.Provider>
    )
}

export default app;