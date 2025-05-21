document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    function toggleMenu() {
        console.log('Menu clicado');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
        } else {
            navLinks.style.display = 'flex';
            setTimeout(() => {
                navLinks.classList.add('active');
            }, 10);
        }
    }

    if (menuIcon) {
        console.log('Menu icon encontrado, adicionando listener');
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    const navLinksItems = document.querySelectorAll('.nav-link');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 &&
            navLinks.classList.contains('active') &&
            !event.target.closest('.navbar')) {
            toggleMenu();
        }
    });

    function handleWindowResize() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.classList.remove('active');
        } else if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
        }
    }

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';

            if (href === currentPath) {
                return;
            }

            e.preventDefault();

            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });

    window.addEventListener('pageshow', function() {
        document.body.classList.remove('fade-out');
    });
});

// Easter Egg - HACK Console
document.addEventListener('DOMContentLoaded', function() {

    const keySequence = [];
    const hackCode = "HACK";

    const hackConsole = document.getElementById('hackConsole');
    const consoleContent = document.getElementById('consoleContent');
    const consoleInput = document.getElementById('consoleInput');
    const closeConsole = document.getElementById('closeConsole');


    const fileSystem = {
        '/': {
            type: 'directory',
            contents: {
                'home': {
                    type: 'directory',
                    contents: {
                        'hacker': {
                            type: 'directory',
                            contents: {
                                'Documents': {
                                    type: 'directory',
                                    contents: {
                                        'notes.txt': {
                                            type: 'file',
                                            content: 'Remember to update your portfolio with the latest projects.'
                                        },
                                        'ideas.txt': {
                                            type: 'file',
                                            content: 'Project Ideas:\n1. AI-powered task manager\n2. Blockchain voting system\n3. AR navigation app\n4. Decentralized social network'
                                        }
                                    }
                                },
                                'Downloads': {
                                    type: 'directory',
                                    contents: {
                                        'archive.zip': {
                                            type: 'file',
                                            content: '[Binary content: archive.zip]'
                                        }
                                    }
                                },
                                'Projects': {
                                    type: 'directory',
                                    contents: {
                                        'portfolio': {
                                            type: 'directory',
                                            contents: {
                                                'README.md': {
                                                    type: 'file',
                                                    content: '# Portfolio Website\nMy personal portfolio website showcasing my projects and skills.\n\nTech stack:\n- HTML/CSS/JavaScript\n- Responsive design\n- Interactive elements\n- Easter eggs'
                                                }
                                            }
                                        },
                                        'myrecipe': {
                                            type: 'directory',
                                            contents: {
                                                'README.md': {
                                                    type: 'file',
                                                    content: '# MyRecipe\nA recipe management and sharing app with social features.\n\nFeatures:\n- User accounts\n- Recipe creation and sharing\n- Rating system\n- Ingredient search'
                                                }
                                            }
                                        },
                                        'myhub': {
                                            type: 'directory',
                                            contents: {
                                                'README.md': {
                                                    type: 'file',
                                                    content: '# MyHub\nA centralized dashboard for managing multiple services and applications.\n\nFeatures:\n- Single sign-on\n- Customizable widgets\n- Analytics\n- Multiple service integrations'
                                                }
                                            }
                                        },
                                        'jarvis': {
                                            type: 'directory',
                                            contents: {
                                                'README.md': {
                                                    type: 'file',
                                                    content: '# J.A.R.V.I.S.\nJust A Rather Very Intelligent System - A personal AI assistant.\n\nFeatures:\n- Natural language processing\n- Task automation\n- Calendar integration\n- Smart home control'
                                                }
                                            }
                                        }
                                    }
                                },
                                'portfolio.txt': {
                                    type: 'file',
                                    content: "This is Adriano's portfolio website. You found the easter egg!"
                                },
                                'secret.txt': {
                                    type: 'file',
                                    content: "Congratulations hacker! You found the secret file.\nMessage from Adriano: Thanks for exploring my portfolio deeply enough to find this easter egg!"
                                },
                                '.bash_history': {
                                    type: 'file',
                                    content: "ls -la\ncd Projects\ncat portfolio.txt\nneofetch\ncd ..\ngrep 'secret' *.txt\nwhoami\nsudo rm -rf /\n^C\nhistory -c"
                                }
                            }
                        }
                    }
                },
                'etc': {
                    type: 'directory',
                    contents: {
                        'passwd': {
                            type: 'file',
                            content: 'root:x:0:0:root:/root:/bin/bash\nhacker:x:1000:1000:Hacker:/home/hacker:/bin/bash'
                        }
                    }
                }
            }
        }
    };


    let currentPath = ['/','home','hacker'];


    function getDirectoryFromPath(path) {
        try {
            let current = fileSystem;
            if (path.length === 1 && path[0] === '/') {
                return current['/'];
            }

            for (let i = 0; i < path.length; i++) {
                if (i === 0 && path[i] === '/') {
                    current = current['/'];
                    continue;
                }

                if (!current.contents || !current.contents[path[i]]) {
                    throw new Error('Path not found');
                }
                current = current.contents[path[i]];
            }
            return current;
        } catch (error) {
            throw new Error('Invalid path');
        }
    }

    function getCurrentDirectory() {
        return getDirectoryFromPath(currentPath);
    }

    function formatPathString() {
        if (currentPath.length === 1) return '/';
        return '/' + currentPath.slice(1).join('/');
    }


    const commands = {
        'help': () => {
            return `Available commands:
- help: Show this help message
- neofetch: Display system information
- ls [directory]: List files in directory
- cd [directory]: Change directory
- cat [filename]: Display file content
- whoami: Display current user
- pwd: Print working directory
- clear: Clear the console
- uname: Display OS information
- date: Display current date
- htop: Display process monitor
- fortune: Display a random inspirational or funny message
- matrix: Simulate the Matrix animation
- starwars: Display Star Wars opening scene in ASCII art
- exit: Close the console`;
        },
        'neofetch': () => {
            return `                               OS: Arch Linux x86_64
                               Hostname: hacker
               /\\              Kernel: 6.4.7-arch1-1
              /  \\             Packages: 13379883
             /\\   \\            Uptime: 42d 13h 37m
            /      \\           WM: Hyprland
           /   ,,   \\          Theme: Gruvbox
          /   |  |   \\         CPU: AMD Ryzen 9 8950HX (32) @ 10.2GHz
         /_-''    ''-_\\        GPU: NVIDIA 9060 Ti
                               Battery: 98% [Eternal Power Mode]
                               Most used phrase: i use arch btw`;
        },
        'ls': (args) => {
            let targetPath = [...currentPath];

            if (args && args.length > 0) {
                const dirArg = args[0];


                if (dirArg === '/') {
                    targetPath = ['/'];
                } else if (dirArg === '..') {
                    if (targetPath.length > 1) {
                        targetPath.pop();
                    }
                } else if (dirArg === '.') {

                } else if (dirArg === '~' || dirArg === '/home/hacker') {
                    targetPath = ['/', 'home', 'hacker'];
                } else if (dirArg.startsWith('/')) {

                    targetPath = ['/'];
                    const segments = dirArg.split('/').filter(s => s);
                    targetPath.push(...segments);
                } else {

                    targetPath.push(dirArg);
                }
            }

            try {
                const current = getDirectoryFromPath(targetPath);

                if (current.type !== 'directory') {
                    return `ls: cannot access '${args ? args[0] : ''}': Not a directory`;
                }


                let dirs = [];
                let files = [];

                for (const [name, item] of Object.entries(current.contents)) {
                    if (item.type === 'directory') {
                        dirs.push(name + '/');
                    } else {
                        files.push(name);
                    }
                }


                dirs.sort();
                files.sort();


                return [...dirs, ...files].join('  ');
            } catch (error) {
                return `ls: cannot access '${args ? args[0] : ''}': No such file or directory`;
            }
        },
        'cd': (args) => {
            if (!args || args.length === 0 || args[0] === '~') {

                currentPath = ['/', 'home', 'hacker'];
                return '';
            }

            const dirArg = args[0];


            if (dirArg === '/') {
                currentPath = ['/'];
                return '';
            } else if (dirArg === '..') {
                if (currentPath.length > 1) {
                    currentPath.pop();
                }
                return '';
            } else if (dirArg === '.') {

                return '';
            } else if (dirArg.startsWith('/')) {

                try {
                    const segments = dirArg.split('/').filter(s => s);
                    let testPath = ['/'];

                    for (const segment of segments) {
                        let current = getDirectoryFromPath(testPath);


                        const dirEntry = Object.keys(current.contents).find(
                            key => key.toLowerCase() === segment.toLowerCase()
                        );

                        if (!dirEntry || current.contents[dirEntry].type !== 'directory') {
                            return `cd: ${dirArg}: No such directory`;
                        }
                        testPath.push(dirEntry);
                    }

                    currentPath = testPath;
                    return '';
                } catch (error) {
                    return `cd: ${dirArg}: No such directory`;
                }
            } else {

                try {
                    const current = getCurrentDirectory();


                    const dirEntry = Object.keys(current.contents).find(
                        key => key.toLowerCase() === dirArg.toLowerCase()
                    );

                    if (!dirEntry) {
                        return `cd: ${dirArg}: No such directory`;
                    }

                    if (current.contents[dirEntry].type !== 'directory') {
                        return `cd: ${dirArg}: Not a directory`;
                    }

                    currentPath.push(dirEntry);
                    return '';
                } catch (error) {
                    return `cd: ${dirArg}: No such directory`;
                }
            }
        },
        'cat': (args) => {
            if (!args || args.length === 0) {
                return "Usage: cat [filename]";
            }

            const filename = args[0];

            try {

                if (filename.startsWith('/')) {
                    const segments = filename.split('/').filter(s => s);
                    const filePath = ['/', ...segments.slice(0, -1)];
                    const fileName = segments[segments.length - 1];

                    try {
                        const currentDir = getDirectoryFromPath(filePath);

                        if (!currentDir.contents[fileName]) {
                            return `cat: ${filename}: No such file or directory`;
                        }

                        if (currentDir.contents[fileName].type !== 'file') {
                            return `cat: ${filename}: Is a directory`;
                        }

                        return currentDir.contents[fileName].content;
                    } catch (error) {
                        return `cat: ${filename}: No such file or directory`;
                    }
                } else {
                   const current = getCurrentDirectory();

                    if (!current.contents[filename]) {
                        return `cat: ${filename}: No such file or directory`;
                    }

                    if (current.contents[filename].type !== 'file') {
                        return `cat: ${filename}: Is a directory`;
                    }

                    return current.contents[filename].content;
                }
            } catch (error) {
                return `cat: ${filename}: No such file or directory`;
            }
        },
        'whoami': () => {
            return "hacker";
        },
        'pwd': () => {
            return formatPathString();
        },
        'clear': () => {
            consoleContent.innerHTML = "Welcome to HackerOS v1.0.0\nType 'help' for available commands.";
            return "";
        },
        'uname': () => {
            return "HackerOS 6.4.7-arch1-1";
        },
        'date': () => {
            return "Saturday May 21 13:37:42 UTC 2025";
        },
        'htop': () => {
            return `Tasks: 42 total, 7 running
Mem[|||||||||||||||||||||||||||||  98.7%] 63.5G/64G
CPU[|||||||||||||||||||||         76.3%] AMD Ryzen 9 8950HX
PID USER     PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
666 hacker   20   0  420.3M 69.2M 32.0M R 14.3  0.1  8:37.83 neofetch
 42 hacker   20   0  4024M  1.2G  69.3M S 12.2  1.9 15:42.42 hyprland
777 hacker   20   0  1337M  420M  13.3M R  8.7  0.7  2:13.37 portfolio
101 hacker   20   0  2020M  512M  42.0M S  6.9  0.8  4:20.69 firefox`;
        },
        'fortune': () => {
            const fortunes = [
                "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
                "The best way to predict the future is to create it.",
                "I use Arch btw.",
                "There are 10 types of people in the world: those who understand binary, and those who don't.",
                "It's not a bug – it's an undocumented feature.",
                "Why do programmers prefer dark mode? Because light attracts bugs.",
                "Hackers solve problems and build things, and they believe in freedom and voluntary mutual help.",
                "Premature optimization is the root of all evil."
            ];
            return fortunes[Math.floor(Math.random() * fortunes.length)];
        },
        'matrix': () => {
            return `Initializing the Matrix... 

01101000 01100001 01100011 01101011 01100101 01110010
10011101 01101001 01101110 01100111 00100000 01110100
01101000 01100101 00100000 01101101 01100001 01110100
01110010 01101001 01111000 00100000 00101110 00101110
00101110 00100000 01100001 01100011 01100011 01100101
01110011 01110011 00100000 01100111 01110010 01100001
01101110 01110100 01100101 01100100 00100001 00100001

\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551 Wake up, Neo... The Matrix has you... \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D`;
        },
        'starwars': () => {
            return `
 .      .     T h i s   i s   t h e   g a l a x y   o f   . . .             .
                     .              .       .                    .      .
.        .               .       .     .            .
               _________________      ____         __________
 .       .    /                 |    /    \\    .  |          \\
     .       /    ______   _____| . /      \\      |    ___    |     .     .
             \\    \\    |   |       /   /\\   \\     |   |___>   |
           .  \\    \\   |   |      /   /__\\   \\  . |         _/               .
 .     ________>    |  |   | .   /            \\   |   |\\    \\_______    .
      |            /   |   |    /    ______    \\  |   | \\           |
      |___________/    |___|   /____/      \\____\\ |___|  \\__________|    .
  .     ____    __  . _____   ____      .  __________   .  _________
       \\    \\  /  \\  /    /  /    \\       |          \\    /         |      .
        \\    \\/    \\/    /  /      \\      |    ___    |  /    ______|  .
         \\              /  /   /\\   \\ .   |   |___>   |  \\    \\
   .      \\            /  /   /__\\   \\    |         _/.   \\    \\            +
           \\    /\\    /  /            \\   |   |\\    \\______>    |   .
            \\  /  \\  /  /    ______    \\  |   | \\              /          .
 .       .   \\/    \\/  /____/      \\____\\ |___|  \\____________/  LS
                               .                                        .
     .                           .         .               .                 .
                .                                   .            .
                     A long time ago in a galaxy far,
                              far away....
            .    .       .        .     .      .
     .    __ _o|                        .
         |  /__|===--        .                                       <=>
  LS     [__|______~~--._                      .                .      .
   .    |\\  \`---.__:====]-----...,,_____                *      .         \` -
        |[>-----|_______<----------_____;::===--
        |/_____.....-----'''~~~~~~~                        .               .
   +               .        Rendili StarDrive's Victory-class Star Destroyer`
                ;

        },
        'exit': () => {
            closeHackConsole();
            return "";
        }
    };


    document.addEventListener('keydown', function(e) {

        if (hackConsole.style.display === 'flex' && document.activeElement === consoleInput) {
            return;
        }

        keySequence.push(e.key.toUpperCase());
        if (keySequence.length > hackCode.length) {
            keySequence.shift();
        }

        if (keySequence.join('') === hackCode) {
            openHackConsole();
        }
    });


    function openHackConsole() {
        hackConsole.style.display = 'flex';
        consoleInput.focus();


        consoleContent.innerHTML = "Welcome to HackerOS v1.0.0\nType 'help' for available commands.";


        const commandLine = document.createElement('div');
        commandLine.innerHTML = `<span class="console-prompt">hacker@localhost:~$</span> ls`;
        consoleContent.appendChild(commandLine);

        const output = commands['ls']();
        if (output) {
            const outputElement = document.createElement('div');
            outputElement.textContent = output;
            consoleContent.appendChild(outputElement);
        }


        consoleContent.scrollTop = consoleContent.scrollHeight;
    }


    function closeHackConsole() {
        hackConsole.style.display = 'none';
        keySequence.length = 0; // Reset key sequence
    }


    consoleInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = consoleInput.value.trim();
            consoleInput.value = '';


            const promptPath = formatPathString();
            const displayPath = promptPath === '/home/hacker' ? '~' : promptPath;
            const commandLine = document.createElement('div');
            commandLine.innerHTML = `<span class="console-prompt">hacker@localhost:${displayPath}$</span> ${command}`;
            consoleContent.appendChild(commandLine);


            const parts = command.split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            if (cmd === '') {

            } else if (commands[cmd]) {
                const output = commands[cmd](args);
                if (output) {
                    const outputElement = document.createElement('div');
                    outputElement.textContent = output;
                    consoleContent.appendChild(outputElement);
                }
            } else {
                const outputElement = document.createElement('div');
                outputElement.textContent = `command not found: ${cmd}`;
                consoleContent.appendChild(outputElement);
            }


            consoleContent.scrollTop = consoleContent.scrollHeight;
        }
    });


    closeConsole.addEventListener('click', closeHackConsole);


    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hackConsole.style.display === 'flex') {
            closeHackConsole();
        }
    });
});

