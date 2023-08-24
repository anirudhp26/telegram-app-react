import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChannelInfo, setLogout } from '../../redux';
import axios from 'axios';
export default function Home() {
    const [ctitle, setCtitle] = useState("");
    const [cdesc, setCdesc] = useState("");
    const teleuser = useSelector((state) => state.teleuser);
    const user = useSelector((state) => state.user);
    const channelInfo = useSelector((state) => state.channelInfo);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        dispatch(setLogout());
    }
    const handleCreateChannel = async () => {
        const responce = await axios.post("https://telegram-app-react.vercel.app/createChannel", { title: ctitle, description: cdesc, phonenumber: teleuser });
        console.log(responce);
        dispatch(setChannelInfo({
            channelInfo: responce.data.channelResponse,
        }))
    }
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
                                <img className="img-xs rounded-circle" src="images/faces/face12.jpg" alt="profile" />
                                <div className="dot-indicator bg-success"></div>
                            </div>
                            <div className="text-wrapper">
                                <p className="profile-name">{teleuser ? teleuser : "USER"}</p>
                                <p className="designation">Profile</p>
                            </div>
                        </a>
                        <p onClick={handleLogout} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Logout</p>
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
                                <li className="nav-item"> <a className="nav-link" href="/telegramauth">Telegram</a></li>
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
                    <div className="page-header">
                        <h2 className="h3"> Welcome {teleuser ? teleuser : user} </h2>
                    </div>
                    {channelInfo === null || channelInfo === "" || channelInfo === "null" || channelInfo === undefined  ?
                        <form className="pt-3">
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Channel Name" onChange={(e) => { setCtitle(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Channel Description" onChange={(e) => { setCdesc(e.target.value) }} />
                            </div>
                            <div className="mt-3" >
                                <p className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => { handleCreateChannel() }}>Create Channel</p>
                            </div>
                        </form>
                        :
                        <></>
                    }
                    {channelInfo === null || channelInfo === "" || channelInfo === "null" || channelInfo === undefined ?
                        <>
                        </>
                        :
                        <div className="page-header">
                            <h2 className="h3"> channel created </h2>
                        </div>
                    }
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
