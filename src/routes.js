import { ROUTER } from "./utils/router";
import Dashboard from "./layouts/dashboard";
import Profile from "./layouts/profile";
import Test from "./layouts/test";
import Assignment from "./layouts/assignment";
import Learn from "./layouts/learn";
import DemoLearn from "./layouts/learn/demoLearn";
import DataLibrary from "./layouts/datalibrary";
import { Route, Routes } from "react-router-dom";

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
            component: <DemoLearn />
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