// Easter Egg - Fencing Game
document.addEventListener('DOMContentLoaded', function() {
    const fencingTrigger = document.getElementById('fencing-trigger');
    const fencingGame = document.getElementById('fencing-game');
    const closeFencing = document.getElementById('close-fencing');
    const attackButton = document.getElementById('attack-button');
    const parryButton = document.getElementById('parry-button');
    const playerScore = document.getElementById('player-score');
    const computerScore = document.getElementById('computer-score');
    const fencingMessage = document.getElementById('fencing-message');
    const playerFencer = document.getElementById('player-fencer');
    const opponentFencer = document.getElementById('opponent-fencer');


    if (fencingTrigger) {
        fencingTrigger.addEventListener('click', function() {
            fencingGame.style.display = 'block';
            resetGame();
        });
    }


    if (closeFencing) {
        closeFencing.addEventListener('click', function() {
            fencingGame.style.display = 'none';
        });
    }

    // Variáveis
    let pScore = 0;
    let cScore = 0;
    let computerAction = null;
    let gameActive = false;
    let roundInProgress = false;

    function resetGame() {
        pScore = 0;
        cScore = 0;
        updateScore();
        setMessage('Prepare-se para o duelo! Escolha atacar ou defender.');
        gameActive = true;
        playerFencer.style.left = '20%';
        opponentFencer.style.right = '20%';
        playerFencer.classList.remove('attack', 'parry', 'hit');
        opponentFencer.classList.remove('attack', 'parry', 'hit');
    }

    function updateScore() {
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }

    function setMessage(message) {
        fencingMessage.textContent = message;
    }

    function computerChooseAction() {
        return Math.random() < 0.5 ? 'attack' : 'parry';
    }

    function playerAction(action) {
        if (!gameActive || roundInProgress) return;

        roundInProgress = true;
        computerAction = computerChooseAction();

        // Animação das ações
        if (action === 'attack') {
            playerFencer.classList.add('attack');
            if (computerAction === 'parry') {
                opponentFencer.classList.add('parry');
                setTimeout(() => {
                    setMessage('O oponente defendeu seu ataque!');
                }, 300);
            } else {
                opponentFencer.classList.add('hit');
                setTimeout(() => {
                    setMessage('Você acertou! +1 ponto');
                    pScore++;
                    updateScore();
                }, 300);
            }
        } else { // Parry
            playerFencer.classList.add('parry');
            if (computerAction === 'attack') {
                opponentFencer.classList.add('attack');
                setTimeout(() => {
                    setMessage('Você defendeu o ataque!');
                }, 300);
            } else {
                setTimeout(() => {
                    setMessage('Ambos se defenderam. Nada acontece.');
                }, 300);
            }
        }

        setTimeout(() => {
            playerFencer.classList.remove('attack', 'parry', 'hit');
            opponentFencer.classList.remove('attack', 'parry', 'hit');
            roundInProgress = false;

            if (pScore >= 5) {
                setMessage('Vitória! Você é o mestre da esgrima!');
                gameActive = false;
            } else if (cScore >= 5) {
                setMessage('Derrota! O oponente venceu o duelo.');
                gameActive = false;
            }
        }, 1000);
    }

    let parryCount = 0;

    if (attackButton) {
        attackButton.addEventListener('click', function() {
            if (gameActive && !roundInProgress) {
                parryCount = 0;
                playerAction('attack');
            }
        });
    }

    if (parryButton) {
        parryButton.addEventListener('click', function() {
            if (gameActive && !roundInProgress) {
                parryCount++;

                // Se jogador defender muito, o computador é mais agressivo
                if (parryCount >= 3) {
                    computerAction = 'attack';
                    setTimeout(() => {
                        if (!playerFencer.classList.contains('parry')) {
                            setMessage('O oponente te pegou desprevenido! +1 ponto para ele');
                            cScore++;
                            updateScore();
                            playerFencer.classList.add('hit');
                            setTimeout(() => {
                                playerFencer.classList.remove('hit');
                            }, 500);
                        }
                    }, 500);
                    parryCount = 0;
                }

                playerAction('parry');
            }
        });
    }
});

