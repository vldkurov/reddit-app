function getHoursAgo(createdUtc) {
    const now = Date.now(); // Current timestamp in milliseconds
    const createdTime = new Date(createdUtc * 1000); // Convert Unix timestamp to milliseconds
    const differenceInHours = (now - createdTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    return Math.floor(differenceInHours); // Return the difference in whole hours
}

export default getHoursAgo
