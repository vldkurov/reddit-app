import React, {Suspense} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import './App.css';
import Root from "../Root/Root";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '../../views/Home/Home'));


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
        <Route index element={<Home/>}/>
        {/* Define other routes here */}
    </Route>
));

function App() {
    return (
        <>
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <RouterProvider router={router}/>
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

export default App;
