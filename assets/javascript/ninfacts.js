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
        ];

        function generateFact() {
            const factContainer = document.getElementById('fact');
            const randomFact = nintendoFacts[Math.floor(Math.random() * nintendoFacts.length)];
            factContainer.innerText = randomFact;
        }
