import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChannelInfo, setLogout } from '../../redux';
import axios from 'axios';
export default function Home() {
    const [ctitle, setCtitle] = useState("");
    const [cdesc, setCdesc] = useState("");
    const [flag, setFlag] = useState(false);
    const [existingChannels, setExistingChannels] = useState([]);
    const [eChannel, setEchannel] = useState("");
    const teleuser = useSelector((state) => state.teleuser);
    // const user = useSelector((state) => state.user);
    const channelInfo = useSelector((state) => state.channelInfo);
    const sessionString = useSelector((state) => state.sessionString);
    const userChannelMaganagedThroughBot = null;
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(setLogout());
    }


    const handleCreateChannel = async () => {
        const responce = await axios.post("http://localhost:5000/createChannel", { title: ctitle, description: cdesc, phonenumber: teleuser.phone, sessionString: sessionString });
        console.log(responce);
        dispatch(setChannelInfo({
            channelInfo: responce.data.channelResponse,
        }))
    }

    const getExistingChannels = async () => {
        const responce = await axios.post("http://localhost:5000/getchannels", { sessionString: sessionString, id: teleuser.id });
        console.log(responce);
        setExistingChannels(responce.data.createdChannels);
    }

    const handleExistingChannels = async () => {
        let accessHash = "";
        existingChannels.map((channel) => {if (channel.id === eChannel)  accessHash = channel.accessHash; return null});
        console.log(accessHash);
        const responce = await axios.post("http://localhost:5000/addExistingChannel", { channelId: eChannel, accessHash: accessHash, sessionString: sessionString });
        dispatch(setChannelInfo({
            channelInfo: responce.data,
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
                                <p className="profile-name">{teleuser?.phone ? teleuser.phone : "USER"}</p>
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
                    {teleuser?.phone && (
                        <div>
                            {!channelInfo ? (
                                <div className="container-scroller">
                                    <div className="container-fluid page-body-wrapper full-page-wrapper">
                                        <div className="content-wrapper d-flex align-items-center auth">
                                            <div className="row flex-grow">
                                                <div className="col-lg-4 mx-auto">
                                                    <div className="auth-form-light text-center p-5 ">
                                                        <h1 className="pb-3">Onetapay</h1>
                                                        <h6 className="font-weight-light">Create new channel</h6>
                                                        <form className="pt-3" style={{ display: !flag ? "block" : "none"}}>
                                                            <div className="form-group">
                                                                <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Channel Name" onChange={(e) => setCtitle(e.target.value)} />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="text" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Channel's description" onChange={(e) => {setCdesc(e.target.value)}} />
                                                            </div>
                                                            <div className="mt-3">
                                                                <p className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => { handleCreateChannel() }}>Create Channel</p>
                                                            </div>
                                                            <div className="text-center mt-4 font-weight-light"> Already have a Channel? <p className="text-primary" onClick={() => { setFlag(true); getExistingChannels(); }}>Connect</p>
                                                            </div>
                                                        </form>
                                                        <form className="pt-3" style={{ display: flag ? "block" : "none"}}>
                                                            <select className="form-control" id="exampleFormControlSelect2" onChange={(e) => {setEchannel(e.target.value)}}>
                                                                <option>Select telegram channel</option>
                                                                {existingChannels.map((channel) => {
                                                                    if (channel.creator) {
                                                                        return <option key={channel.id} value={channel.id}>{channel.title}</option>
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                })}
                                                            </select>
                                                            <div className="mt-3">
                                                                <p className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => {handleExistingChannels()}}>Connect to this Channel</p>
                                                            </div>
                                                            <div className="text-center mt-4 font-weight-light"> Create a new Channel? <p className="text-primary" onClick={() => { setFlag(false) }}>Create</p>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="page-header">
                                    <h2 className="h3"> channel created </h2>
                                </div>
                            )}
                        </div>
                    )}
                    {userChannelMaganagedThroughBot
                        ?
                        <>
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
                        </>
                        :
                        <>

                        </>}
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
