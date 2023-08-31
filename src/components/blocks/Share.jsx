import React from 'react';
import {
    FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon,
    PinterestShareButton, PinterestIcon, LinkedinShareButton, LinkedinIcon,
    // EmailShareButton, EmailIcon,
} from 'react-share';

const Share = ({
    url, title, hash = [], description, media,

}) => (
    <ul className="share-links__list">
        <li>
            <FacebookShareButton
                url={url}
                title={title}
                hash={hash[0]}
            >
                <FacebookIcon iconFillColor="white" round size={42} />
            </FacebookShareButton>
        </li>
        <li>
            <TwitterShareButton
                url={url}
                title={title}
                hashtags={hash}
            >
                <TwitterIcon iconFillColor="white" round size={42} />
            </TwitterShareButton>
        </li>
        <li>
            <PinterestShareButton
                url={url}
                description={title}
                media={media}
            >
                <PinterestIcon iconFillColor="white" round size={42} />
            </PinterestShareButton>
        </li>
        <li>
            <LinkedinShareButton url={url} title={title} summary={description}>
                <LinkedinIcon iconFillColor="white" round size={42} />
            </LinkedinShareButton>
        </li>
    </ul>
);

export default Share;
