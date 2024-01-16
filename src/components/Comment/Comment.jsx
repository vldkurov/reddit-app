import getHoursAgo from "../../helpers/timeAgoCalculator";

function Comment({comment}) {
    const {author, created_utc} = comment
    const hoursAgo = getHoursAgo(created_utc);

    return (
        <div>
            <p>{comment.body}</p>
            <p>Posted by {author} -- {hoursAgo} hours ago</p>
        </div>
    );
}

export default Comment