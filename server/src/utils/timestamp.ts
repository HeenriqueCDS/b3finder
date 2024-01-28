const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
const startTimestamp1WeekAgo = currentTimestamp - 7 * 24 * 3600;
const startTimestamp1MonthAgo = currentTimestamp - 30 * 24 * 3600;
const startTimestamp3MonthsAgo = currentTimestamp - 90 * 24 * 3600;

export {
    currentTimestamp,
    startTimestamp1MonthAgo,
    startTimestamp1WeekAgo,
    startTimestamp3MonthsAgo
};

