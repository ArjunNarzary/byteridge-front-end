export { formatDate }

function formatDate(date) {
    const currentDate = new Date(date);

    // Formatting options
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    return formattedDate;
}