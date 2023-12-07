import type { Component } from 'solid-js';
import { Router, Route, Routes, hashIntegration } from "@solidjs/router";
import { lazy } from "solid-js";
const PlanOne = lazy(() => import('./pages/PlanOne'));
const PlanTwo = lazy(() => import('./pages/PlanTwo'));

const App: Component = () => {
    return (
        <>
            <div class='toast-info'></div>
            <Router source={hashIntegration()}>
                <Routes>
                    <Route path="/" component={PlanTwo} />
                    <Route path="/planOne" component={PlanOne} />
                    <Route path="/planTwo" component={PlanTwo} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
