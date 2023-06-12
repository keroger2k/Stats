import { VideoClip } from '../../models/models';
import ReactPlayer from 'react-player'

export interface VideoArchiveProps {
    videos: VideoClip[];
}

export const VideoArchivePage = (props: VideoArchiveProps) => {

    function getUrl(video: any) {
        var url = `${video.url}?Key-Pair-Id=${video.cookies["CloudFront-Key-Pair-Id"]}&Signature=${video.cookies["CloudFront-Signature"]}&Policy=${video.cookies["CloudFront-Policy"]}`;
        return url;
    }

    if (!props.videos) return <></>;

    const content = props.videos.map((video) =>
        <>
            <br />
            <video id={Math.floor(Math.random() * 100).toString()} controls width="352" height="198" data-setup="{}">
                <source src={getUrl(video)} type="application/x-mpegURL"></source>
            </video>

        </>
    );

    return (
        <>
            <h1>here</h1>
        </>
    );
};