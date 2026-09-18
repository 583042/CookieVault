const bannedWords = [
    "fuck",
    "fucking",
    "fucked",
    "fucker",
    "shit",
    "shitty",
    "bullshit",
    "bitch",
    "bitches",
    "bastard",
    "asshole",
    "arsehole",
    "dumbass",
    "jackass",
    "douchebag",
    "prick",
    "dick",
    "dickhead",
    "cock",
    "cocksucker",
    "piss",
    "pissed",
    "crap",
    "crappy",
    "damn",
    "dammit",
    "goddamn",
    "wtf",
    "stfu",

    "idiot",
    "idiots",
    "moron",
    "morons",
    "stupid",
    "stupidity",
    "loser",
    "losers",
    "jerk",
    "fool",
    "imbecile",
    "cretin",
    "scumbag",
    "pathetic",
    "worthless",
    "useless",
    "dumb",
    "freak",
    "weirdo",
    "creep",
    "creepy",

    "porn",
    "porno",
    "pornography",
    "nsfw",
    "nude",
    "nudes",
    "nudity",
    "sexual",
    "horny",
    "boobs",
    "tits",
    "penis",
    "vagina",
    "vulva",
    "dildo",
    "orgasm",
    "masturbate",
    "masturbation",
    "fetish",
    "bdsm",
    "prostitute",
    "prostitution",
    "hooker",
    "stripper",
    "rape",
    "rapist",
    "molest",
    "molester",
    "incest",
    "bestiality",

    "suicide",
    "suicidal",
    "murder",
    "murderer",
    "killer",
    "threat",
    "threaten",
    "threatening",
    "attacker",

    "kys",
    "shutup",
    "goaway",
    "getlost",
    "yousuck",
    "kill yourself",
    "go die",
    "drop dead",

    "f*ck",
    "f**k",
    "f***",
    "sh*t",
    "sh**",
    "b*tch",
    "b**ch",
    "d*ck",
    "d**k",
    "a**hole",
    "a***hole",
    "p*ssy",
    "p**sy",
    "c*ck"
];

function normalizeFilterText(text) {
    return text
        .toLowerCase()
        .replace(/0/g, "o")
        .replace(/1/g, "i")
        .replace(/3/g, "e")
        .replace(/4/g, "a")
        .replace(/5/g, "s")
        .replace(/7/g, "t")
        .replace(/@/g, "a")
        .replace(/\$/g, "s");
}

function containsBannedWord(text) {
    const normalized = normalizeFilterText(text);

    for (const word of bannedWords) {
        const banned = normalizeFilterText(word);

        // Normal check
        const normalPattern = new RegExp(
            "(^|[^a-z0-9])" +
            banned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "([^a-z0-9]|$)",
            "i"
        );

        if (normalPattern.test(normalized)) {
            return true;
        }

        // Check words hidden behind spaces or punctuation
        const compactText = normalized.replace(/[^a-z0-9]/g, "");
        const compactWord = banned.replace(/[^a-z0-9]/g, "");

        if (compactWord.length >= 4 && compactText.includes(compactWord)) {
            return true;
        }
    }

    return false;
}

function recipeContainsBannedWord(recipe) {
    return (
        containsBannedWord(recipe.title) ||
        containsBannedWord(recipe.ingredients) ||
        containsBannedWord(recipe.bakeTime) ||
        containsBannedWord(recipe.desc)
    );
}