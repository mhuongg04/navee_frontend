import Dashboard from "./pages/homepage/index.js";
import Profile from "./pages/profile";
import Test from "./pages/test";
import Dictionary from "./pages/dictionary";
import Learn from "./pages/learn";
import Lesson from "./pages/learn/components/lesson";
import Login from "./pages/(auth)/sign-in";
import Signup from "./pages/(auth)/sign-up";
import Management from "./pages/(teacher)/index";
import { Route, Routes } from "react-router-dom";
import Course from "./pages/learn/components/course";
import Game from "./pages/learn/components/minigame";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import MyCourse from "./pages/mycourse/index.js";
import UploadLearningMaterial from "./pages/(teacher)/learning-management/upload-topics/index";
import UploadLessons from "./pages/(teacher)/learning-management/upload-lessons/index.jsx";

const renderUserRouter = () => {
    const userRouters = [
        {
            path: 'login',
            component: <Login />,
            isProtected: false,

        },
        {
            path: 'signup',
            component: <Signup />,
            isProtected: false,

        },
        {
            path: '',
            component: <Dashboard />,
            isProtected: false,

        },
        {
            path: 'profile',
            component: <Profile />,
            isProtected: true,

        },
        {
            path: 'dictionary',
            component: <Dictionary />,
            isProtected: true,

        },
        {
            path: 'learn',
            component: <Learn />,
            isProtected: true,

        },
        {
            path: 'test',
            component: <Test />,
            isProtected: true,

        },
        {
            path: 'learn/:topicId',
            component: <Course />,
            isProtected: true,

        },
        {
            path: 'lesson/:lessonId',
            component: <Lesson />,
            isProtected: true,

        },
        {
            path: 'game/:id',
            component: <Game />,
            isProtected: true,

        },
        {
            path: 'management',
            component: <Management />,
            isProtected: true,
        },
        {
            path: 'dashboard',
            component: <MyCourse />,
            isProtected: true,
        },
        {
            path: '/manage-learn',
            component: <UploadLearningMaterial />,
            isProtected: true,
        },
        {
            path: '/manage-lessons',
            component: <UploadLessons />,
            isProtected: true,
        },
    ]

    return (
        <Routes>
            {
                userRouters.map((item, key) => (
                    <Route
                        key={key}
                        path={item.path}
                        element={
                            item.isProtected ? (
                                <ProtectedRoute>{item.component}</ProtectedRoute>
                            ) : (
                                item.component
                            )
                        }
                    />
                ))
            }
        </Routes>
    )
}

const RouterCustom = () => {
    return renderUserRouter()
}

export default RouterCustom