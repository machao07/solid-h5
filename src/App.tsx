import type { Component } from 'solid-js';
import { Router, Route, Routes, hashIntegration } from "@solidjs/router";
import { lazy } from "solid-js";
const PlanOne = lazy(() => import('./pages/PlanOne'));

const App: Component = () => {
    return (
        <>
            <div class='toast-info' />
            <Router source={hashIntegration()}>
                <Routes>
                    <Route path="/" component={PlanOne} />
                    <Route path="/planOne" component={PlanOne} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
