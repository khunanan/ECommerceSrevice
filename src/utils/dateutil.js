function parsDate(date) {
    console.log("date  " + date);
    const datePars = Date.parse(date);
    console.log("datePars   " + datePars);
    return datePars;
}

function calculateAge(birthday) { // birthday is a date 
    console.log("birthday  " + birthday);
    var ageDifMs = Date.now() - birthday;
    console.log("ageDifMs  " + ageDifMs);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    console.log("ageDate  " + ageDate);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
    parsDate, calculateAge
}