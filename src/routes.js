import Dashboard from "./pages/homepage/index.js";
import Profile from "./pages/profile/index.js";
//import Test from "./pages/test/index.js";
import Dictionary from "./pages/dictionary/index.js";
import Learn from "./pages/learn/index.js";
import Lesson from "./pages/learn/components/lesson.jsx";
import Login from "./pages/(auth)/sign-in/index.js";
import Signup from "./pages/(auth)/sign-up/index.js";
import Management from "./pages/(teacher)/index";
import { Route, Routes } from "react-router-dom";
import Course from "./pages/learn/components/course.jsx";
import Practice from "./pages/learn/components/minigame.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import MyCourse from "./pages/mycourse/index.js";
import UploadLearningMaterial from "./pages/(teacher)/learning-management/upload-topics/index";
import UploadLessons from "./pages/(teacher)/learning-management/upload-lessons/index.jsx";
import UploadExercises from "./pages/(teacher)/learning-management/upload-exercises/index.jsx";
import Flashcard from "./pages/flashcard/index.js";
import DictionaryManagement from "./pages/(teacher)/vocab-management/index.js";
import VocabManagement from "./pages/(teacher)/vocab-management/components/vocab-manage.jsx";
import FlashcardViewer from "./pages/flashcard/components/flashcardViewer.js";
import LessonVocab from "./pages/learn/components/vocab.jsx";
import FlashcardManagement from "./pages/(teacher)/vocab-management/components/flashcard-manage.jsx";

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
        // {
        //     path: 'test',
        //     element: <Test />,
        //     isProtected: true,

        // },
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
            isAdmin: true,
        },
        {
            path: 'dashboard',
            element: <MyCourse />,
            isProtected: true,
        },
        {
            path: 'flashcard',
            element: <Flashcard />,
            isProtected: true,
        },
        {
            path: 'vocab/:lessonId',
            element: <LessonVocab />,
            isProtected: true,
        },
        {
            path: 'flashcard/:flashcard_id',
            element: <FlashcardViewer />,
            isProtected: true,
        },
        {
            path: '/manage-learn',
            element: <UploadLearningMaterial />,
            isProtected: true,
            isAdmin: true,
        },
        {
            path: '/manage-lessons',
            element: <UploadLessons />,
            isProtected: true,
            isAdmin: true,
        },
        {
            path: '/manage-exercise',
            element: <UploadExercises />,
            isProtected: true,
            isAdmin: true,
        },
        {
            path: '/manage-dictionary',
            element: <DictionaryManagement />,
            isProtected: true,
            isAdmin: true,
        },
        {
            path: '/manage-vocab',
            element: <VocabManagement />,
            isProtected: true,
            isAdmin: true,
        },
        {
            path: '/manage-flashcard',
            element: <FlashcardManagement />,
            isProtected: true,
            isAdmin: true,
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
                                <ProtectedRoute requiredRole={item.isAdmin ? "teacher" : null}
                                >{item.element}</ProtectedRoute>
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