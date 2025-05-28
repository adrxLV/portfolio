document.addEventListener('DOMContentLoaded', function() {
    const keySequence = [];
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

    const hackConsole = document.getElementById('hackConsole');
    const consoleContent = document.getElementById('consoleContent');
    const consoleInput = document.getElementById('consoleInput');
    const closeConsole = document.getElementById('closeConsole');

    let currentTextColor = '#EBDBB2';

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
    let commandHistory = [];
    let historyIndex = -1;
    let currentPath = ['/','home','hacker'];

    let viMode = false;
    let viFilePath = null;
    let viFileContent = '';
    let viEditorElement = null;
    let viStatusElement = null;

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
- echo: Displays text
- grep: Searches for patterns in files
- history: Shows command history
- tree: Displays directory structure
- touch: Creates empty files
- mkdir: Creates directories
- cowsay: Displays ASCII cow with a message
- figlet: Creates text banners
- sl: Fun easter egg for mistyping ls
- find: Searches for files
- man: Show manual pages for commands
- wc: Count lines, words, and characters in a file
- tail: Display the last lines of a file
- chmod: Simulate changing file permissions
- calc: Basic calculator for arithmetic expressions
- weather: Display a simulated weather forecast
- ping: Simulate network connectivity test
- df: Display disk space usage
- ps: Display current processes
- rm: Remove files
- color: Change terminal text color
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

                if (!targetDir.contents[targetFileName]) {
                    targetDir.contents[targetFileName] = {
                        type: 'file',
                        content: ''
                    };
                } else if (targetDir.contents[targetFileName].type !== 'file') {
                    return `vi: ${filename}: Is a directory`;
                }

                viFilePath = [...(filename.startsWith('/')
                               ? ['/', ...filename.split('/').filter(s => s).slice(0, -1)]
                               : currentPath), targetFileName];


                viFileContent = targetDir.contents[targetFileName].content;


                viMode = true;


                const savedConsoleContent = consoleContent.innerHTML;
                consoleContent.innerHTML = '';


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

                consoleInput.disabled = true;

                viEditorElement.focus();

                viEditorElement.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        viStatusElement.textContent = ':';

                        viStatusElement.contentEditable = true;
                        viStatusElement.focus();

                        e.preventDefault();
                    }
                });


                viStatusElement.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        const command = viStatusElement.textContent.substring(1);

                        if (command === 'w' || command === 'wq') {

                            saveViFile();
                            viStatusElement.textContent = `"${targetFileName}" written`;

                            if (command === 'wq') {

                                exitViMode(savedConsoleContent);
                                return "File saved.";
                            }
                        } else if (command === 'q' || command === 'q!') {

                            exitViMode(savedConsoleContent);
                            return "Vi editor closed without saving.";
                        } else {
                            viStatusElement.textContent = `Error: Unknown command: ${command}`;
                        }

                        e.preventDefault();

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

        'echo': (args) => {
            if (!args || args.length === 0) return "";
            return args.join(' ');
        },

        'grep': (args) => {
            if (!args || args.length < 2) {
                return "Usage: grep [pattern] [filename]";
            }

            const pattern = args[0];
            const filename = args[1];

            try {
                const fileContent = commands['cat']([filename]);
                if (fileContent.startsWith('cat:')) {
                    return fileContent;
                }

                const matches = fileContent.split('\n')
                    .filter(line => line.includes(pattern))
                    .join('\n');

                return matches || `Pattern "${pattern}" not found in ${filename}`;
            } catch (error) {
                return `grep: ${filename}: ${error.message}`;
            }
        },

        'tree': (args) => {
            let targetPath = [...currentPath];

            if (args && args.length > 0) {
                if (args[0] === '/') {
                    targetPath = ['/'];
                } else if (args[0].startsWith('/')) {
                    targetPath = ['/'];
                    targetPath.push(...args[0].split('/').filter(s => s));
                } else if (args[0] === '~') {
                    targetPath = ['/', 'home', 'hacker'];
                } else {
                    targetPath.push(args[0]);
                }
            }

            try {
                const directory = getDirectoryFromPath(targetPath);
                return renderTree(directory, '', true);
            } catch (error) {
                return `tree: ${args ? args[0] : ''}: No such directory`;
            }

            function renderTree(dir, prefix, isRoot) {
                let result = isRoot ? formatPathString(targetPath) + '\n' : '';

                const entries = Object.entries(dir.contents);
                for (let i = 0; i < entries.length; i++) {
                    const [name, item] = entries[i];
                    const isLast = i === entries.length - 1;
                    const connector = isLast ? '└── ' : '├── ';
                    const childPrefix = isLast ? '    ' : '│   ';

                    result += prefix + connector + name + (item.type === 'directory' ? '/' : '') + '\n';

                    if (item.type === 'directory') {
                        result += renderTree(item, prefix + childPrefix, false);
                    }
                }

                return result;
            }
        },

        'touch': (args) => {
            if (!args || args.length === 0) {
                return "Usage: touch [filename]";
            }

            const filename = args[0];

            try {
                const current = getCurrentDirectory();

                if (current.contents[filename] && current.contents[filename].type === 'directory') {
                    return `touch: cannot touch '${filename}': Is a directory`;
                }

                if (!current.contents[filename]) {
                    current.contents[filename] = {
                        type: 'file',
                        content: ''
                    };
                }

                return '';
            } catch (error) {
                return `touch: ${filename}: ${error.message}`;
            }
        },
        'ps': () => {
            return `PID   USER     TIME   COMMAND
  1   root     0:00   init
 42   hacker   0:42   hyprland
666   hacker   0:13   neofetch
777   hacker   0:07   portfolio`;
        },

        'df': () => {
            return `Filesystem     Size   Used   Avail   Use%
/dev/sda1      200P   420G    80G    84%
tmpfs           64G     1G    63G     2%
/dev/sdb1        10P   900G   100G    90%`;
        },

        'rm': (args) => {
            if (!args || args.length === 0) {
                return "Usage: rm [-rf] [file|directory]";
            }

            let targetName;
            let forceRemove = false;

            if (args[0] === '-rf') {
                if (args.length < 2) {
                    return "Usage: rm [-rf] [file|directory]";
                }
                forceRemove = true;
                targetName = args[1];
            } else {
                targetName = args[0];
            }

            const current = getCurrentDirectory();

            if (!current.contents[targetName]) {
                return `rm: cannot remove '${targetName}': No such file or directory`;
            }

            if (current.contents[targetName].type === 'directory' && !forceRemove) {
                appendToConsole(`Do you really want to delete the directory '${targetName}'? (y/yes, n/no)`);

                window.waitingForRmConfirmation = {
                    directoryName: targetName,
                    directory: current
                };
                return;
            } else {
                delete current.contents[targetName];
                return `'${targetName}' removed.`;
            }
        },

        'mkdir': (args) => {
            if (!args || args.length === 0) {
                return "Usage: mkdir [directory]";
            }

            const dirName = args[0];

            try {
                const current = getCurrentDirectory();

                if (current.contents[dirName]) {
                    return `mkdir: cannot create directory '${dirName}': File exists`;
                }

                current.contents[dirName] = {
                    type: 'directory',
                    contents: {}
                };

                return '';
            } catch (error) {
                return `mkdir: ${dirName}: ${error.message}`;
            }
        },

        'cowsay': (args) => {
            if (!args || args.length === 0) {
                return "Usage: cowsay [message]";
            }

            const message = args.join(' ');
            const lineLength = Math.min(message.length, 40);
            const border = '_'.repeat(lineLength + 2);
            const spaces = ' '.repeat(lineLength - message.length + 2);

            return `
 ${border}
< ${message}${spaces}>
 ${'='.repeat(lineLength + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
    `;
        },

        'figlet': (args) => {
            if (!args || args.length === 0) {
                return "Usage: figlet [text]";
            }

            const text = args.join(' ');
            let result = '';

            const letters = {
                'A': [' AAA ', 'A   A', 'AAAAA', 'A   A', 'A   A'],
                'B': ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
                'C': [' CCC ', 'C   C', 'C    ', 'C   C', ' CCC '],
                'D': ['DDDD ', 'D   D', 'D   D', 'D   D', 'DDDD '],
                'E': ['EEEEE', 'E    ', 'EEE  ', 'E    ', 'EEEEE'],
                'F': ['FFFFF', 'F    ', 'FFF  ', 'F    ', 'F    '],
                'G': [' GGG ', 'G    ', 'G  GG', 'G   G', ' GGG '],
                'H': ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
                'I': ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
                'J': ['JJJJJ', '  J  ', '  J  ', 'J J  ', ' JJ  '],
                'K': ['K   K', 'K  K ', 'KKK  ', 'K  K ', 'K   K'],
                'L': ['L    ', 'L    ', 'L    ', 'L    ', 'LLLLL'],
                'M': ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
                'N': ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
                'O': [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
                'P': ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
                'Q': [' QQQ ', 'Q   Q', 'Q   Q', 'Q  Q ', ' QQ Q'],
                'R': ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
                'S': [' SSS ', 'S    ', ' SSS ', '    S', 'SSSS '],
                'T': ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
                'U': ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
                'V': ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
                'W': ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
                'X': ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
                'Y': ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
                'Z': ['ZZZZZ', '   Z ', '  Z  ', ' Z   ', 'ZZZZZ'],
                ' ': ['     ', '     ', '     ', '     ', '     ']
            };

            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < text.length; j++) {
                    const char = text[j].toUpperCase();
                    result += (letters[char] ? letters[char][i] : '     ') + ' ';
                }
                result += '\n';
            }

            return result;
        },

        'sl': () => {
            return `
    .-.      _______
   /   \\    |       |
  |     |   |_______|
,-'-----'-.  \\8 8 8 8\\_
|         |   \\8 8 8 8 \\_
|    _____|    \\8 8 8 8  \\
|    |    |     \\8 8 8 8  \\
'----'----'------'---------'
  Choo choo! Wrong command? Did you mean 'ls'?
`;
        },
        'find': (args) => {
            if (!args || args.length === 0) {
                return "Usage: find [directory] -name [filename]";
            }

            let directory = '.';
            let filename = null;

            for (let i = 0; i < args.length; i++) {
                if (args[i] === '-name' && i + 1 < args.length) {
                    filename = args[i + 1].replace(/\*/g, '');
                    i++;
                } else if (i === 0) {
                    directory = args[i];
                }
            }

            if (!filename) {
                return "Usage: find [directory] -name [filename]";
            }

            let targetPath = [...currentPath];

            if (directory === '/') {
                targetPath = ['/'];
            } else if (directory === '~') {
                targetPath = ['/', 'home', 'hacker'];
            } else if (directory !== '.') {
                if (directory.startsWith('/')) {
                    targetPath = ['/'];
                    targetPath.push(...directory.split('/').filter(s => s));
                } else {
                    targetPath.push(...directory.split('/').filter(s => s));
                }
            }

            try {
                const dir = getDirectoryFromPath(targetPath);
                const results = [];
                findFiles(dir, targetPath, filename, results);

                return results.join('\n') || "No files found";
            } catch (error) {
                return `find: '${directory}': No such file or directory`;
            }

            function findFiles(dir, path, name, results) {
                for (const [entryName, entry] of Object.entries(dir.contents)) {
                    const entryPath = [...path, entryName];
                    const displayPath = '/' + entryPath.slice(1).join('/');

                    if (entryName.includes(name)) {
                        results.push(displayPath);
                    }

                    if (entry.type === 'directory') {
                        findFiles(entry, entryPath, name, results);
                    }
                }
            }
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
        'man': (args) => {
            if (!args || args.length === 0) {
                return "What manual page do you want?";
            }

            const command = args[0].toLowerCase();
            const manPages = {
                'ls': 'LS(1)\n\nNAME\n    ls - list directory contents\n\nSYNOPSIS\n    ls [DIRECTORY]\n\nDESCRIPTION\n    List information about files in the specified directory.',
                'cd': 'CD(1)\n\nNAME\n    cd - change directory\n\nSYNOPSIS\n    cd [DIRECTORY]\n\nDESCRIPTION\n    Change the current working directory to the specified directory.',
                'cat': 'CAT(1)\n\nNAME\n    cat - concatenate and display files\n\nSYNOPSIS\n    cat [FILE]\n\nDESCRIPTION\n    Concatenate FILE to standard output.',
                'grep': 'GREP(1)\n\nNAME\n    grep - search for PATTERN in files\n\nSYNOPSIS\n    grep PATTERN FILE\n\nDESCRIPTION\n    Search for PATTERN in FILE and print matching lines.',
                'find': 'FIND(1)\n\nNAME\n    find - search for files\n\nSYNOPSIS\n    find [DIRECTORY] -name PATTERN\n\nDESCRIPTION\n    Search for files in DIRECTORY that match PATTERN.'
            };

            return manPages[command] || `No manual entry for ${command}`;
        },
        'wc': (args) => {
            if (!args || args.length === 0) {
                return "Usage: wc [filename]";
            }

            const filename = args[0];
            try {
                const content = commands['cat']([filename]);
                if (content.startsWith('cat:')) {
                    return content;
                }

                const lines = content.split('\n');
                const words = content.split(/\s+/).filter(word => word.length > 0);
                const chars = content.length;

                return `${lines.length} ${words.length} ${chars} ${filename}`;
            } catch (error) {
                return `wc: ${filename}: ${error.message}`;
            }
        },
        'tail': (args) => {
            if (!args || args.length === 0) {
                return "Usage: tail [-n lines] [filename]";
            }

            let lineCount = 10;
            let filename = args[0];

            if (args[0] === '-n' && args.length > 2) {
                lineCount = parseInt(args[1]);
                filename = args[2];
            }

            try {
                const content = commands['cat']([filename]);
                if (content.startsWith('cat:')) {
                    return content;
                }

                const lines = content.split('\n');
                return lines.slice(Math.max(0, lines.length - lineCount)).join('\n');
            } catch (error) {
                return `tail: ${filename}: ${error.message}`;
            }
        },
        'chmod': (args) => {
            if (!args || args.length < 2) {
                return "Usage: chmod [mode] [filename]";
            }

            return `chmod: changing permissions of '${args[1]}': Operation successful (simulated)`;
        },
        'calc': (args) => {
            if (!args || args.length === 0) {
                return "Usage: calc [expression]";
            }

            const expression = args.join(' ');
            try {
                if (/^[0-9+\-*/().\s]+$/.test(expression)) {
                    return String(eval(expression));
                } else {
                    return "Error: Invalid expression. Only use numbers and basic operators +, -, *, /.";
                }
            } catch (error) {
                return `Error: ${error.message}`;
            }
        },
        'weather': () => {
            const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Partly Cloudy', 'Clear'];
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            const temp = Math.floor(Math.random() * 35) + 5;

            return `
Weather for: Internet City, Cyberspace
Temperature: ${temp}°C
Conditions: ${condition}
Forecast: More of the same, but different.
Humidity: 42%
Wind: Variable at 13.37 km/h
    `;
        },
        'ping': (args) => {
            if (!args || args.length === 0) {
                return "Usage: ping [host]";
            }

            const host = args[0];
            const times = [13, 15, 14, 16, 13];
            let response = `PING ${host} (127.0.0.1): 56 data bytes\n`;

            for (let i = 0; i < 5; i++) {
                response += `64 bytes from 127.0.0.1: icmp_seq=${i+1} ttl=64 time=${times[i]}.${Math.floor(Math.random() * 1000)} ms\n`;
            }

            response += `\n--- ${host} ping statistics ---\n`;
            response += `5 packets transmitted, 5 packets received, 0.0% packet loss\n`;
            response += `round-trip min/avg/max/stddev = ${Math.min(...times)}.123/${(times.reduce((a, b) => a + b, 0) / times.length).toFixed(2)}/`;
            response += `${Math.max(...times)}.789/0.987 ms`;

            return response;
        },
        'exit': () => {
            if (viMode) {
                return "You're in vi editor mode. Save and quit with ESC + :wq or quit without saving with :q";
            }
            closeHackConsole();
            return "";
        }
    };

    function appendToConsole(text) {
        const line = document.createElement('div');
        line.textContent = text;
        line.style.color = currentTextColor;
        consoleContent.appendChild(line);
        consoleContent.scrollTop = consoleContent.scrollHeight;
    }


    commands['history'] = (args) => {
        if (commandHistory.length === 0) {
            return "No commands in history";
        }

        return commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n');
    };
    commands['color'] = (args) => {
        if (!args || args.length === 0) {
            return "Usage: color [color-name|default]";
        }

        const color = args[0].toLowerCase();
        if (color === 'default') {
            currentTextColor = '#EBDBB2';
        } else {
            currentTextColor = color;
        }

        // Muda a cor de todos os elementos existentes no terminal
        Array.from(consoleContent.children).forEach(child => {
            // Se o elemento contém o prompt, preserva a cor do prompt mas muda o resto
            if (child.innerHTML && child.innerHTML.includes('hacker@localhost:')) {
                const promptSpan = child.querySelector('.console-prompt');
                if (promptSpan) {
                    // Mantém a cor original do prompt
                    promptSpan.style.color = '#B8BB26';
                }
                // Aplica a nova cor ao elemento, mas o prompt já tem sua cor preservada
                child.style.color = currentTextColor;
            } else {
                // Para elementos sem prompt, aplica a nova cor normalmente
                child.style.color = currentTextColor;
            }
        });

        // Atualiza também o estilo padrão para novos elementos
        const style = document.getElementById('dynamic-terminal-style') || document.createElement('style');
        style.id = 'dynamic-terminal-style';
        style.textContent = `
        .console-content div {
            color: ${currentTextColor} !important;
        }
        .console-prompt {
            color: #B8BB26 !important;
        }
    `;
        if (!document.getElementById('dynamic-terminal-style')) {
            document.head.appendChild(style);
        }

        return `Text color changed to ${color}`;
    };

   function saveViFile() {
        if (!viMode || !viFilePath) return;

        try {
            const dirPath = viFilePath.slice(0, -1);
            const fileName = viFilePath[viFilePath.length - 1];
            const directory = getDirectoryFromPath(dirPath);

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

    function exitViMode(savedConsoleContent) {
        if (!viMode) return;

        viMode = false;
        viFilePath = null;
        viFileContent = '';

        viEditorElement.remove();
        viStatusElement.remove();

        consoleInput.disabled = false;

        consoleContent.innerHTML = savedConsoleContent;
        consoleInput.focus();
    }

    document.addEventListener('keydown', function(e) {
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
        if (viMode) {
            exitViMode(consoleContent.innerHTML);
        }
        hackConsole.style.display = 'none';
        keySequence.length = 0;
    }

    consoleInput.addEventListener('keydown', function(e) {
        if (viMode) return;

        if (e.key === 'Enter') {
            const command = consoleInput.value.trim();

            // Add non-empty commands to history
            if (command !== '') {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
            }

            consoleInput.value = '';

            if (window.waitingForRmConfirmation) {
                // Existing rm confirmation code
                const response = command.toLowerCase();
                const { directoryName, directory } = window.waitingForRmConfirmation;

                if (response === 'y' || response === 'yes') {
                    delete directory.contents[directoryName];
                    appendToConsole(`Directory '${directoryName}' removed.`);
                } else if (response === 'n' || response === 'no') {
                    appendToConsole(`Directory '${directoryName}' not removed.`);
                } else {
                    appendToConsole("Invalid input. Please type 'y/yes' or 'n/no'.");
                    return;
                }

                window.waitingForRmConfirmation = null;
                return;
            }

            // Rest of your existing Enter key code
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
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                consoleInput.value = commandHistory[historyIndex];
                // Move cursor to end of input
                setTimeout(() => {
                    consoleInput.selectionStart = consoleInput.selectionEnd = consoleInput.value.length;
                }, 0);
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                consoleInput.value = commandHistory[historyIndex];
                // Move cursor to end of input
                setTimeout(() => {
                    consoleInput.selectionStart = consoleInput.selectionEnd = consoleInput.value.length;
                }, 0);
            } else if (historyIndex === commandHistory.length - 1) {
                historyIndex = commandHistory.length;
                consoleInput.value = '';
            }
        }
    });

    closeConsole.addEventListener('click', closeHackConsole);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hackConsole.style.display === 'flex' && !viMode) {
            closeHackConsole();
        }
    });
});

