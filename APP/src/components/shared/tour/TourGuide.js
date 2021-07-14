import React, { useState } from 'react';
import Tour from 'reactour';

const accentColor = "#5cb7b7";

const tourConfig = [
    {
        selector: '.iq-top-navbar',
        content: `Ok, let's start with the website of the Tour that is about to begin.`
    },
    {
        selector: '.iq-navbar-logo',
        content: `First, logo website and click that returns home page.`
    },
    {
        selector: '.iq-search-bar',
        content: `Then, search bar helps search users, posts and hashtags.`
    },
    {
        selector: '.navbar-nav',
        content: `Status menus includes avatar user, inbox friends, notifications, go to profiles, and more.`
    },
    {
        selector: '#sidebar-scrollbar',
        content: `Sidebar which makes shortcuts, helps you go to another pages.`,
        action: node => {
            // Scroll on top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    {
        selector: '#post-modal-data',
        content: `Create your ideas shares to everyone.`
    },
    {
        selector: '.user-post',
        content: `Comment and share if you like it.`
    },
    {
        selector: '.user-post-data',
        content: `Click it to view detail post.`
    },
    {
        selector: '.user-post-data',
        content: `Thank you for being my tour guide.`
    },
];

const TourGuide = ({ isTourOpen, closeTour }) => {

    return (
        <Tour
            onRequestClose={closeTour}
            isOpen={isTourOpen}
            steps={tourConfig}
            className="helper"
            rounded={5}
            accentColor={accentColor}
        />
    );
};

export default React.memo(TourGuide);