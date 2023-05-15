import { Event, Team, VideoClip } from '../../models/models';
import ReactPlayer from 'react-player'



export interface VideoArchiveProps {
    videos: VideoClip[];
}

export const VideoArchivePage = (props: VideoArchiveProps) => {
    

    if (!props.videos) return <></>;

    const content = props.videos.map((video) =>
        <>
            <br />
            <ReactPlayer className="react-player"
                url={video.url}
                playing={true}
                muted={true}
                controls={true}
                config={{
                    file: {
                        forceHLS: true,
                        hlsOptions: {
                            xhrSetup: function (xhr: any, url: any) {
                                xhr.withCredentials = true // send cookies
                            }
                        }
                    }
                }}
            />
        </>
    );



    return (
        <>
            {content}
        </>
    );
};