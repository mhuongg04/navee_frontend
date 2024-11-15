import { ROUTER } from "./utils/router";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Test from "./pages/test";
import Assignment from "./pages/assignment";
import Learn from "./pages/learn";
import DemoLearn from "./pages/learn/demoLearn";
import DataLibrary from "./pages/datalibrary";
import { Route, Routes } from "react-router-dom";
import Lessons from "./pages/learn/components/lesson";
import Game from "./pages/learn/components/minigame";

const renderUserRouter = () => {
    const userRouters = [
        // {
        //     path: ROUTER.USER.DEFAULT,
        //     component: <Default/>
        // },
        {
            path: ROUTER.USER.DASHBOARD,
            component: <Dashboard />
        },
        {
            path: ROUTER.USER.PROFILE,
            component: <Profile />
        },
        {
            path: ROUTER.USER.ASSIGNMENT,
            component: <Assignment />
        },
        {
            path: ROUTER.USER.LEARN,
            component: <Learn />
        },
        {
            path: ROUTER.USER.TEST,
            component: <Test />
        },
        {
            path: ROUTER.USER.DATALIBRARY,
            component: <DataLibrary />
        },
        {
            path: '/learn/1',
            component: <Lessons />
        },
        {
            path: '/lesson/1',
            component: <DemoLearn />
        },
        {
            path: '/game/1',
            component: <Game />
        }



    ]

    return (
        <Routes>
            {
                userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))
            }
        </Routes>
    )
}

const RouterCustom = () => {
    return renderUserRouter()
}

export default RouterCustom