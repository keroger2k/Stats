import { defaultFormatUtc } from 'moment';
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import "bootstrap-icons/font/bootstrap-icons.css";

export const VideoJS = (props: any) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const { options, onReady } = props;
    const [player1, setPlayer1] = React.useState();

    function goForwardOneFrame() {
        player1.currentTime(player1.currentTime() + (1 / 30)); // Adjust the frame rate if necessary
    }

    // Go one frame backward
    function goBackwardOneFrame() {
        player1.currentTime(player1.currentTime() - (1 / 30)); // Adjust the frame rate if necessary
    }

    React.useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
                setPlayer1(player);
            });

            // Adding button to the control bar
            var rewindButton = player.controlBar.addChild('button', {}, 2);
            var rewindButtonDom = rewindButton.el();
            rewindButtonDom.innerHTML = '<i class="bi bi-rewind-fill"></i>';
            rewindButtonDom.onclick = function () {
                player.currentTime(player.currentTime() - (1 / 30)); // Adjust the frame rate if necessary
            }

            // Adding button to the control bar
            var fastForwardButton = player.controlBar.addChild('button', {}, 3);
            var fastForwardButtonDom = fastForwardButton.el();
            fastForwardButtonDom.innerHTML = '<i class="bi bi-fast-forward-fill"></i>';
            fastForwardButtonDom.onclick = function () {
                player.currentTime(player.currentTime() + (1 / 30)); // Adjust the frame rate if necessary
            }


            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}

export default VideoJS;