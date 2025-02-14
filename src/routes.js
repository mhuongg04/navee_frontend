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
import Practice from "./pages/learn/components/minigame.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import MyCourse from "./pages/mycourse/index.js";
import UploadLearningMaterial from "./pages/(teacher)/learning-management/upload-topics/index";
import UploadLessons from "./pages/(teacher)/learning-management/upload-lessons/index.jsx";
import UploadExercises from "./pages/(teacher)/learning-management/upload-exercises/index.jsx";

const renderUserRouter = () => {
    const userRouters = [
        {
            path: 'login',
            element: <Login />,
            isProtected: false,

        },
        {
            path: 'signup',
            element: <Signup />,
            isProtected: false,

        },
        {
            path: '',
            element: <Dashboard />,
            isProtected: false,

        },
        {
            path: 'profile',
            element: <Profile />,
            isProtected: true,

        },
        {
            path: 'dictionary',
            element: <Dictionary />,
            isProtected: true,

        },
        {
            path: 'learn',
            element: <Learn />,
            isProtected: true,

        },
        {
            path: 'test',
            element: <Test />,
            isProtected: true,

        },
        {
            path: 'learn/:topic_id',
            element: <Course />,
            isProtected: true,

        },
        {
            path: 'lesson/:lessonId',
            element: <Lesson />,
            isProtected: true,

        },
        {
            path: 'practice/:lessonId',
            element: <Practice />,
            isProtected: true,

        },
        {
            path: 'management',
            element: <Management />,
            isProtected: true,
        },
        {
            path: 'dashboard',
            element: <MyCourse />,
            isProtected: true,
        },
        {
            path: '/manage-learn',
            element: <UploadLearningMaterial />,
            isProtected: true,
        },
        {
            path: '/manage-lessons',
            element: <UploadLessons />,
            isProtected: true,
        },
        {
            path: '/manage-exercise',
            element: <UploadExercises />,
            isProtected: true,
        }
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
                                <ProtectedRoute>{item.element}</ProtectedRoute>
                            ) : (
                                item.element
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