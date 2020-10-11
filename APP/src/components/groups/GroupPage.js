import React from 'react';
import GroupPost from './GroupPost';

const GroupPage = () => {
    return (
        <div>
            <section className="cover-sec">
                <img src="images/resources/company-cover.jpg" alt="" />
            </section>{/*cover-sec end*/}

            <main>
                <div className="main-section">
                    <div className="container">
                        <div className="main-section-data">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="main-left-sidebar">
                                        <div className="user_profile">
                                            <div className="user-pro-img">
                                                <img src="images/resources/company-profile.png" alt="" />
                                            </div>{/*user-pro-img end*/}
                                            <div className="user_pro_status">
                                                <ul className="flw-hr">
                                                    <li><a href="company-profile.html#"  className="flww"><i className="la la-plus" /> Follow</a></li>
                                                </ul>
                                                <ul className="flw-status">
                                                    <li>
                                                        <span>Following</span>
                                                        <b>34</b>
                                                    </li>
                                                    <li>
                                                        <span>Followers</span>
                                                        <b>155</b>
                                                    </li>
                                                </ul>
                                            </div>{/*user_pro_status end*/}
                                            <ul className="social_links">
                                                <li><a href="company-profile.html#"><i className="la la-globe" /> www.example.com</a></li>
                                                <li><a href="company-profile.html#"><i className="fa fa-facebook-square" /> Http://www.facebook.com/john...</a></li>
                                                <li><a href="company-profile.html#"><i className="fa fa-twitter" /> Http://www.Twitter.com/john...</a></li>
                                                <li><a href="company-profile.html#"><i className="fa fa-google-plus-square" /> Http://www.googleplus.com/john...</a></li>
                                                <li><a href="company-profile.html#"><i className="fa fa-behance-square" /> Http://www.behance.com/john...</a></li>
                                                <li><a href="company-profile.html#"><i className="fa fa-pinterest" /> Http://www.pinterest.com/john...</a></li>
                                                <li><a href="company-profile.html#"><i className="fa fa-instagram" /> Http://www.instagram.com/john...</a></li>
                                                <li><a href="company-profile.html#"><i className="fa fa-youtube" /> Http://www.youtube.com/john...</a></li>
                                            </ul>
                                        </div>{/*user_profile end*/}
                                    </div>{/*main-left-sidebar end*/}
                                </div>
                                <div className="col-lg-6">
                                    <div className="main-ws-sec">
                                        <div className="user-tab-sec">
                                            <h3>Facebook Inc.</h3>
                                            <div className="star-descp">
                                                <span>Established Since 2009</span>
                                                <ul>
                                                    <li><i className="fa fa-star" /></li>
                                                    <li><i className="fa fa-star" /></li>
                                                    <li><i className="fa fa-star" /></li>
                                                    <li><i className="fa fa-star" /></li>
                                                    <li><i className="fa fa-star-half-o" /></li>
                                                </ul>
                                            </div>{/*star-descp end*/}
                                            <div className="tab-feed">
                                                <ul>
                                                    <li data-tab="feed-dd" className="active">
                                                        <a href="company-profile.html#" >
                                                            <img src="images/ic1.png" alt="" />
                                                            <span>Feed</span>
                                                        </a>
                                                    </li>
                                                    <li data-tab="info-dd">
                                                        <a href="company-profile.html#" >
                                                            <img src="images/ic2.png" alt="" />
                                                            <span>Info</span>
                                                        </a>
                                                    </li>
                                                    <li data-tab="portfolio-dd">
                                                        <a href="company-profile.html#" >
                                                            <img src="images/ic3.png" alt="" />
                                                            <span>Portfolio</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>{/* tab-feed end*/}
                                        </div>{/*user-tab-sec end*/}
                                        <div className="product-feed-tab current" id="feed-dd">
                                            <div className="posts-section">
                                                <GroupPost />
                                                <div className="process-comm">
                                                    <div className="spinner">
                                                        <div className="bounce1" />
                                                        <div className="bounce2" />
                                                        <div className="bounce3" />
                                                    </div>
                                                </div>
                                            </div>{/*posts-section end*/}
                                        </div>{/*product-feed-tab end*/}
                                        <div className="product-feed-tab" id="info-dd">
                                            <div className="user-profile-ov">
                                                <h3><a href="company-profile.html#"  className="overview-open">Overview</a> <a href="company-profile.html#"  className="overview-open"><i className="fa fa-pencil" /></a></h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor aliquam felis, nec condimentum ipsum commodo id. Vivamus sit amet augue nec urna efficitur tincidunt. Vivamus consectetur aliquam lectus commodo viverra. Nunc eu augue nec arcu efficitur faucibus. Aliquam accumsan ac magna convallis bibendum. Quisque laoreet augue eget augue fermentum scelerisque. Vivamus dignissim mollis est dictum blandit. Nam porta auctor neque sed congue. Nullam rutrum eget ex at maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget vestibulum lorem.</p>
                                            </div>{/*user-profile-ov end*/}
                                            <div className="user-profile-ov st2">
                                                <h3><a href="company-profile.html#"  className="esp-bx-open">Establish Since </a><a href="company-profile.html#"  className="esp-bx-open"><i className="fa fa-pencil" /></a> <a href="company-profile.html#"  className="esp-bx-open"><i className="fa fa-plus-square" /></a></h3>
                                                <span>February 2004</span>
                                            </div>{/*user-profile-ov end*/}
                                            <div className="user-profile-ov">
                                                <h3><a href="company-profile.html#"  className="emp-open">Total Employees</a> <a href="company-profile.html#"  className="emp-open"><i className="fa fa-pencil" /></a> <a href="company-profile.html#"  className="emp-open"><i className="fa fa-plus-square" /></a></h3>
                                                <span>17,048</span>
                                            </div>{/*user-profile-ov end*/}
                                            <div className="user-profile-ov">
                                                <h3><a href="company-profile.html#"  className="lct-box-open">Location</a> <a href="company-profile.html#"  className="lct-box-open"><i className="fa fa-pencil" /></a> <a href="company-profile.html#"  className="lct-box-open"><i className="fa fa-plus-square" /></a></h3>
                                                <h4>USA</h4>
                                                <p> Menlo Park, California, United States</p>
                                            </div>{/*user-profile-ov end*/}
                                        </div>{/*product-feed-tab end*/}
                                        <div className="product-feed-tab" id="portfolio-dd">
                                            <div className="portfolio-gallery-sec">
                                                <h3>Portfolio</h3>
                                                <div className="gallery_pf">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img1.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img2.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img3.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img4.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img5.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img6.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img7.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img8.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img9.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                                                            <div className="gallery_pt">
                                                                <img src="images/resources/pf-img10.jpg" alt="" />
                                                                <a href="company-profile.html#" ><img src="images/all-out.png" alt="" /></a>
                                                            </div>{/*gallery_pt end*/}
                                                        </div>
                                                    </div>
                                                </div>{/*gallery_pf end*/}
                                            </div>{/*portfolio-gallery-sec end*/}
                                        </div>{/*product-feed-tab end*/}
                                    </div>{/*main-ws-sec end*/}
                                </div>
                                <div className="col-lg-3">
                                    <div className="right-sidebar">
                                        <div className="message-btn">
                                            <a href="company-profile.html#" ><i className="fa fa-envelope" /> Message</a>
                                        </div>
                                        <div className="widget widget-portfolio">
                                            <div className="wd-heady">
                                                <h3>Portfolio</h3>
                                                <img src="images/photo-icon.png" alt="" />
                                            </div>
                                            <div className="pf-gallery">
                                                <ul>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery1.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery2.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery3.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery4.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery5.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery6.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery7.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery8.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery9.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery10.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery11.png" alt="" /></a></li>
                                                    <li><a href="company-profile.html#" ><img src="images/resources/pf-gallery12.png" alt="" /></a></li>
                                                </ul>
                                            </div>{/*pf-gallery end*/}
                                        </div>{/*widget-portfolio end*/}
                                    </div>{/*right-sidebar end*/}
                                </div>
                            </div>
                        </div>{/* main-section-data end*/}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GroupPage;