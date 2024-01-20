        const nintendoFacts = [
            "Did you know Mario was originally a carpenter?",
            "Link, from The Legend of Zelda, was named after the original creator's love for exploration.",
            "Kirby was first conceptualized as a placeholder character.",
            "Samus Aran is one of the first female protagonists in video games.",
            "The name 'Pokémon' is a romanized contraction of the Japanese brand 'Pocket Monsters.'",
            "In Animal Crossing, Tom Nook is a tanuki, a Japanese raccoon dog.",
            "Princess Peach's first appearance was in Super Mario Bros. in 1985.",
            "The iconic 'Game Over' phrase originated from arcade games like Pac-Man.",
            "Shigeru Miyamoto, the creator of Mario and Zelda, was a key figure in the development of the Nintendo Switch.",
            "Donkey Kong was the first game to feature Mario, who was then known as 'Jumpman.'",
            "Captain Falcon from F-Zero was originally designed for a canceled racing game for the SNES.",
            "Pikachu was originally planned to have a third evolution called 'Gorochu,' but it was scrapped.",
            "Luigi, Mario's brother, made his debut in the 1983 game 'Mario Bros.'",
            "Zelda is the name of the princess in The Legend of Zelda, not the main character—his name is Link.",
            "The Master Sword in Zelda has the power to repel evil and is a recurring legendary weapon in the series.",
            "Yoshi, Mario's dinosaur companion, was first introduced in Super Mario World.",
            "In Splatoon, the characters are called Inklings, and their main goal is to cover the map with ink.",
            "Animal Crossing's K.K. Slider is a traveling musician dog who plays various tunes on his guitar every Saturday night.",
            "Fox McCloud, the protagonist of Star Fox, was inspired by the F-14 Tomcat fighter jet.",
            "Wario, Mario's rival, made his first appearance in Super Mario Land 2: 6 Golden Coins.",
            "The first product Nintendo made was playing cards in 1889 before entering the gaming industry.",
            "The Nintendo Entertainment System (NES) was the first console to bring back the gaming industry after the video game crash of 1983.",
            "The Wii console was initially codenamed 'Revolution' before its official release.",
            "Nintendo was originally founded as a playing card company by Fusajiro Yamauchi.",
            "The Legend of Zelda was one of the first games to feature an open-world concept.",
            "The Super Nintendo Entertainment System (SNES) introduced the L and R shoulder buttons on controllers.",
            "The Nintendo 64 was the first home console to feature 3D graphics with its iconic joystick controller.",
            "The Game Boy, released in 1989, was one of the first successful handheld gaming devices.",
            "Nintendo's first arcade game was 'Donkey Kong,' featuring characters that would become iconic in the gaming world.",
            "The NES Zapper, a light gun accessory, was used for games like Duck Hunt.",
            "Nintendo introduced the D-pad (directional pad) on the NES controller, revolutionizing game controls.",
            "The Virtual Boy, released in 1995, was Nintendo's first attempt at virtual reality gaming.",
            "The Pokémon series was created by Satoshi Tajiri and Ken Sugimori and is one of the best-selling video game franchises.",
            "Nintendo characters Mario and Luigi make cameo appearances in the animated movie 'Wreck-It Ralph.'",
            "The GameCube, released in 2001, featured a unique mini-disc format for games.",
            "Nintendo's first portable console, the Game Boy, had a monochrome display but was a massive success.",
            "The Nintendo Switch is known for its hybrid design, allowing it to be both a home console and a portable handheld device.",
            "The iconic 'Nintendo Seal of Quality' ensures that the game has passed Nintendo's strict testing standards.",
            "Nintendo is the oldest currently operating video game company.",
            "The character Kirby was named after John Kirby, the lawyer who defended Nintendo in a copyright infringement case.",
            "The Wii Fit Balance Board, introduced with Wii Fit, measures weight and balance for fitness games.",
            "The NES Classic Edition and SNES Classic Edition were released as mini versions of the original consoles with pre-installed games.",
            "Nintendo's official mascot is Mario, recognized globally as a symbol of the company.",    
            "Shigeru Miyamoto, the creator of Mario and Zelda, initially planned to make a Popeye game, but when the deal fell through, he created Donkey Kong.",
            "The character Kirby can inhale enemies and gain their abilities, making him one of the most versatile characters in Nintendo games.",
            "In the early days, Nintendo had a taxi business, a love hotel chain, and even tried its hand at TV programming.",
            "The Legend of Zelda: Ocarina of Time was the first 3D Zelda game and is often regarded as one of the greatest video games of all time.",
            "Mew, a rare Pokémon, was intentionally programmed into Pokémon Red and Blue but was never officially revealed by Nintendo.",
            "The N64 game 'GoldenEye 007' is often considered one of the best first-person shooters and played a significant role in the genre's popularity on consoles.",
            "The Wii, with its motion controls, became a cultural phenomenon and introduced gaming to a broader audience.",
            "The iconic 'Mario Kart' series was inspired by a desire to create a two-player mode for 'Super Mario Bros.'",
            "Nintendo owns the Seattle Mariners baseball team, a fact attributed to their former majority owner, Hiroshi Yamauchi.",
            "The Super Mario series has sold over 350 million copies, making it one of the best-selling video game franchises in history.",
            "Nintendo holds the patent for a 'working horse simulator,' a unique device that simulates riding a horse.",
            "The Pokémon theme song, 'Gotta Catch 'Em All,' was written in English before it was translated into Japanese for the anime.",
            "The NES controller's design, with the cross-shaped D-pad and A and B buttons, became the standard for future gaming controllers.",
            "Super Smash Bros. creator, Masahiro Sakurai, worked on the game alone during its development for the Nintendo 64.",
            "The 'Fire Flower' power-up in Mario games was inspired by the Japanese folklore of magical, fire-breathing flowers.",
            "Nintendo has a long-standing tradition of creating memorable soundtracks, with composers like Koji Kondo creating iconic music for games.",
            "The concept of the Nintendo Switch's Joy-Con controllers was inspired by the Wii Remote's versatility.",
            "The Wii U, Nintendo's predecessor to the Switch, introduced the concept of a tablet-style controller but faced challenges in marketing and adoption.",
            "The name 'Nintendo' roughly translates to 'leave luck to heaven' in Japanese.",
            "The Famicom Disk System, an add-on for the NES, used floppy disks and allowed players to rewrite games, creating an early form of save functionality.",
            "Nintendo's love for innovation can be seen in the quirky devices like the Virtual Boy and the R.O.B. robot accessory for the NES.",
            "The character Toadstool from the Mario series was named after the nickname for the mushrooms in the game.",
            "Animal Crossing's 'Mr. Resetti,' known for scolding players who reset the game, was designed to discourage cheating.",
        ];

        // Array to keep track of used facts
        let usedFacts = [];


function generateFact() {
    const factContainer = document.getElementById('fact');

    // Check if all facts have been used
    if (usedFacts.length === nintendoFacts.length) {
        // If all facts have been used, reset the usedFacts array
        usedFacts = [];
    }

    // Get a random fact that hasn't been used recently
    let randomFact;
    do {
        randomFact = nintendoFacts[Math.floor(Math.random() * nintendoFacts.length)];
    } while (usedFacts.includes(randomFact));

    // Display the fact
    factContainer.innerText = randomFact;

    // Add the fact to the usedFacts array
    usedFacts.push(randomFact);
}
