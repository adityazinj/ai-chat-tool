export function checkHeading(str) {
    return /^(\*)(\*)(.*)\*$/.test(str)   //checks is the string contains 2 star at first & 1 at last
}


export function checkHeadingStars(str) {
    return str.replace(/^(\*)(\*)|(\*)*$/g,'')   //checks is the string contains 2 star at first & 1 at last
}
 
