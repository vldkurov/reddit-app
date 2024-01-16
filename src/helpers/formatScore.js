function formatScore(score) {
    if (score < 1000) {
        return score; // Return the actual score if it's less than 1000
    } else {
        return (score / 1000).toFixed(1) + 'k'; // Format score as 1.k for scores 1000 or more
    }
}

export default formatScore