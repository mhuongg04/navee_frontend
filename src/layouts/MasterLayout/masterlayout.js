import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
// import header from '../../assets/images/header.png';

const MasterLayout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh' }}>
            <Header className="sticky-top" />
            <main>
                <div className="mr-14 p-4 ">{children}</div>
            </main>
            <Footer className="mt-auto" />
        </div>
    )
}

export default MasterLayout