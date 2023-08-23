import React from 'react'

export default function Home() {
    return (
        <div className="container-fluid page-body-wrapper">
            <nav className="sidebar sidebar-offcanvas vh-100" id="sidebar">
                <a className="navbar-brand text-center w-100 mt-3 py-2" href="index.html">
                    <p className="h1 grad ">Onetapay</p>
                </a>
                <ul className="nav">
                    <li className="nav-item nav-profile">
                        <a href="/" className="nav-link">
                            <div className="profile-image">
                                <img className="img-xs rounded-circle" src="images/faces/face12.jpg" alt="profile"/>
                                    <div className="dot-indicator bg-success"></div>
                            </div>
                            <div className="text-wrapper">
                                <p className="profile-name">User</p>
                                <p className="designation">Profile</p>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Dashboard</span>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="index.html">
                            <span className="menu-title">Home</span>
                            <i className="icon-home menu-icon"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-title">Products</span>
                            <i className="icon-list menu-icon"></i>
                        </a>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="/">Payment Page</a></li>
                                <li className="nav-item"> <a className="nav-link" href="/">Locked Content</a></li>
                                <li className="nav-item"> <a className="nav-link" href="/">Telegram</a></li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </nav>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h2 className="h2"> Home </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-3 grid-margin stretch-card">
                            <div className="card  border anyl border-white bg-success text-white text-center">
                                <div className="card-body p-3">
                                    <h2 className="h2">0 ₹</h2>
                                    <div className="media mt-3">
                                        <div className="media-body">
                                            <p className="card-text">Total Earnings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 grid-margin stretch-card">
                            <div className="card  border anyl border-white   text-center">
                                <div className="card-body p-3">
                                    <h2 className="h2">0 ₹</h2>
                                    <div className="media mt-3">
                                        <div className="media-body">
                                            <p className="card-text">Subscription Earnings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 grid-margin stretch-card">
                            <div className="card  border anyl border-white text-center">
                                <div className="card-body p-3">
                                    <h2 className="h2">0 ₹</h2>
                                    <div className="media mt-3">
                                        <div className="media-body">
                                            <p className="card-text">Locked Content Earnings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 grid-margin stretch-card">
                            <div className="card  border anyl border-white text-center">
                                <div className="card-body p-3">
                                    <h2 className="h2">0 ₹</h2>
                                    <div className="media mt-3">
                                        <div className="media-body">
                                            <p className="card-text">Course Earnings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card" >
                            <div className="card    bdtp  text-center">
                                <div className="card-body p-3 " style={{ height: '50vh' }}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                        <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © Onetapay</span>
                    </div>
                </footer>
            </div>
        </div>
    )
}
