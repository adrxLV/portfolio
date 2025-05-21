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
    // Key sequence detection for "HACK"
    const keySequence = [];
    const hackCode = "HACK";

    const hackConsole = document.getElementById('hackConsole');
    const consoleContent = document.getElementById('consoleContent');
    const consoleInput = document.getElementById('consoleInput');
    const closeConsole = document.getElementById('closeConsole');

    // Available commands for the terminal
    const commands = {
        'help': () => {
            return `Available commands:
- help: Show this help message
- neofetch: Display system information
- ls: List files in current directory
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
        'ls': () => {
            return `drwxr-xr-x  2 hacker  users  4096 May 21 2025 Documents
drwxr-xr-x  2 hacker  users  4096 May 21 2025 Downloads
-rw-r--r--  1 hacker  users   420 May 21 2025 portfolio.txt
-rw-r--r--  1 hacker  users  1226 May 21 2025 secret.txt
drwxr-xr-x  2 hacker  users  4096 May 21 2025 Projects`;
        },
        'cat': (args) => {
            if (!args || args.length === 0) {
                return "Usage: cat [filename]";
            }

            const filename = args[0];

            if (filename === 'portfolio.txt') {
                return "This is Adriano's portfolio website. You found the easter egg!";
            } else if (filename === 'secret.txt') {
                return "Congratulations hacker! You found the secret file.\nMessage from Adriano: Thanks for exploring my portfolio deeply enough to find this easter egg!";
            } else {
                return `cat: ${filename}: No such file or directory`;
            }
        },
        'whoami': () => {
            return "hacker";
        },
        'pwd': () => {
            return "/home/hacker";
        },
        'clear': () => {
            consoleContent.innerHTML = "Welcome to HackerOS v1.0.0\nType 'help' for available commands.";
            return "";
        },
        'uname': () => {
            return "HackerOS 6.4.7-arch1-1";
        },
        'date': () => {
            return "Saturday Oct 11 13:37:42 UTC 2008";
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

    // Listen for keypresses to detect "HACK"
    document.addEventListener('keydown', function(e) {
        // Don't capture keypresses when typing in the console
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

    // Open the hack console
    function openHackConsole() {
        hackConsole.style.display = 'flex';
        consoleInput.focus();
    }

    // Close the hack console
    function closeHackConsole() {
        hackConsole.style.display = 'none';
        keySequence.length = 0; // Reset key sequence
    }

    // Handle console input
    consoleInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = consoleInput.value.trim();
            consoleInput.value = '';

            // Add command to console output
            const commandLine = document.createElement('div');
            commandLine.innerHTML = `<span class="console-prompt">hacker@localhost:~$</span> ${command}`;
            consoleContent.appendChild(commandLine);

            // Process command
            const parts = command.split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            if (cmd === '') {
                // Empty command, just show a blank line
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

            // Scroll to bottom
            consoleContent.scrollTop = consoleContent.scrollHeight;
        }
    });

    // Close console when clicking X
    closeConsole.addEventListener('click', closeHackConsole);

    // Close console when pressing ESC
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

    // Verifica se estamos na página about.html
    if (fencingTrigger) {
        fencingTrigger.addEventListener('click', function() {
            fencingGame.style.display = 'block';
            resetGame();
        });
    }

    // Fecha o jogo
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
