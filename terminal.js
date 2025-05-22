document.addEventListener('DOMContentLoaded', function() {
    const keySequence = [];
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

    const hackConsole = document.getElementById('hackConsole');
    const consoleContent = document.getElementById('consoleContent');
    const consoleInput = document.getElementById('consoleInput');
    const closeConsole = document.getElementById('closeConsole');

    // Virtual file system structure
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

    // Current directory path
    let currentPath = ['/','home','hacker'];

    // Vi editor state
    let viMode = false;
    let viFilePath = null;
    let viFileContent = '';
    let viEditorElement = null;
    let viStatusElement = null;

    // Helper function to get directory from path
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

    // Get current directory
    function getCurrentDirectory() {
        return getDirectoryFromPath(currentPath);
    }

    // Format path string for display
    function formatPathString() {
        if (currentPath.length === 1) return '/';
        return '/' + currentPath.slice(1).join('/');
    }

    // Available terminal commands
    const commands = {
        'help': () => {
            return `Available commands:
- help: Show this help message
- neofetch: Display system information
- ls [directory]: List files in directory
- cd [directory]: Change directory
- cat [filename]: Display file content
- vi [filename]: Edit file with vi editor
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
                    // Current directory, do nothing
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
        'vi': (args) => {
            if (viMode) {
                return "Already in vi editor mode. Save and quit with ESC + :wq or quit without saving with :q";
            }

            if (!args || args.length === 0) {
                return "Usage: vi [filename]";
            }

            const filename = args[0];
            let targetDir, targetFileName;

            try {
                if (filename.startsWith('/')) {
                    const segments = filename.split('/').filter(s => s);
                    const filePath = ['/', ...segments.slice(0, -1)];
                    targetFileName = segments[segments.length - 1];
                    targetDir = getDirectoryFromPath(filePath);
                } else {
                    targetDir = getCurrentDirectory();
                    targetFileName = filename;
                }

                // Check if file exists or create new one
                if (!targetDir.contents[targetFileName]) {
                    targetDir.contents[targetFileName] = {
                        type: 'file',
                        content: ''
                    };
                } else if (targetDir.contents[targetFileName].type !== 'file') {
                    return `vi: ${filename}: Is a directory`;
                }

                // Store file path for saving
                viFilePath = [...(filename.startsWith('/')
                               ? ['/', ...filename.split('/').filter(s => s).slice(0, -1)]
                               : currentPath), targetFileName];

                // Initialize editor with file content
                viFileContent = targetDir.contents[targetFileName].content;

                // Create editor interface
                viMode = true;

                // Clear console content temporarily
                const savedConsoleContent = consoleContent.innerHTML;
                consoleContent.innerHTML = '';

                // Create editor elements
                viEditorElement = document.createElement('textarea');
                viEditorElement.className = 'vi-editor';
                viEditorElement.value = viFileContent;
                viEditorElement.style.width = '100%';
                viEditorElement.style.height = 'calc(100% - 20px)';
                viEditorElement.style.backgroundColor = '#1a1a1a';
                viEditorElement.style.color = '#33ff33';
                viEditorElement.style.border = 'none';
                viEditorElement.style.outline = 'none';
                viEditorElement.style.resize = 'none';
                viEditorElement.style.fontFamily = 'monospace';
                viEditorElement.style.padding = '5px';

                viStatusElement = document.createElement('div');
                viStatusElement.className = 'vi-status';
                viStatusElement.textContent = `"${targetFileName}" [New File]`;
                viStatusElement.style.backgroundColor = '#333';
                viStatusElement.style.color = '#33ff33';
                viStatusElement.style.position = 'absolute';
                viStatusElement.style.bottom = '0';
                viStatusElement.style.left = '0';
                viStatusElement.style.right = '0';
                viStatusElement.style.padding = '2px 5px';

                consoleContent.appendChild(viEditorElement);
                consoleContent.appendChild(viStatusElement);

                // Disable the regular input
                consoleInput.disabled = true;

                // Focus the editor
                viEditorElement.focus();

                // Handle vi commands
                viEditorElement.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        viStatusElement.textContent = ':';

                        // Allow command input after ESC
                        viStatusElement.contentEditable = true;
                        viStatusElement.focus();

                        e.preventDefault();
                    }
                });

                // Handle vi command execution
                viStatusElement.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        const command = viStatusElement.textContent.substring(1);

                        if (command === 'w' || command === 'wq') {
                            // Save file
                            saveViFile();
                            viStatusElement.textContent = `"${targetFileName}" written`;

                            if (command === 'wq') {
                                // Quit vi
                                exitViMode(savedConsoleContent);
                                return "File saved.";
                            }
                        } else if (command === 'q' || command === 'q!') {
                            // Quit without saving
                            exitViMode(savedConsoleContent);
                            return "Vi editor closed without saving.";
                        } else {
                            viStatusElement.textContent = `Error: Unknown command: ${command}`;
                        }

                        e.preventDefault();

                        // After command execution, go back to editor unless we exited
                        if (viMode) {
                            viStatusElement.contentEditable = false;
                            viEditorElement.focus();
                        }
                    }
                });

                return "";
            } catch (error) {
                return `vi: ${filename}: ${error.message}`;
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
                              far away....`;
        },
        'exit': () => {
            if (viMode) {
                return "You're in vi editor mode. Save and quit with ESC + :wq or quit without saving with :q";
            }
            closeHackConsole();
            return "";
        }
    };

    // Save file contents from vi editor to the virtual file system
    function saveViFile() {
        if (!viMode || !viFilePath) return;

        try {
            // Get the directory object
            const dirPath = viFilePath.slice(0, -1);
            const fileName = viFilePath[viFilePath.length - 1];
            const directory = getDirectoryFromPath(dirPath);

            // Update file content
            if (!directory.contents[fileName]) {
                directory.contents[fileName] = {
                    type: 'file',
                    content: ''
                };
            }

            directory.contents[fileName].content = viEditorElement.value;
            return true;
        } catch (error) {
            viStatusElement.textContent = `Error saving file: ${error.message}`;
            return false;
        }
    }

    // Exit vi mode and restore console
    function exitViMode(savedConsoleContent) {
        if (!viMode) return;

        viMode = false;
        viFilePath = null;
        viFileContent = '';

        // Remove vi editor elements
        viEditorElement.remove();
        viStatusElement.remove();

        // Re-enable the console input
        consoleInput.disabled = false;

        // Restore console content
        consoleContent.innerHTML = savedConsoleContent;
        consoleInput.focus();
    }

    document.addEventListener('keydown', function(e) {
        // Skip if we're already in the console and typing
        if (hackConsole.style.display === 'flex' && document.activeElement === consoleInput) {
            return;
        }

        keySequence.push(e.key);
        if (keySequence.length > konamiCode.length) {
            keySequence.shift();
        }

        let codeMatched = true;
        for (let i = 0; i < konamiCode.length; i++) {
            if (keySequence[i] !== konamiCode[i]) {
                codeMatched = false;
                break;
            }
        }

        if (codeMatched) {
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
        // Exit vi mode if active
        if (viMode) {
            exitViMode(consoleContent.innerHTML);
        }
        hackConsole.style.display = 'none';
        keySequence.length = 0;
    }

    consoleInput.addEventListener('keydown', function(e) {
        // Skip if in vi mode
        if (viMode) return;

        if (e.key === 'Enter') {
            const command = consoleInput.value.trim();
            consoleInput.value = '';
            // Display command with proper prom
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
        if (e.key === 'Escape' && hackConsole.style.display === 'flex' && !viMode) {
            closeHackConsole();
        }
    });
});