// Easter Egg - Star Wars Opening Crawl
document.addEventListener('DOMContentLoaded', function() {
    // Only run on Contact.html page
    if (!document.getElementById('starwars-easter-egg')) return;

    // Key sequence detection for the trigger "FORCE"
    const keySequence = [];
    const forceCode = "FORCE";
    const starWarsEgg = document.getElementById('starwars-easter-egg');
    const closeCrawl = document.querySelector('.close-crawl');

    // Listen for keypresses to detect "FORCE"
    document.addEventListener('keydown', function(e) {
        // Get the pressed key
        const key = e.key.toUpperCase();

        // Add key to sequence and trim if needed
        keySequence.push(key);
        if (keySequence.length > forceCode.length) {
            keySequence.shift();
        }

        // Check if sequence matches the code
        if (keySequence.join('') === forceCode) {
            showStarWarsEgg();
        }
    });

    // Open Star Wars crawl
    function showStarWarsEgg() {
        starWarsEgg.style.display = 'block';
        // Play Star Wars theme (optional)
        const audio = new Audio('https://soundbible.com/mp3/Star_Wars_Theme_Song-John_Williams-1778671936.mp3');
        audio.volume = 0.3;
        audio.play().catch(err => console.log('Audio playback prevented:', err));

        // Set cursor to lightsaber if available
        try {
            document.body.style.cursor = "url('images/lightsaber.cur'), auto";
        } catch (e) {
            console.log('Lightsaber cursor not found');
        }
    }

    // Close Star Wars crawl
    if (closeCrawl) {
        closeCrawl.addEventListener('click', function() {
            starWarsEgg.style.display = 'none';
            document.body.style.cursor = 'auto';
            keySequence.length = 0; // Reset key sequence
        });
    }

    // Easter egg can also be triggered by clicking on email 3 times quickly
    const emailLink = document.querySelector('.contact-details a[href^="mailto"]');
    if (emailLink) {
        let clickCount = 0;
        let clickTimer;

        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            clickCount++;

            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                if (clickCount >= 3) {
                    showStarWarsEgg();
                }
                clickCount = 0;
            }, 800);
        });
    }

    // Also close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && starWarsEgg.style.display === 'block') {
            starWarsEgg.style.display = 'none';
            document.body.style.cursor = 'auto';
        }
    });
});

