import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="iq-sidebar" >
            <div id="sidebar-scrollbar">
                <nav className="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" className="iq-menu">
                        <li className="active">
                            <Link to="/" className="iq-waves-effect"><i className="las la-newspaper" /><span>Newsfeed</span></Link>
                        </li>
                        <li>
                            <a href="profile.html" className="iq-waves-effect"><i className="las la-user" /><span>Profile</span></a>
                        </li>
                        <li>
                            <Link to="/friend-list" className="iq-waves-effect"><i className="las la-user-friends" /><span>Friend Lists</span></Link>
                        </li>
                        <li>
                            <Link to="/friend-request" className="iq-waves-effect"><i className="las la-anchor" /><span>Friend Request</span></Link>
                        </li>
                        <li>
                            <Link to="/groups" className="iq-waves-effect"><i className="las la-users" /><span>Group</span></Link>
                        </li>
                        <li>
                            <a href="profile-images.html" className="iq-waves-effect"><i className="las la-image" /><span>Profile Image</span></a>
                        </li>
                        <li>
                            <a href="profile-video.html" className="iq-waves-effect"><i className="las la-video" /><span>Profile Video</span></a>
                        </li>
                        <li>
                            <a href="profile-event.html" className="iq-waves-effect"><i className="las la-film" /><span>Profile Events</span></a>
                        </li>
                        <li>
                            <Link to="/notification" className="iq-waves-effect"><i className="las la-bell" /><span>Notification</span></Link>
                        </li>
                        <li>
                            <a href="file.html" className="iq-waves-effect"><i className="las la-file" /><span>Files</span></a>
                        </li>
                        <li>
                            <a href="chat.html" className="iq-waves-effect"><i className="lab la-rocketchat" /><span>Chat</span></a>
                        </li>
                        <li>
                            <a href="todo.html" className="iq-waves-effect"><i className="las la-check-circle" /><span>Todo</span></a>
                        </li>
                        <li>
                            <a href="calendar.html" className="iq-waves-effect"><i className="las la-calendar" /><span>Calendar</span></a>
                        </li>
                        <li>
                            <a href="birthday.html" className="iq-waves-effect"><i className="las la-birthday-cake" /><span>Birthday</span></a>
                        </li>
                        <li>
                            <a href="weather.html" className="iq-waves-effect"><i className="ri-snowy-line" /><span>Weather</span></a>
                        </li>
                        <li>
                            <a href="music.html" className="iq-waves-effect"><i className="ri-play-circle-line" /><span>Music</span></a>
                        </li>
                        <li>
                            <a href="index.html#mailbox" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-mail-line" /><span>Email</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                            <ul id="mailbox" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li><a href="app/index.html"><i className="ri-inbox-line" />Inbox</a></li>
                                <li><a href="app/email-compose.html"><i className="ri-edit-line" />Email Compose</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="index.html#ui-elements" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-focus-2-line" /><span>Ui-Elements</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                            <ul id="ui-elements" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li>
                                    <a href="index.html#ui-kit" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-pencil-ruler-line" /><span>UI Kit</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                                    <ul id="ui-kit" className="iq-submenu collapse" data-parent="#ui-elements">
                                        <li><a href="ui-colors.html"><i className="ri-font-color" />colors</a></li>
                                        <li><a href="ui-typography.html"><i className="ri-text" />Typography</a></li>
                                        <li><a href="ui-alerts.html"><i className="ri-alert-line" />Alerts</a></li>
                                        <li><a href="ui-badges.html"><i className="ri-building-3-line" />Badges</a></li>
                                        <li><a href="ui-breadcrumb.html"><i className="ri-menu-2-line" />Breadcrumb</a></li>
                                        <li><a href="ui-buttons.html"><i className="ri-checkbox-blank-line" />Buttons</a></li>
                                        <li><a href="ui-cards.html"><i className="ri-bank-card-line" />Cards</a></li>
                                        <li><a href="ui-carousel.html"><i className="ri-slideshow-line" />Carousel</a></li>
                                        <li><a href="ui-embed-video.html"><i className="ri-slideshow-2-line" />Video</a></li>
                                        <li><a href="ui-grid.html"><i className="ri-grid-line" />Grid</a></li>
                                        <li><a href="ui-images.html"><i className="ri-image-line" />Images</a></li>
                                        <li><a href="ui-list-group.html"><i className="ri-file-list-3-line" />list Group</a></li>
                                        <li><a href="ui-media-object.html"><i className="ri-camera-line" />Media</a></li>
                                        <li><a href="ui-modal.html"><i className="ri-stop-mini-line" />Modal</a></li>
                                        <li><a href="ui-notifications.html"><i className="ri-notification-line" />Notifications</a></li>
                                        <li><a href="ui-pagination.html"><i className="ri-pages-line" />Pagination</a></li>
                                        <li><a href="ui-popovers.html"><i className="ri-folder-shield-2-line" />Popovers</a></li>
                                        <li><a href="ui-progressbars.html"><i className="ri-battery-low-line" />Progressbars</a></li>
                                        <li><a href="ui-tabs.html"><i className="ri-database-line" />Tabs</a></li>
                                        <li><a href="ui-tooltips.html"><i className="ri-record-mail-line" />Tooltips</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="index.html#forms" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-profile-line" /><span>Forms</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                                    <ul id="forms" className="iq-submenu collapse" data-parent="#ui-elements">
                                        <li><a href="form-layout.html"><i className="ri-tablet-line" />Form Elements</a></li>
                                        <li><a href="form-validation.html"><i className="ri-device-line" />Form Validation</a></li>
                                        <li><a href="form-switch.html"><i className="ri-toggle-line" />Form Switch</a></li>
                                        <li><a href="form-chechbox.html"><i className="ri-checkbox-line" />Form Checkbox</a></li>
                                        <li><a href="form-radio.html"><i className="ri-radio-button-line" />Form Radio</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="index.html#wizard-form" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-archive-drawer-line" /><span>Forms Wizard</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                                    <ul id="wizard-form" className="iq-submenu collapse" data-parent="#ui-elements">
                                        <li><a href="form-wizard.html"><i className="ri-clockwise-line" />Simple Wizard</a></li>
                                        <li><a href="form-wizard-validate.html"><i className="ri-clockwise-2-line" />Validate Wizard</a></li>
                                        <li><a href="form-wizard-vertical.html"><i className="ri-anticlockwise-line" />Vertical Wizard</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="index.html#tables" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-table-line" /><span>Table</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                                    <ul id="tables" className="iq-submenu collapse" data-parent="#ui-elements">
                                        <li><a href="tables-basic.html"><i className="ri-table-line" />Basic Tables</a></li>
                                        <li><a href="data-table.html"><i className="ri-database-line" />Data Table</a></li>
                                        <li><a href="table-editable.html"><i className="ri-refund-line" />Editable Table</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="index.html#icons" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-list-check" /><span>Icons</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                                    <ul id="icons" className="iq-submenu collapse" data-parent="#ui-elements">
                                        <li><a href="icon-dripicons.html"><i className="ri-stack-line" />Dripicons</a></li>
                                        <li><a href="icon-fontawesome-5.html"><i className="ri-facebook-fill" />Font Awesome 5</a></li>
                                        <li><a href="icon-lineawesome.html"><i className="ri-keynote-line" />line Awesome</a></li>
                                        <li><a href="icon-remixicon.html"><i className="ri-remixicon-line" />Remixicon</a></li>
                                        <li><a href="icon-unicons.html"><i className="ri-underline" />unicons</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="index.html#pages" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-pages-line" /><span>Pages</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                            <ul id="pages" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li>
                                    <a href="index.html#authentication" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-pages-line" /><span>Authentication</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                                    <ul id="authentication" className="iq-submenu collapse" data-parent="#pages">
                                        <li><a href="sign-in.html"><i className="ri-login-box-line" />Login</a></li>
                                        <li><a href="sign-up.html"><i className="ri-login-circle-line" />Register</a></li>
                                        <li><a href="pages-recoverpw.html"><i className="ri-record-mail-line" />Recover Password</a></li>
                                        <li><a href="pages-confirm-mail.html"><i className="ri-file-code-line" />Confirm Mail</a></li>
                                        <li><a href="pages-lock-screen.html"><i className="ri-lock-line" />Lock Screen</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="index.html#extra-pages" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-pantone-line" /><span>Extra Pages</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
                                    <ul id="extra-pages" className="iq-submenu collapse" data-parent="#pages">
                                        <li><a href="pages-timeline.html"><i className="ri-map-pin-time-line" />Timeline</a></li>
                                        <li><a href="pages-invoice.html"><i className="ri-question-answer-line" />Invoice</a></li>
                                        <li><a href="blank-page.html"><i className="ri-invision-line" />Blank Page</a></li>
                                        <li><a href="pages-error.html"><i className="ri-error-warning-line" />Error 404</a></li>
                                        <li><a href="pages-error-500.html"><i className="ri-error-warning-line" />Error 500</a></li>
                                        <li><a href="pages-pricing.html"><i className="ri-price-tag-line" />Pricing</a></li>
                                        <li><a href="pages-pricing-one.html"><i className="ri-price-tag-2-line" />Pricing 1</a></li>
                                        <li><a href="pages-maintenance.html"><i className="ri-archive-line" />Maintenance</a></li>
                                        <li><a href="pages-comingsoon.html"><i className="ri-mastercard-line" />Coming Soon</a></li>
                                        <li><a href="pages-faq.html"><i className="ri-compasses-line" />Faq</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div className="p-3" />
            </div>
        </div >
    );
};

export default SideBar;