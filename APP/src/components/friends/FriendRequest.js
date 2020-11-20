import React from 'react';
import { connect } from 'react-redux';

const FriendRequest = () => {
    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">Friend Request</h4>
                                </div>
                            </div>
                            <div className="iq-card-body">
                                <ul className="request-list list-inline m-0 p-0">
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/05.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Jaques Amole</h6>
                                            <p className="mb-0">40  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/06.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Lucy Tania</h6>
                                            <p className="mb-0">12  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/07.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Val Adictorian</h6>
                                            <p className="mb-0">0  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/08.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Manny Petty</h6>
                                            <p className="mb-0">3  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/09.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Marsha Mello</h6>
                                            <p className="mb-0">15  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/10.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Caire Innet</h6>
                                            <p className="mb-0">8  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/11.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Gio Metric</h6>
                                            <p className="mb-0">10  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/12.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Chris P. Cream</h6>
                                            <p className="mb-0">18  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/13.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Paul Misunday</h6>
                                            <p className="mb-0">6  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/14.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Reanne Carnation</h6>
                                            <p className="mb-0">12  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded">Confirm</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                                        </div>
                                    </li>
                                    <li className="d-block text-center">
                                        <a href="friend-request.html#" className="btn btn-request">View More Request</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">People You May Know</h4>
                                </div>
                            </div>
                            <div className="iq-card-body">
                                <ul className="request-list m-0 p-0">
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/15.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Jen Youfelct</h6>
                                            <p className="mb-0">4  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/16.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Cooke Edoh</h6>
                                            <p className="mb-0">20  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/17.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Earl E. Riser</h6>
                                            <p className="mb-0">30  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/05.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Cliff Diver</h6>
                                            <p className="mb-0">5  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/06.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Joyce Tick</h6>
                                            <p className="mb-0">17  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/07.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Vinny Gret</h6>
                                            <p className="mb-0">50  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/08.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Paul Samic</h6>
                                            <p className="mb-0">6  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/09.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Gustav Wind</h6>
                                            <p className="mb-0">14  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/10.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Minnie Strone</h6>
                                            <p className="mb-0">16  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/11.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Ray Volver</h6>
                                            <p className="mb-0">9  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/12.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Indy Nile</h6>
                                            <p className="mb-0">6  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="user-img img-fluid"><img src="images/user/13.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                        <div className="media-support-info ml-3">
                                            <h6>Jen Trification</h6>
                                            <p className="mb-0">42  friends</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void();" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Add Friend</a>
                                            <a href="javascript:void();" className="mr-3 btn btn-secondary rounded">Remove</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(FriendRequest);