// Easter Egg - Projects Page Matrix Effect
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the Projects page
    if (window.location.pathname.includes('Projects.html')) {
        // Key sequence detection for "MATRIX"
        const matrixCode = "MATRIX";
        const userKeys = [];
        let lastKeyTime = Date.now();

        document.addEventListener('keydown', function(e) {
            const currentTime = Date.now();

            // Reset sequence if too much time passed between key presses (3 seconds)
            if (currentTime - lastKeyTime > 3000) {
                userKeys.length = 0;
            }

            lastKeyTime = currentTime;
            userKeys.push(e.key.toUpperCase());

            // Keep only the last MATRIX.length keys
            if (userKeys.length > matrixCode.length) {
                userKeys.shift();
            }

            // Check if sequence matches
            if (userKeys.join('') === matrixCode) {
                triggerMatrixEffect();
                userKeys.length = 0; // Reset after triggering
            }
        });

        function triggerMatrixEffect() {
            // Create matrix rain effect
            const matrix = document.createElement('div');
            matrix.className = 'matrix-effect';
            matrix.style.position = 'fixed';
            matrix.style.top = '0';
            matrix.style.left = '0';
            matrix.style.width = '100%';
            matrix.style.height = '100%';
            matrix.style.background = 'rgba(0, 0, 0, 0.9)';
            matrix.style.color = '#0F0';
            matrix.style.fontSize = '14px';
            matrix.style.fontFamily = 'monospace';
            matrix.style.zIndex = '9999';
            matrix.style.overflow = 'hidden';
            document.body.appendChild(matrix);

            // Add message in center of screen
            const messageEl = document.createElement('div');
            messageEl.textContent = "You've discovered the Matrix! Press ESC to exit.";
            messageEl.style.position = 'absolute';
            messageEl.style.top = '10px';
            messageEl.style.left = '50%';
            messageEl.style.transform = 'translateX(-50%)';
            messageEl.style.color = '#FFFFFF';
            messageEl.style.fontSize = '18px';
            messageEl.style.zIndex = '10000';
            messageEl.style.padding = '10px';
            messageEl.style.background = 'rgba(0, 0, 0, 0.7)';
            messageEl.style.borderRadius = '5px';
            matrix.appendChild(messageEl);

            // Create matrix characters
            const columns = Math.floor(window.innerWidth / 14);
            const drops = [];

            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }

            // Create canvas for better performance
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            matrix.appendChild(canvas);

            const ctx = canvas.getContext('2d');

            // Generate matrix characters
            const matrixInterval = setInterval(() => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#0F0';
                ctx.font = '14px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = String.fromCharCode(
                        Math.floor(Math.random() * 94) + 33
                    );

                    ctx.fillText(text, i * 14, drops[i] * 14);

                    if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }

                    drops[i]++;
                }
            }, 50);

            // Allow escape from matrix effect
            function escapeMatrix(e) {
                if (e.key === 'Escape') {
                    clearInterval(matrixInterval);
                    document.body.removeChild(matrix);
                    document.removeEventListener('keydown', escapeMatrix);
                }
            }

            document.addEventListener('keydown', escapeMatrix);
        }
    }
});




