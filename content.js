console.log("Child Safety Middleware: Scanning ONLY my posts...");

const myUsername = "******";
const startingTrustScore = 5;
let trustScores = {};
const alreadyProcessedComments = new Set();
const offensiveWords = [
    "fuck", "f*ck", "f#ck", "fcuk", "fuk", "f@ck",
    "shit", "sh*t", "s#it", "sh1t",
    "bitch", "b1tch", "b!tch", "bi7ch",
    "asshole", "a**hole", "a$$hole", "a$$h0le",
    "bastard", "b@stard", "basstard",
    "dick", "d!ck", "d1ck", "di*k",
    "pussy", "pu55y", "p@ssy", "p*ssy",
    "damn", "d@mn", "daamn",
    "crap", "cr@p", "cr*p",
    "slut", "s1ut", "sl*t",
    "whore", "wh0re", "wh*re",
    "motherfucker", "motherfuker", "m0therfucker", "m0therfuker",
    "cunt", "c*nt", "cu#t",
    "nigger", "n!gger", "n1gger", "n!gga", "n1gga", "nigga",
    "retard", "r3tard", "re+ard", "r*tard",
    "fag", "fa9", "f@g",
];

function isOffensive(text) {
    const cleanedText = text.toLowerCase();
    return offensiveWords.some(word => cleanedText.includes(word));
}

function isMyPost() {
    const userElement = document.querySelector('header a span, header h2 span');
    if (userElement) {
        const postOwner = userElement.innerText;
        return postOwner === myUsername;
    }
    return false;
}

function getUsernameForComment(commentElement) {
    const commentBlock = commentElement.closest('div._a9zr');
    if (!commentBlock) return null;
    const usernameLink = commentBlock.querySelector('h3 a');
    if (usernameLink) {
        return usernameLink.innerText.trim();
    }
    return null;
}

function scanAndBlurComments() {
    if (!isMyPost()) {
        return;
    }
    console.log("Scanning post for bad comments...");
    const comments = document.querySelectorAll('div._a9zr span');

    comments.forEach(comment => {
        if (comment.getAttribute('data-processed') === 'true') {
            return;
        }
        const text = comment.innerText;

       
        if (isOffensive(text)) {
            const username = getUsernameForComment(comment);
            const commentKey = `${username}|${text}`; 
            replaceWithStars(comment);
            if (username) {
                console.log("Offensive comment by:", username);
                if (!alreadyProcessedComments.has(commentKey)){
                    updateTrustScore(username);
                }    
            }
            alreadyProcessedComments.add(commentKey);
        }
        comment.setAttribute('data-processed', 'true');
    });
}

function replaceWithStars(commentElement) {
    const originalText = commentElement.innerText;
    const starText = '*'.repeat(originalText.length);
    commentElement.innerText = starText;
}
//this one only hides the harsh words
// function replaceWithStars(commentElement) {
//     let text = commentElement.innerText;
//     offensiveWords.forEach(word => {
//         const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'); 
//         const replacement = '*'.repeat(word.length);
//         text = text.replace(regex, replacement);
//     });

//     commentElement.innerText = text;
// }

function loadTrustScores() {
    trustScores = {};
    chrome.storage.local.set({ trustScores: {} }, () => {
        console.log("✅ All trust scores cleared!");
    });
    chrome.storage.local.get(["trustScores"], (result) => {
        if (result.trustScores) {
            trustScores = result.trustScores;
            console.log("Loaded trust scores:", trustScores);
        }
    });
}

function saveTrustScores() {
    chrome.storage.local.set({ trustScores: trustScores });
}

function updateTrustScore(username) {
    if (!trustScores[username]) {
        trustScores[username] = startingTrustScore;
    }
    trustScores[username] -= 1;
    console.log(`${username}'s trust score is now: ${trustScores[username]}`);
    saveTrustScores();

    if (trustScores[username] <= 0) {
        restrictUser(username);
    }
}

function restrictUser(username) {
    console.log(`Restricting user: ${username}`);

    const allComments = document.querySelectorAll('div._a9zr');
    allComments.forEach(commentBlock => {
        const usernameLink = commentBlock.querySelector('h3 a');
        if (usernameLink && usernameLink.innerText.trim() === username.trim()) {
            commentBlock.remove();
        }
    });

    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        if (link.innerText.trim() === username.trim()) {
            link.remove();
        }
    });
}

loadTrustScores();
setInterval(scanAndBlurComments, 1000);
