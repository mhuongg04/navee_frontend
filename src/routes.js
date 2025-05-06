import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy load tất cả các trang thay vì import trực tiếp
const Dashboard = lazy(() => import("./pages/homepage/index.js"));
const Profile = lazy(() => import("./pages/profile"));
const Test = lazy(() => import("./pages/test"));
const Dictionary = lazy(() => import("./pages/dictionary"));
const Learn = lazy(() => import("./pages/learn"));
const Lesson = lazy(() => import("./pages/learn/components/lesson"));
const Login = lazy(() => import("./pages/(auth)/sign-in"));
const Signup = lazy(() => import("./pages/(auth)/sign-up"));
const Management = lazy(() => import("./pages/(teacher)/index"));
const Course = lazy(() => import("./pages/learn/components/course"));
const Practice = lazy(() => import("./pages/learn/components/minigame.jsx"));
const MyCourse = lazy(() => import("./pages/mycourse/index.js"));
const UploadLearningMaterial = lazy(() => import("./pages/(teacher)/learning-management/upload-topics/index"));
const UploadLessons = lazy(() => import("./pages/(teacher)/learning-management/upload-lessons/index.jsx"));
const UploadExercises = lazy(() => import("./pages/(teacher)/learning-management/upload-exercises/index.jsx"));
const DetailsMyCourse = lazy(() => import('./pages/mycourse/components/detailsMyCourse'));
const TestPage = lazy(() => import('./pages/learn/components/TestPage'));

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
        },
        {
            path: '/dashboard/:topic_id',
            element: <DetailsMyCourse />,
            isProtected: true,
        },
        {
            path: '/test/:testId',
            element: <TestPage />,
            isProtected: true,
        },
    ]

    return (
        <Suspense fallback={<LoadingSpinner size="lg" />}>
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
        </Suspense>
        
    )
}

const RouterCustom = () => {
    return renderUserRouter()
}

export default RouterCustom