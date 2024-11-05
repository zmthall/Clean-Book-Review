export function isValidDate(dateString) {
    // Regular expression to check format MM/DD/YYYY or MM-DD-YYYY
    const regex = /^(0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])[-/](\d{4})$/;
    
    // Check if the date matches the format
    if (!regex.test(dateString)) {
        return false;
    }
    
    // Extract month, day, and year from the date string
    const [_, month, day, year] = dateString.match(regex).map(Number);

    // Define the number of days in each month
    const daysInMonth = {
        1: 31,  // January
        2: isLeapYear(year) ? 29 : 28, // February
        3: 31,  // March
        4: 30,  // April
        5: 31,  // May
        6: 30,  // June
        7: 31,  // July
        8: 31,  // August
        9: 30,  // September
        10: 31, // October
        11: 30, // November
        12: 31  // December
    };
    // Check if the day is valid for the given month and year
    return day <= daysInMonth[month];
}

// Helper function to determine if a year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}