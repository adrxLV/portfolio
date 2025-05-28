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
                                        },
                                        'cybersec_notes.txt': {
                                            type: 'file',
                                            content: 'Cybersecurity Research Notes:\n- Zero-day vulnerability analysis\n- Penetration testing methodologies\n- Network security protocols\n- Malware reverse engineering\n- Social engineering defense strategies'
                                        },
                                        'ai_models.txt': {
                                            type: 'file',
                                            content: 'AI Research:\n- Large Language Models (LLMs)\n- Computer Vision algorithms\n- Neural Networks architectures\n- Machine Learning datasets\n- Deep Learning frameworks'
                                        }
                                    }
                                },
                                'Downloads': {
                                    type: 'directory',
                                    contents: {
                                        'archive.zip': {
                                            type: 'file',
                                            content: '[Binary content: archive.zip]'
                                        },
                                        'lightsaber_blueprint.pdf': {
                                            type: 'file',
                                            content: '[Jedi Archives] Confidential lightsaber construction manual. Property of the Jedi Order.'
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
                                                    content: '# Portfolio Website\nMy personal portfolio website showcasing my projects and skills.\n\nTech stack:\n- HTML/CSS/JavaScript\n- Responsive design\n- Terminal easter egg'
                                                }
                                            }
                                        },
                                        'myrecipe': {
                                            type: 'directory',
                                            contents: {
                                                'README.md': {
                                                    type: 'file',
                                                    content: '# MyRecipe\nA recipe management and sharing app with social features.\n\nFeatures:\n- User accounts\n- Recipe creation and sharing\n- Social interactions'
                                                }
                                            }
                                        },
                                        'myhub': {
                                            type: 'directory',
                                            contents: {
                                                'README.md': {
                                                    type: 'file',
                                                    content: '# MyHub\nA centralized dashboard for managing multiple services and applications.\n\nFeatures:\n- Single sign-on\n- Customizable widgets\n- Service integration'
                                                }
                                            }
                                        },
                                        'jarvis': {
                                            type: 'directory',
                                            contents: {
                                                'README.md': {
                                                    type: 'file',
                                                    content: '# J.A.R.V.I.S.\nJust A Rather Very Intelligent System - A personal AI assistant.\n\nFeatures:\n- Natural language processing\n- Task automation\n- Smart home integration\n- Voice recognition'
                                                }
                                            }
                                        },
                                        'hogwarts-ai': {
                                            type: 'directory',
                                            contents: {
                                                'README.md': {
                                                    type: 'file',
                                                    content: '# Hogwarts AI\nMagical AI system for sorting students and predicting magical aptitude.\n\nFeatures:\n- Sorting Hat algorithm\n- Spell recognition\n- Magical creature classification'
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
                                    content: "ls -la\ncd Projects\ncat portfolio.txt\nneofetch\ncd ..\ngrep 'secret' *.txt\nwhoami\nsudo rm -rf /\n^C\nhistory -c\njedi --help\nsortinghat gryffindor\nforce-scan rebel_base"
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
                            content: 'root:x:0:0:root:/root:/bin/bash\nhacker:x:1000:1000:Hacker:/home/hacker:/bin/bash\nobi-wan:x:1977:1977:Jedi Master:/home/obi-wan:/bin/bash\nharry:x:1980:1980:The Boy Who Lived:/home/harry:/bin/bash'
                        },
                        'jedi_council.conf': {
                            type: 'file',
                            content: 'Jedi Council Configuration\nMaster Yoda: yoda@jedi.org\nMaster Windu: mwindu@jedi.org\nMaster Obi-Wan: obi-wan@jedi.org'
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
Basic Commands:
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
    - echo: Displays text
    - grep: Searches for patterns in files
    - history: Shows command history
    - tree: Displays directory structure
    - touch: Creates empty files
    - mkdir: Creates directories
    - rm: Remove files
    - color: Change terminal text color
    - exit: Close the console

Fun Commands:
    - cowsay: Displays ASCII cow with a message
    - figlet: Creates text banners
    - sl: Fun easter egg for mistyping ls
    - fortune: Display a random inspirational or funny message
    - matrix: Simulate the Matrix animation
    - starwars: Display Star Wars opening scene in ASCII art

System Commands:
    - htop: Display process monitor
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

Star Wars Commands:
    - jedi [info|council|training]: Access Jedi archives and training
    - force [scan|push|heal]: Use Force abilities
    - lightsaber [ignite|duel]: Lightsaber commands
    - rebel [mission|intel]: Rebel Alliance operations
    - empire [status|fleet]: Imperial operations
    - cantina: Visit the Mos Eisley Cantina
    - deathstar: Access Death Star plans

 Harry Potter Commands:
    - sortinghat [house]: Get sorted into a Hogwarts house
    - spell [list|cast]: Magic spells and incantations
    - quidditch [stats|play]: Quidditch game information
    - marauders: Activate the Marauder's Map
    - patronus: Cast your Patronus charm
    - potions [brew|list]: Potion making
    - diagon: Visit Diagon Alley

Cybersecurity Commands:
    - nmap [target]: Network scanning simulation
    - metasploit [modules|search]: Penetration testing framework
    - wireshark [capture|analyze]: Network packet analysis
    - hashcat [crack|benchmark]: Password cracking simulation
    - burpsuite [scan|proxy]: Web application security testing
    - volatility [analyze|dump]: Memory forensics
    - sqlmap [scan|inject]: SQL injection testing

AI Commands:
    - tensorflow [model|train]: Machine learning framework
    - pytorch [neural|train]: Deep learning operations
    - openai [gpt|dalle]: AI model interactions
    - huggingface [models|datasets]: AI model hub
    - kaggle [competitions|datasets]: Data science platform
    - jupyter [notebook|lab]: Interactive computing environment
    - pandas [dataframe|analyze]: Data manipulation`;
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
                               Most used phrase: i use arch btw
                               
                               ⚡ Force Sensitivity: High
                               🏰 House: Ravenclaw
                               🔒 Security Level: Jedi Master
                               🤖 AI Models: 42 loaded`;
        },

        // Star Wars Commands
        'jedi': (args) => {
            if (!args || args.length === 0) {
                return `
╔══════════════════════════════════════╗
║           JEDI ARCHIVES              ║
╠══════════════════════════════════════╣
║ Available commands:                  ║
║ • jedi info     - Jedi information   ║
║ • jedi council  - Council members    ║
║ • jedi training - Training modules   ║
║ • jedi code     - The Jedi Code      ║
╚══════════════════════════════════════╝

"A Jedi uses the Force for knowledge and defense, never for attack."`;
            }

            const subCmd = args[0].toLowerCase();
            switch(subCmd) {
                case 'info':
                    return `
🌟 JEDI ORDER INFORMATION 🌟

Founded: 25,000 BBY
Headquarters: Jedi Temple, Coruscant
Current Status: Rebuilding after Order 66

Philosophy: Peace, knowledge, serenity, harmony
Code: There is no emotion, there is peace...

Force Abilities:
• Telekinesis    • Mind tricks
• Precognition   • Lightsaber combat
• Force healing  • Force lightning (Dark Side)`;

                case 'council':
                    return `
🏛️  JEDI HIGH COUNCIL 🏛️

Active Members:
• Master Yoda (Grand Master) ⭐
• Master Mace Windu
• Master Obi-Wan Kenobi
• Master Ki-Adi-Mundi
• Master Plo Koon

"The Council will decide your fate."`;

                case 'training':
                    return `
⚔️  JEDI TRAINING MODULES ⚔️

Youngling Training:
□ Basic Force Sensitivity
□ Lightsaber Forms I-III
□ Meditation Techniques

Padawan Training:
□ Advanced Combat Forms
□ Mission Experience
□ Master-Apprentice Bond

Knight Trials:
□ Trial of Skill
□ Trial of Courage
□ Trial of the Flesh
□ Trial of Spirit

"Train yourself to let go of everything you fear to lose."`;

                case 'code':
                    return `
📜 THE JEDI CODE 📜

There is no emotion, there is peace.
There is no ignorance, there is knowledge.
There is no passion, there is serenity.
There is no chaos, there is harmony.
There is no death, there is the Force.

"The Force will be with you, always."`;

                default:
                    return "Unknown Jedi command. Use 'jedi' to see available options.";
            }
        },

        'force': (args) => {
            if (!args || args.length === 0) {
                return "Available Force abilities: scan, push, heal, lightning, vision";
            }

            const ability = args[0].toLowerCase();
            const forceMessages = {
                'scan': `
🔍 Force Scan Initiated...

Scanning surroundings...
━━━━━━━━━━ 100%

Life forms detected: 3 sentient beings
Force sensitivity: Moderate levels detected
Dark Side presence: Minimal
Threat level: Low

"I sense something... a presence I haven't felt since..."`,

                'push': `
💨 Force Push!

*WHOOOOSH*

You extend your hand and focus the Force...
A powerful invisible wave emanates from you!

Target Status: ⚡ PUSHED BACK ⚡
Effectiveness: High
Collateral damage: Minimal

"The Force is strong with this one."`,

                'heal': `
✨ Force Heal Activated

Channeling the light side of the Force...
━━━━━━━━━━ Healing... 100%

✅ Wounds closed
✅ Pain subsided  
✅ Energy restored
✅ Balance maintained

"The Force flows through all living things."`,

                'lightning': `
⚡ Force Lightning ⚡

ERROR: Dark Side ability detected!
⚠️  WARNING: Jedi Code violation!

"Anger, fear, aggression... the dark side are they.
Once you start down the dark path, forever will it dominate your destiny."

Access denied by Jedi Council.`,

                'vision': `
🔮 Force Vision

The Force shows you glimpses of the future...

Vision fragments:
• A great disturbance in the Force
• Twin suns setting on a desert world
• A weapon capable of destroying planets
• Hope, embodied in unlikely heroes

"Difficult to see. Always in motion is the future."`
            };

            return forceMessages[ability] || "Unknown Force ability. The Force works in mysterious ways.";
        },

        'lightsaber': (args) => {
            if (!args || args.length === 0) {
                return "Lightsaber commands: ignite, duel, customize, meditate";
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'ignite':
                    return `
⚡ Lightsaber Ignited! ⚡

    \\    |    /
     \\   |   /
      \\  |  /
═══════════════
       |||
       |||  *VWOOM*
       |||
       |||
       |||
      |||||
     |||||||
    |||||||||

Blade Color: Blue
Crystal: Ilum Crystal
Length: 1 meter
Status: Ready for combat

"This weapon is your life."`;

                case 'duel':
                    return `
⚔️  LIGHTSABER DUEL ⚔️

*CLASH* *VWOOM* *BZZT*

Opponent: Training Remote
Form Used: Form I - Shii-Cho

Round 1: ⚡ STRIKE ⚡
Round 2: 🛡️ BLOCK 🛡️
Round 3: ⚡ VICTORY ⚡

"Your skills are complete. Indeed, you are powerful as the Emperor has foreseen."`;

                case 'customize':
                    return `
🔧 Lightsaber Customization 🔧

Available Crystals:
• Blue (Jedi Guardian)
• Green (Jedi Consular)  
• Purple (Rare, Mace Windu style)
• Yellow (Jedi Sentinel)
• Red (Sith only - unavailable)

Hilt Materials:
• Durasteel • Phrik • Cortosis
• Bronzium • Electrum

"The lightsaber is not just a weapon. It is a work of art."`;

                case 'meditate':
                    return `
🧘‍♂️ Lightsaber Meditation 🧘‍♂️

Connecting with your kyber crystal...
Feeling the Force flow through the blade...
Understanding the weapon's spirit...

Meditation complete.
Lightsaber attunement: +15%
Force connection: Enhanced
Combat efficiency: Improved

"The crystal is the heart of the blade."`;

                default:
                    return "Unknown lightsaber command. The weapon of a Jedi Knight requires proper handling.";
            }
        },

        'rebel': (args) => {
            if (!args || args.length === 0) {
                return `
🌟 REBEL ALLIANCE COMMAND 🌟

Available operations:
• rebel mission  - Current missions
• rebel intel    - Intelligence reports  
• rebel fleet    - Fleet status
• rebel heroes   - Notable members

"The Empire may have the numbers, but we have the cause."`;
            }

            const operation = args[0].toLowerCase();
            switch(operation) {
                case 'mission':
                    return `
📋 ACTIVE REBEL MISSIONS 📋

MISSION ALPHA-7: Steal Death Star plans
Status: ✅ COMPLETED (Rogue One)
Casualty Level: Heavy

MISSION BETA-12: Destroy Death Star
Status: ✅ COMPLETED (Luke Skywalker)
Death Star Status: 💥 DESTROYED

MISSION GAMMA-3: Evacuate Echo Base
Status: ✅ COMPLETED 
Base Status: Compromised

CURRENT PRIORITY: Rescue Han Solo from Jabba's Palace`;

                case 'intel':
                    return `
🕵️ INTELLIGENCE REPORT 🕵️

CLASSIFIED - EYES ONLY

• Second Death Star under construction
• Emperor will be personally overseeing completion
• Rebel fleet position may be compromised
• Imperial trap suspected
• Recommend extreme caution

"It's a trap!" - Admiral Ackbar`;

                case 'fleet':
                    return `
🚀 REBEL FLEET STATUS 🚀

Capital Ships:
• Mon Calamari Cruisers: 12 operational
• Nebulon-B Frigates: 8 operational  
• Corellian Corvettes: 15 operational

Starfighters:
• X-wing squadrons: Red, Gold, Blue
• Y-wing bombers: 24 operational
• A-wing interceptors: 18 operational

Fleet Status: Ready for assault
Morale: High
"May the Force be with us."`;

                case 'heroes':
                    return `
🌟 REBEL HEROES 🌟

Princess Leia Organa - Leader, Diplomat
Luke Skywalker - Jedi Knight, Pilot
Han Solo - Smuggler, General
Chewbacca - Co-pilot, Warrior
Lando Calrissian - Baron Administrator
Admiral Ackbar - Fleet Commander
Mon Mothma - Chief of State

"They are our most precious resource."`;

                default:
                    return "Unknown rebel operation. Stay strong, the Empire will fall.";
            }
        },

        'empire': (args) => {
            if (!args || args.length === 0) {
                return `
⚫ IMPERIAL COMMAND CENTER ⚫
🔴 ACCESS RESTRICTED 🔴

Available operations:
• empire status  - Imperial status
• empire fleet   - Fleet deployment
• empire vader   - Lord Vader's orders

"Your lack of faith is disturbing."`;
            }

            const operation = args[0].toLowerCase();
            switch(operation) {
                case 'status':
                    return `
⚫ GALACTIC EMPIRE STATUS ⚫

Territory: Entire Known Galaxy
Capital: Coruscant, Imperial Center
Supreme Leader: Emperor Palpatine
Military Commander: Darth Vader

Recent Setbacks:
• Death Star I: Destroyed
• Rebel Alliance: Still active
• Jedi Survivor: Luke Skywalker

Status: Iron grip on galaxy, some Rebel resistance

"The Emperor is not as forgiving as I am."`;

                case 'fleet':
                    return `
⚫ IMPERIAL FLEET DEPLOYMENT ⚫

Star Destroyers: 25,000 operational
Super Star Destroyers: 13 operational
TIE Fighter Squadrons: Countless
Death Star II: 60% complete

Current Deployment:
• Endor System: Death Star protection
• Outer Rim: Rebel hunting
• Core Worlds: Security patrol

"Most impressive."`;

                case 'vader':
                    return `
🔴 LORD VADER'S ORDERS 🔴

"Find the Rebel base."
"Bring me the Death Star plans."
"The Emperor wants Luke Skywalker alive."
"You have failed me for the last time."

Current Priority: Convert Luke Skywalker to the Dark Side

"Join me, and together we can rule the galaxy as father and son."`;

                default:
                    return "Unknown Imperial operation. The Emperor does not tolerate failure.";
            }
        },

        'cantina': () => {
            return `
🍺 MOS EISLEY CANTINA 🍺

*Jizz music plays in the background*

Bartender: "We don't serve their kind here!"

Patrons present:
• Greedo (Bounty Hunter) 💀
• Figrin D'an and the Modal Nodes (Band) 🎵
• Ponda Baba (Aqualish thug) 
• Dr. Evazan (Wanted criminal)
• Various smugglers and scoundrels

Drinks Available:
• Blue Milk
• Corellian Ale  
• Jawa Juice
• Bantha Beer

"You will never find a more wretched hive of scum and villainy."`;
        },

        'deathstar': () => {
            return `
💀 DEATH STAR TECHNICAL SPECIFICATIONS 💀

⚠️  CLASSIFIED IMPERIAL DOCUMENT ⚠️

Diameter: 120 kilometers
Crew: 1,186,295 personnel
Armament: Superlaser capable of destroying planets
Defenses: Ray shielding, deflector shields
Weakness: Small thermal exhaust port

Status: DESTROYED by Rebel Alliance

Design Flaw: Intentionally placed by Galen Erso
Destroyed by: Luke Skywalker (X-wing, proton torpedoes)

"That's no moon... it's a space station."

⚠️  This workstation is now operating under Rebel control.`;
        },

        // Harry Potter Commands
        'sortinghat': (args) => {
            const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
            const houseDescriptions = {
                'gryffindor': 'Brave, daring, and chivalrous! You belong in GRYFFINDOR! 🦁',
                'hufflepuff': 'Loyal, patient, and kind! You belong in HUFFLEPUFF! 🦡',
                'ravenclaw': 'Intelligent, witty, and wise! You belong in RAVENCLAW! 🦅',
                'slytherin': 'Ambitious, cunning, and resourceful! You belong in SLYTHERIN! 🐍'
            };

            if (args && args.length > 0) {
                const requestedHouse = args[0].toLowerCase();
                if (houseDescriptions[requestedHouse]) {
                    return `
🎩 THE SORTING HAT 🎩

"Hmm... ${requestedHouse.toUpperCase()}? An interesting choice..."

${houseDescriptions[requestedHouse]}

House Qualities:
${requestedHouse === 'gryffindor' ? '• Courage • Bravery • Determination • Daring' :
                        requestedHouse === 'hufflepuff' ? '• Loyalty • Patience • Hard Work • Dedication' :
                            requestedHouse === 'ravenclaw' ? '• Intelligence • Wisdom • Wit • Learning' :
                                '• Ambition • Cunning • Leadership • Resourcefulness'}

"Better be... ${requestedHouse.toUpperCase()}!"`;
                }
            }

            const randomHouse = houses[Math.floor(Math.random() * houses.length)].toLowerCase();
            return `
🎩 THE SORTING HAT 🎩

"Hmm... difficult, very difficult..."
"I see courage... intelligence... loyalty... ambition..."
"But where to put you?"

*The hat contemplates deeply*

"Better be... ${randomHouse.toUpperCase()}!"

${houseDescriptions[randomHouse]}`;
        },

        'spell': (args) => {
            if (!args || args.length === 0) {
                return `
🪄 SPELL COMMANDS 🪄

• spell list - Show available spells
• spell cast [spell] - Cast a spell
• spell info [spell] - Get spell information

"It's LeviOsa, not LeviosA!"`;
            }

            const action = args[0].toLowerCase();
            const spellName = args[1] ? args[1].toLowerCase() : '';

            if (action === 'list') {
                return `
📚 SPELL BOOK 📚

Charms:
• Lumos - Creates light
• Alohomora - Unlocks doors
• Wingardium Leviosa - Levitation charm
• Accio - Summoning charm

Defensive Spells:
• Expelliarmus - Disarming charm
• Protego - Shield charm
• Expecto Patronum - Patronus charm

Advanced Magic:
• Avada Kedavra - Killing curse (FORBIDDEN)
• Imperio - Imperius curse (FORBIDDEN)
• Crucio - Cruciatus curse (FORBIDDEN)

"Remember, these spells require proper wand movement and pronunciation!"`;
            }

            if (action === 'cast') {
                const spells = {
                    'lumos': '💡 *LUMOS!* Your wand tip lights up with a bright glow!',
                    'alohomora': '🔓 *ALOHOMORA!* The lock clicks open!',
                    'wingardium': '🪶 *WINGARDIUM LEVIOSA!* The feather rises gracefully into the air!',
                    'leviosa': '🪶 *WINGARDIUM LEVIOSA!* The feather rises gracefully into the air!',
                    'accio': '🏃‍♂️ *ACCIO!* The object zooms toward you!',
                    'expelliarmus': '⚡ *EXPELLIARMUS!* Your opponent\'s wand flies out of their hand!',
                    'protego': '🛡️ *PROTEGO!* A magical shield forms in front of you!',
                    'patronus': '🦌 *EXPECTO PATRONUM!* A silvery stag bounds from your wand!',
                    'avada': '💀 *ERROR* This is an Unforgivable Curse! Aurors have been notified!',
                    'kedavra': '💀 *ERROR* This is an Unforgivable Curse! Aurors have been notified!',
                    'imperio': '🧠 *ERROR* This is an Unforgivable Curse! Aurors have been notified!',
                    'crucio': '⚡ *ERROR* This is an Unforgivable Curse! Aurors have been notified!'
                };

                return spells[spellName] || `❌ Unknown spell "${spellName}". Check your pronunciation!`;
            }

            return "Unknown spell command. Use 'spell list' to see available spells.";
        },

        'quidditch': (args) => {
            if (!args || args.length === 0) {
                return `
🏆 QUIDDITCH HEADQUARTERS 🏆

• quidditch stats - View league standings
• quidditch play - Play a quick match
• quidditch rules - Game rules
• quidditch teams - Famous teams

"Quidditch is played by two teams of seven people on broomsticks."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'stats':
                    return `
🏆 HOGWARTS QUIDDITCH LEAGUE 🏆

Current Standings:
1. Gryffindor - 420 points 🦁
2. Slytherin - 380 points 🐍  
3. Ravenclaw - 340 points 🦅
4. Hufflepuff - 290 points 🦡

Top Scorer: Harry Potter (Gryffindor Seeker)
Fastest Snitch Catch: 3 minutes, 47 seconds
Most Goals: Katie Bell (Gryffindor Chaser)

Next Match: Gryffindor vs Slytherin`;

                case 'play':
                    const outcomes = [
                        '🏆 You caught the Golden Snitch! Gryffindor wins 150-140!',
                        '😤 Slytherin caught the Snitch! They win 160-80!',
                        '⚡ Amazing comeback! You caught the Snitch in the final seconds!',
                        '🌧️ Match postponed due to severe weather conditions!',
                        '🦌 Your Patronus distracted the Dementors! Gryffindor wins!'
                    ];
                    return `
🧙‍♂️ QUIDDITCH MATCH SIMULATION 🧙‍♂️

*You mount your Nimbus 2000*
*The crowd roars as you take to the sky*

${outcomes[Math.floor(Math.random() * outcomes.length)]}

"I've seen you fly. You're a natural seeker!"`;

                case 'rules':
                    return `
📋 QUIDDITCH RULES 📋

Teams: 7 players each
• 3 Chasers (score with Quaffle)
• 2 Beaters (hit Bludgers)  
• 1 Keeper (guard goal posts)
• 1 Seeker (catch Golden Snitch)

Scoring:
• Quaffle through hoops: 10 points
• Golden Snitch: 150 points + game ends

Equipment:
• Quaffles (1) • Bludgers (2) • Golden Snitch (1)
• Broomsticks • Bats • Goal hoops

"Catch the Snitch or die trying!"`;

                case 'teams':
                    return `
🌟 FAMOUS QUIDDITCH TEAMS 🌟

Professional:
• Chudley Cannons 🧡
• Holyhead Harpies 💚
• Wimbourne Wasps 💛
• Bulgarian National Team 🇧🇬

Hogwarts Houses:
• Gryffindor Lions 🦁
• Slytherin Serpents 🐍
• Ravenclaw Eagles 🦅  
• Hufflepuff Badgers 🦡

"The Irish National Team has the best Chasers in the world!"`;

                default:
                    return "Unknown Quidditch command. Try 'quidditch stats' or 'quidditch play'.";
            }
        },

        'marauders': () => {
            return `
🗺️ THE MARAUDER'S MAP 🗺️

"I solemnly swear that I am up to no good."

*The map reveals...*

📍 CURRENT LOCATIONS:
• Harry Potter - Gryffindor Common Room
• Hermione Granger - Library (as usual)
• Ron Weasley - Great Hall (eating)
• Severus Snape - Potions Dungeon  
• Argus Filch - Third Floor Corridor
• Peeves - Everywhere and nowhere

🚪 SECRET PASSAGES:
• Behind Gregory the Smarmy
• One-eyed witch statue (Honeyduke's)
• Mirror on 4th floor
• Portrait of Ariana Dumbledore

⚠️ WARNING: Dementors detected near the castle gates

"Mischief managed."`;
        },

        'patronus': () => {
            const patronuses = [
                'Stag (like Harry Potter) 🦌',
                'Otter (like Hermione Granger) 🦦',
                'Jack Russell Terrier (like Ron Weasley) 🐕',
                'Doe (like Severus Snape) 🦌',
                'Phoenix (rare) 🔥',
                'Dragon (very rare) 🐉',
                'Wolf 🐺',
                'Cat 🐱',
                'Rabbit 🐰',
                'Eagle 🦅'
            ];

            const myPatronus = patronuses[Math.floor(Math.random() * patronuses.length)];

            return `
✨ EXPECTO PATRONUM! ✨

*You concentrate on your happiest memory*
*A silvery mist erupts from your wand*
*The mist takes shape...*

Your Patronus is: ${myPatronus}

"A Patronus is a kind of positive force, a projection of the very things that the Dementor feeds upon — hope, happiness, the desire to survive."

The silvery guardian bounds around you protectively, driving away all dark creatures!`;
        },

        'potions': (args) => {
            if (!args || args.length === 0) {
                return `
🧪 PROFESSOR SNAPE'S POTIONS CLASS 🧪

• potions brew [potion] - Brew a potion
• potions list - Available potions
• potions ingredients - View ingredient store

"I can teach you how to bottle fame, brew glory, even stopper death."`;
            }

            const action = args[0].toLowerCase();

            if (action === 'list') {
                return `
📚 POTIONS COMPENDIUM 📚

Beginner Potions:
• Sleeping Draught - Induces sleep
• Pepperup Potion - Cures common cold
• Antidote to Common Poisons

Intermediate Potions:  
• Polyjuice Potion - Transform into another person
• Veritaserum - Truth serum
• Love Potion - Creates artificial attraction

Advanced Potions:
• Felix Felicis - Liquid luck
• Wolfsbane Potion - Helps werewolves
• Elixir of Life - Grants immortality

"Turn to page 394."`;
            }

            if (action === 'brew') {
                const potion = args[1] ? args[1].toLowerCase() : '';
                const potionResults = {
                    'felix': `
🍀 BREWING FELIX FELICIS 🍀

*Adding Ashwinder egg...*
*Stirring clockwise...*
*Adding Horklump juice...*
*Counter-clockwise stir...*

SUCCESS! You've brewed Liquid Luck!
⚡ Effect: Everything goes your way for 12 hours
⚠️ Warning: Toxic in large quantities

"Desperately tricky to make, and disastrous to get wrong."`,

                    'polyjuice': `
🔄 BREWING POLYJUICE POTION 🔄

*Adding lacewing flies...*
*Leeches... knotgrass...*
*Fluxweed picked at full moon...*
*Boomslang skin...*
*Hair of the person you want to become...*

SUCCESS! Polyjuice Potion complete!
Duration: 1 hour
⚠️ Note: Very difficult, takes 1 month to brew

"This is the most complex potion I've ever seen."`,

                    'veritaserum': `
💧 BREWING VERITASERUM 💧

*Hellebore syrup...*
*Jobberknoll feathers...*
*Full moon brewing...*

SUCCESS! Truth Serum complete!
Effect: Forces drinker to tell the truth
Potency: 3 drops will do

"Use it well, it took a full lunar month to mature."`
                };

                return potionResults[potion] || `❌ Unknown potion "${potion}". Check the compendium!`;
            }

            if (action === 'ingredients') {
                return `
🏪 POTIONS INGREDIENTS STORE 🏪

Common Ingredients:
• Ashwinder Eggs - 5 Galleons
• Boomslang Skin - 17 Galleons  
• Powdered Moonstone - 3 Galleons
• Lacewing Flies - 8 Galleons

Rare Ingredients:
• Unicorn Hair - 21 Galleons
• Phoenix Feather - 50 Galleons
• Dragon Blood - 17 Galleons/ounce
• Basilisk Venom - PRICELESS

"These ingredients are not for amateur potioneers!"`;
            }

            return "Unknown potions command. Try 'potions list' or 'potions brew felix'.";
        },

        'diagon': () => {
            return `
🏪 DIAGON ALLEY 🏪

Welcome to the wizarding shopping district!

🪄 SHOPS:
• Ollivanders - Fine wands since 382 BC
• Flourish & Blotts - Books and literature  
• Madam Malkin's - Robes for all occasions
• Quality Quidditch Supplies - Sporting goods
• Weasleys' Wizard Wheezes - Joke shop
• Knockturn Alley - Dark artifacts (dangerous!)

🏛️ GRINGOTTS BANK:
"Fortius Quo Fidelius" - Strength through loyalty
Guarded by goblins and dragons
Vault 713: Recently emptied by Hagrid

🍦 FLOREAN FORTESCUE'S ICE CREAM:
Magical flavors available!

"Welcome to Diagon Alley! Mind the pickpockets and don't feed the Nifflers!"`;
        },

        // Cybersecurity Commands
        'nmap': (args) => {
            if (!args || args.length === 0) {
                return "Usage: nmap [target]";
            }

            const target = args[0];
            return `
🔍 NMAP NETWORK SCAN 🔍

Scanning target: ${target}
Scan type: TCP SYN Stealth Scan

PORT     STATE  SERVICE      VERSION
21/tcp   open   ftp          vsftpd 3.0.3
22/tcp   open   ssh          OpenSSH 7.4
23/tcp   closed telnet
53/tcp   open   domain       ISC BIND 9.11.4
80/tcp   open   http         Apache httpd 2.4.6
443/tcp  open   https        Apache httpd 2.4.6
993/tcp  open   imaps        Dovecot imapd
995/tcp  open   pop3s        Dovecot pop3d

OS fingerprinting: Linux 3.2 - 4.9
Device type: general purpose
Running: Linux 3.X|4.X

Scan completed in 23.45 seconds.`;
        },

        'metasploit': (args) => {
            if (!args || args.length === 0) {
                return `
🎯 METASPLOIT FRAMEWORK 🎯

msf6 > Available commands:
• metasploit modules - List available modules
• metasploit search [term] - Search exploits
• metasploit payload - Generate payloads

"The world's most used penetration testing framework."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'modules':
                    return `
📦 METASPLOIT MODULES 📦

Exploits: 2,176 available
• Windows: 1,021 exploits
• Linux: 385 exploits  
• Multi-platform: 770 exploits

Payloads: 592 available
• Singles: 65 payloads
• Stagers: 35 payloads
• Stages: 492 payloads

Auxiliary: 1,141 modules
Post-exploitation: 398 modules
Encoders: 46 modules

"Choose your weapon wisely."`;

                case 'search':
                    const searchTerm = args[1] || 'ms17-010';
                    return `
🔍 SEARCHING FOR: ${searchTerm} 🔍

Matching Modules:
• exploit/windows/smb/ms17_010_eternalblue - MS17-010 EternalBlue SMB
• exploit/windows/smb/ms17_010_psexec - MS17-010 EternalRomance/EternalSynergy
• auxiliary/scanner/smb/smb_ms17_010 - MS17-010 SMB RCE Detection

Rank: Excellent
Platform: Windows
Targets: Windows 7/2008/8.1/10/2012/2016

"Remember: Only use on systems you own or have permission to test."`;

                case 'payload':
                    return `
💀 PAYLOAD GENERATOR 💀

Generated payload: windows/x64/meterpreter/reverse_tcp
LHOST: 192.168.1.100
LPORT: 4444
Size: 510 bytes

Encoding: x86/shikata_ga_nai (1 iteration)
Format: exe

⚠️ WARNING: For authorized penetration testing only!`;

                default:
                    return "Unknown metasploit command. Use 'metasploit modules' to see options.";
            }
        },

        'wireshark': (args) => {
            if (!args || args.length === 0) {
                return `
🦈 WIRESHARK PACKET ANALYZER 🦈

• wireshark capture - Start packet capture
• wireshark analyze - Analyze captured data
• wireshark filter [protocol] - Apply filters

"The world's foremost network protocol analyzer."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'capture':
                    return `
📡 PACKET CAPTURE INITIATED 📡

Interface: eth0
Capture filter: None
Buffer size: 10 MB

Packets captured: 15,384
Data rate: 156.3 KB/s

Protocol breakdown:
• TCP: 78.2% (12,030 packets)
• UDP: 12.1% (1,861 packets)  
• HTTP: 6.4% (984 packets)
• HTTPS: 2.8% (431 packets)
• DNS: 0.5% (78 packets)

Capture running... Press Ctrl+C to stop.`;

                case 'analyze':
                    return `
🔬 PACKET ANALYSIS RESULTS 🔬

Suspicious Activity Detected:
⚠️ Port scan from 192.168.1.50
⚠️ Unusual DNS queries to suspicious domains
⚠️ Large file transfers detected

Top Talkers:
1. 192.168.1.100 → 10.0.0.5 (15.2 MB)
2. 10.0.0.12 → 172.16.1.8 (8.7 MB)
3. 192.168.1.75 → 8.8.8.8 (2.1 MB)

Recommendation: Investigate 192.168.1.50 immediately.`;

                case 'filter':
                    const protocol = args[1] || 'http';
                    return `
🔍 APPLYING FILTER: ${protocol.toUpperCase()} 🔍

Filter expression: ${protocol}
Packets matching: 984

Sample ${protocol.toUpperCase()} traffic:
• GET /index.html HTTP/1.1
• POST /login.php HTTP/1.1  
• GET /admin/config.php HTTP/1.1 (⚠️ Suspicious)

Use display filters to refine analysis.`;

                default:
                    return "Unknown wireshark command. Try 'wireshark capture' or 'wireshark analyze'.";
            }
        },

        'hashcat': (args) => {
            if (!args || args.length === 0) {
                return `
💥 HASHCAT PASSWORD RECOVERY 💥

• hashcat crack [hash] - Crack password hash
• hashcat benchmark - Performance benchmark
• hashcat wordlist - Manage wordlists

"World's fastest and most advanced password recovery utility."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'crack':
                    return `
🔓 HASH CRACKING SIMULATION 🔓

Hash type: MD5
Attack mode: Dictionary attack
Wordlist: rockyou.txt

[*] Starting attack...
[*] Candidate passwords: 14,344,391
[*] Trying: password123...
[*] Trying: admin...
[*] Trying: qwerty...

💡 CRACKED: d8578edf8458ce06fbc5bb76a58c5ca4 = qwerty

Time taken: 2.3 seconds
Speed: 6,234,567 H/s

⚠️ Remember: Only crack hashes you own or have permission to test.`;

                case 'benchmark':
                    return `
⚡ HASHCAT BENCHMARK ⚡

GPU: NVIDIA RTX 4090
CUDA Cores: 16,384

Hash Type Performance:
• MD5: 65.2 GH/s
• SHA-1: 22.1 GH/s  
• SHA-256: 11.4 GH/s
• bcrypt: 156.8 kH/s
• NTLM: 98.7 GH/s

Temperature: 67°C
Power consumption: 425W

"Your GPU is a beast!"`;

                case 'wordlist':
                    return `
📚 WORDLIST MANAGEMENT 📚

Available wordlists:
• rockyou.txt - 14,344,391 passwords
• john.txt - 3,559 passwords
• 10k-most-common.txt - 10,000 passwords
• corporate.txt - 156,789 passwords

Custom rules available:
• best64.rule - 64 transformation rules
• leetspeak.rule - L33t substitutions
• append-years.rule - Add years 1980-2023

"A good wordlist is half the battle."`;

                default:
                    return "Unknown hashcat command. Try 'hashcat crack' or 'hashcat benchmark'.";
            }
        },

        'burpsuite': (args) => {
            if (!args || args.length === 0) {
                return `
🕷️ BURP SUITE WEB SECURITY 🕷️

• burpsuite scan [url] - Web vulnerability scan
• burpsuite proxy - Configure proxy settings
• burpsuite intruder - Automated attacks

"The leading toolkit for web application security testing."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'scan':
                    const url = args[1] || 'https://example.com';
                    return `
🎯 WEB VULNERABILITY SCAN 🎯

Target: ${url}
Scan type: Comprehensive

Vulnerabilities found:
🔴 HIGH: SQL Injection in /login.php
🟡 MEDIUM: Cross-Site Scripting (XSS) in /search.php
🟡 MEDIUM: Unvalidated Redirects in /redirect.php
🟢 LOW: Information Disclosure in /robots.txt
🟢 LOW: Missing Security Headers

Total issues: 15
Risk score: 7.8/10

"Immediate remediation required for HIGH severity issues."`;

                case 'proxy':
                    return `
🔄 BURP PROXY CONFIGURATION 🔄

Proxy listener: 127.0.0.1:8080
Status: Running
Intercept: Enabled

Traffic interception:
• HTTP requests: 247 captured
• HTTPS requests: 156 captured
• WebSocket connections: 12 captured

Certificate: Burp CA installed
SSL/TLS: Pass-through enabled

"All web traffic is being intercepted and logged."`;

                case 'intruder':
                    return `
💥 BURP INTRUDER ATTACK 💥

Attack type: Sniper
Target: /admin/login
Payload: Username enumeration

Progress: ████████████████ 100%
Requests sent: 1,000
Successful logins: 3

Valid credentials found:
• admin:password123
• user:qwerty
• test:admin

Attack completed in 45.6 seconds.
Rate: 21.9 requests/second`;

                default:
                    return "Unknown burpsuite command. Try 'burpsuite scan' or 'burpsuite proxy'.";
            }
        },

        'volatility': (args) => {
            if (!args || args.length === 0) {
                return `
🧠 VOLATILITY MEMORY FORENSICS 🧠

• volatility analyze [dump] - Analyze memory dump
• volatility processes - List running processes
• volatility network - Network connections

"Advanced memory forensics framework."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'analyze':
                    return `
🔬 MEMORY DUMP ANALYSIS 🔬

File: memory_dump.vmem
Size: 8.0 GB
OS: Windows 10 x64

Analysis complete:
• Profile: Win10x64_19041
• Processes: 127 identified
• Network connections: 23 active
• Registry hives: 6 loaded

Suspicious findings:
⚠️ Unknown process: evil.exe (PID 1337)
⚠️ Encrypted communications detected
⚠️ Registry modifications found

"Evidence of compromise detected."`;

                case 'processes':
                    return `
📋 RUNNING PROCESSES 📋

PID   PPID  Process Name           Path
4     0     System                 N/A
156   4     smss.exe              \\SystemRoot\\System32\\smss.exe
284   276   csrss.exe             \\Windows\\System32\\csrss.exe
356   348   wininit.exe           \\Windows\\System32\\wininit.exe
1337  356   evil.exe              ⚠️ SUSPICIOUS LOCATION
1521  1492  notepad.exe           \\Windows\\System32\\notepad.exe

Total processes: 127
Suspicious processes: 1

"Process 1337 requires immediate investigation."`;

                case 'network':
                    return `
🌐 NETWORK CONNECTIONS 🌐

Local Address      Foreign Address     State      PID
127.0.0.1:445     0.0.0.0:0           LISTENING  4
192.168.1.100:80  203.0.113.42:443   ESTABLISHED 1337 ⚠️
10.0.0.1:3389     0.0.0.0:0           LISTENING  1024

Suspicious connections:
• PID 1337 connecting to known C2 server
• Encrypted traffic to 203.0.113.42

"Malicious network activity confirmed."`;

                default:
                    return "Unknown volatility command. Try 'volatility analyze' or 'volatility processes'.";
            }
        },

        'sqlmap': (args) => {
            if (!args || args.length === 0) {
                return `
💉 SQLMAP SQL INJECTION TOOLKIT 💉

• sqlmap scan [url] - Test for SQL injection
• sqlmap exploit [url] - Exploit vulnerability
• sqlmap dump [table] - Extract data

"Automatic SQL injection and database takeover tool."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'scan':
                    const url = args[1] || 'http://testphp.vulnweb.com/artists.php?artist=1';
                    return `
🔍 SQL INJECTION SCAN 🔍

Target: ${url}
Parameter: artist

Testing injection points...
[*] Testing GET parameter 'artist'
[*] MySQL >= 5.0.12 AND time-based blind
[*] MySQL >= 5.0.12 OR time-based blind

VULNERABLE! SQL injection found:
• Parameter: artist (GET)
• Type: boolean-based blind
• Title: AND boolean-based blind - WHERE or HAVING clause
• Payload: artist=1' AND 1=1-- 

Database: MySQL 5.7.29
Web application technology: PHP 7.2.34, Apache 2.4.41

"Target is vulnerable to SQL injection!"`;

                case 'exploit':
                    return `
💥 EXPLOITING SQL INJECTION 💥

Extracting database information...
[*] Current user: 'web_user@localhost'
[*] Current database: 'acuart'
[*] Database users: 'root', 'web_user'

Available databases:
• information_schema
• acuart (current)
• mysql
• performance_schema

Tables in 'acuart':
• artists (8 columns)
• carts (5 columns)  
• users (4 columns)

"Database compromise successful!"`;

                case 'dump':
                    const table = args[1] || 'users';
                    return `
💾 DUMPING TABLE: ${table} 💾

Extracting data from table '${table}'...

[*] Starting data extraction
[*] Retrieved: admin
[*] Retrieved: user123
[*] Retrieved: testuser

Table '${table}' dumped to CSV file.
Entries: 156
Columns: id, username, password, email

Sample data:
1,admin,5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8,admin@example.com
2,user123,ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f,user@example.com

"Data extraction complete!"`;

                default:
                    return "Unknown sqlmap command. Try 'sqlmap scan [url]' or 'sqlmap exploit'.";
            }
        },

        // AI Commands
        'tensorflow': (args) => {
            if (!args || args.length === 0) {
                return `
🧠 TENSORFLOW MACHINE LEARNING 🧠

• tensorflow model [create|load] - Model operations
• tensorflow train [dataset] - Train neural network
• tensorflow predict [data] - Make predictions

"An end-to-end open source machine learning platform."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'model':
                    return `
🏗️ TENSORFLOW MODEL BUILDER 🏗️

Creating Sequential model...

Model architecture:
• Input layer: 784 neurons (28x28 pixels)
• Hidden layer 1: 128 neurons (ReLU)
• Dropout: 0.2
• Hidden layer 2: 64 neurons (ReLU)  
• Output layer: 10 neurons (Softmax)

Total parameters: 101,770
Trainable parameters: 101,770
Non-trainable parameters: 0

Model compiled with:
• Optimizer: Adam
• Loss: sparse_categorical_crossentropy
• Metrics: accuracy

"Model ready for training!"`;

                case 'train':
                    return `
🏃‍♂️ TRAINING NEURAL NETWORK 🏃‍♂️

Dataset: MNIST handwritten digits
Training samples: 60,000
Validation samples: 10,000

Epoch 1/10
████████████████████████████████ 60000/60000
loss: 0.2956 - accuracy: 0.9128 - val_loss: 0.1472 - val_accuracy: 0.9561

Epoch 10/10
████████████████████████████████ 60000/60000
loss: 0.0234 - accuracy: 0.9934 - val_loss: 0.0789 - val_accuracy: 0.9823

Training complete!
Final accuracy: 99.34%
Model saved to: ./models/mnist_classifier.h5`;

                case 'predict':
                    return `
🔮 MAKING PREDICTIONS 🔮

Loading model: mnist_classifier.h5
Input shape: (28, 28, 1)

Prediction results:
Image 1: Digit '7' (confidence: 99.2%)
Image 2: Digit '3' (confidence: 97.8%)
Image 3: Digit '0' (confidence: 99.9%)

Inference time: 12.3ms per image
Batch processing: 156 images/second

"Neural network predictions complete!"`;

                default:
                    return "Unknown tensorflow command. Try 'tensorflow model' or 'tensorflow train'.";
            }
        },

        'pytorch': (args) => {
            if (!args || args.length === 0) {
                return `
🔥 PYTORCH DEEP LEARNING 🔥

• pytorch neural [type] - Create neural network
• pytorch train [model] - Train deep learning model
• pytorch gpu - Check GPU availability

"PyTorch: An open source machine learning framework."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'neural':
                    return `
🧠 PYTORCH NEURAL NETWORK 🧠

import torch
import torch.nn as nn

class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()
        self.stack = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),  
            nn.ReLU(),
            nn.Linear(512, 10)
        )
    
    def forward(self, x):
        return self.stack(x)

Model created successfully!
Device: cuda:0 (NVIDIA RTX 4090)
Parameters: 669,706`;

                case 'train':
                    return `
🏋️‍♂️ PYTORCH TRAINING LOOP 🏋️‍♂️

Training ResNet-50 on CIFAR-10...

Epoch [1/100] Batch [100/500]
Loss: 2.3456 | Accuracy: 12.34%

Epoch [50/100] Batch [500/500]  
Loss: 0.4567 | Accuracy: 85.67%

Epoch [100/100] Batch [500/500]
Loss: 0.0234 | Accuracy: 96.78%

Training complete!
Best validation accuracy: 94.23%
Model saved: checkpoint_epoch_100.pth`;

                case 'gpu':
                    return `
🚀 PYTORCH GPU STATUS 🚀

CUDA available: True
CUDA version: 11.8
GPU count: 1

Device 0: NVIDIA GeForce RTX 4090
Memory: 24564 MB total, 23891 MB free
Compute capability: 8.9

Current device: cuda:0
Memory allocated: 673 MB
Memory cached: 1024 MB

"GPU acceleration enabled!"`;

                default:
                    return "Unknown pytorch command. Try 'pytorch neural' or 'pytorch gpu'.";
            }
        },

        'openai': (args) => {
            if (!args || args.length === 0) {
                return `
🤖 OPENAI API INTERFACE 🤖

• openai gpt [prompt] - Chat with GPT model
• openai dalle [description] - Generate images
• openai models - List available models

"Creating safe AGI that benefits all of humanity."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'gpt':
                    const prompt = args.slice(1).join(' ') || 'Hello, how are you?';
                    return `
🤖 GPT-4 RESPONSE 🤖

User: ${prompt}

GPT-4: Hello! I'm doing well, thank you for asking. I'm here to help you with any questions or tasks you might have. As an AI assistant, I'm always ready to engage in conversation, provide information, help with coding, creative writing, analysis, or just chat about interesting topics. What would you like to explore today?

Model: gpt-4-turbo
Tokens used: 156/8192
Response time: 0.8s

"I aim to be helpful, harmless, and honest."`;

                case 'dalle':
                    const description = args.slice(1).join(' ') || 'a futuristic cyberpunk hacker';
                    return `
🎨 DALL-E 3 IMAGE GENERATION 🎨

Prompt: "${description}"

Generating image...
████████████████████████████████ 100%

✅ Image generated successfully!

Image details:
• Resolution: 1024x1024
• Style: Photorealistic
• Quality: HD
• Safety filter: Passed

Generated URL: https://cdn.openai.com/dall-e-3/image_xyz123.png

"Your imagination brought to life through AI."`;

                case 'models':
                    return `
🧠 AVAILABLE OPENAI MODELS 🧠

Chat Models:
• gpt-4-turbo - Most capable, latest knowledge
• gpt-4 - High intelligence, complex reasoning
• gpt-3.5-turbo - Fast, cost-effective

Image Models:
• dall-e-3 - Latest image generation
• dall-e-2 - Creative image synthesis

Other Models:
• text-embedding-ada-002 - Text embeddings
• whisper-1 - Speech recognition
• tts-1 - Text-to-speech

"Choose the right model for your use case."`;

                default:
                    return "Unknown OpenAI command. Try 'openai gpt [prompt]' or 'openai dalle [description]'.";
            }
        },

        'huggingface': (args) => {
            if (!args || args.length === 0) {
                return `
🤗 HUGGING FACE MODEL HUB 🤗

• huggingface models [search] - Search models
• huggingface datasets [category] - Browse datasets
• huggingface spaces - Interactive demos

"The AI community building the future."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'models':
                    const searchTerm = args[1] || 'language';
                    return `
🔍 SEARCHING MODELS: ${searchTerm} 🔍

Top results:
• microsoft/DialoGPT-large - Conversational AI
• google/flan-t5-xxl - Text-to-text generation
• meta-llama/Llama-2-70b-chat-hf - Large language model
• openai/whisper-large-v3 - Speech recognition
• stabilityai/stable-diffusion-xl-base-1.0 - Image generation

Downloads this month: 2.1M
Stars: 45.2K total
Languages: 75+ supported

"Discover amazing models from the community!"`;

                case 'datasets':
                    return `
📊 HUGGING FACE DATASETS 📊

Popular Categories:
• Natural Language Processing (15,432 datasets)
• Computer Vision (8,921 datasets)
• Audio (2,156 datasets)
• Tabular (1,823 datasets)
• Multimodal (945 datasets)

Featured Datasets:
• Common Crawl - Web scraping data
• ImageNet - Image classification
• SQuAD - Reading comprehension
• GLUE - Language understanding
• MS COCO - Image captioning

Total datasets: 28,345
"Data is the fuel of machine learning."`;

                case 'spaces':
                    return `
🚀 HUGGING FACE SPACES 🚀

Trending Spaces:
• ChatGPT Clone - conversational AI demo
• Stable Diffusion - image generation
• Whisper ASR - speech recognition
• CLIP Interrogator - image analysis
• GPT-4 Turbo Playground

Technologies:
• Gradio: 15,234 spaces
• Streamlit: 8,912 spaces
• Static HTML: 3,456 spaces

"Try cutting-edge AI models instantly in your browser!"`;

                default:
                    return "Unknown Hugging Face command. Try 'huggingface models' or 'huggingface datasets'.";
            }
        },

        'kaggle': (args) => {
            if (!args || args.length === 0) {
                return `
🏆 KAGGLE DATA SCIENCE PLATFORM 🏆

• kaggle competitions - Active competitions
• kaggle datasets [category] - Explore datasets
• kaggle kernels - Code notebooks

"Your home for data science and machine learning."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'competitions':
                    return `
🥇 ACTIVE KAGGLE COMPETITIONS 🥇

Featured Competitions:
• House Prices Prediction - $15,000 prize
• Titanic Survival Classification - Getting Started
• Digit Recognizer - Computer Vision
• Natural Language Processing with Disaster Tweets
• Store Sales Forecasting - Time Series

Your Stats:
• Competitions entered: 7
• Best ranking: 156th / 2,847
• Medals earned: 1 Bronze
• Current tier: Contributor

"Compete and learn from the best data scientists!"`;

                case 'datasets':
                    const category = args[1] || 'machine-learning';
                    return `
📈 KAGGLE DATASETS: ${category.toUpperCase()} 📈

Top Datasets:
• FIFA World Cup (2022) - Sports analytics
• Netflix Movies and TV Shows - Streaming data  
• COVID-19 Open Research Dataset - Medical research
• New York City Taxi Trip Duration - Transportation
• Pokemon Dataset - Gaming data

Dataset Stats:
• Total datasets: 50,000+
• Downloads this month: 1.2M
• Most popular: Titanic dataset
• Newest: Added 156 datasets today

"Discover and share data for your next project!"`;

                case 'kernels':
                    return `
📓 KAGGLE KERNELS (NOTEBOOKS) 📓

Your Notebooks:
• Titanic Data Analysis - 47 upvotes
• COVID-19 Visualization - 23 upvotes
• Neural Network from Scratch - 156 upvotes

Trending Notebooks:
• Complete Guide to Machine Learning
• EDA to Prediction: A Complete Pipeline
• Advanced Feature Engineering Techniques

Languages:
• Python: 85% of notebooks
• R: 12% of notebooks  
• SQL: 3% of notebooks

"Share knowledge through code and collaboration!"`;

                default:
                    return "Unknown Kaggle command. Try 'kaggle competitions' or 'kaggle datasets'.";
            }
        },

        'jupyter': (args) => {
            if (!args || args.length === 0) {
                return `
📓 JUPYTER INTERACTIVE COMPUTING 📓

• jupyter notebook - Start Jupyter Notebook
• jupyter lab - Launch JupyterLab
• jupyter kernels - Manage kernels

"Supporting interactive data science and scientific computing."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'notebook':
                    return `
🚀 STARTING JUPYTER NOTEBOOK 🚀

[I 10:25:25.123 NotebookApp] Serving notebooks from /home/hacker
[I 10:25:25.456 NotebookApp] Jupyter Notebook 6.4.12 is running at:
[I 10:25:25.789 NotebookApp] http://localhost:8888/?token=abc123def456
[I 10:25:26.012 NotebookApp] Use Control-C to stop this server

Open notebooks:
• data_analysis.ipynb - Last modified 2 hours ago
• ml_experiment.ipynb - Last modified 1 day ago  
• cybersec_research.ipynb - Last modified 3 hours ago

Kernels running: 3
Memory usage: 1.2 GB

"Notebook server is ready! Happy coding!"`;

                case 'lab':
                    return `
🧪 JUPYTERLAB ENVIRONMENT 🧪

[I 10:25:25.123 ServerApp] jupyterlab | extension was successfully loaded
[I 10:25:25.456 ServerApp] JupyterLab 3.4.8 is running at:
[I 10:25:25.789 ServerApp] http://localhost:8888/lab?token=xyz789abc123

Active Extensions:
• @jupyterlab/git - Git integration
• @krassowski/jupyterlab-lsp - Language server
• jupyterlab-drawio - Diagram editor
• @jupyter-widgets/jupyterlab-manager - Interactive widgets

Workspace: Default (3 tabs open)
Theme: Dark
"The next-generation web-based UI for Project Jupyter!"`;

                case 'kernels':
                    return `
⚙️ JUPYTER KERNELS ⚙️

Available kernels:
• Python 3.9.7 - Default kernel
• R 4.1.2 - Statistical computing
• Julia 1.7.3 - High-performance computing
• Scala 2.13.6 - Big data processing
• JavaScript (Node.js) - Web development

Active sessions:
• Python 3 (2 notebooks)
• R (1 notebook)

Memory usage per kernel:
• Python: 512 MB
• R: 256 MB
• Total: 768 MB

"Multiple language support for data science!"`;

                default:
                    return "Unknown Jupyter command. Try 'jupyter notebook' or 'jupyter lab'.";
            }
        },

        'pandas': (args) => {
            if (!args || args.length === 0) {
                return `
🐼 PANDAS DATA MANIPULATION 🐼

• pandas dataframe [operation] - DataFrame operations
• pandas analyze [dataset] - Data analysis
• pandas clean [data] - Data cleaning

"Powerful data structures for data analysis."`;
            }

            const action = args[0].toLowerCase();
            switch(action) {
                case 'dataframe':
                    return `
📊 PANDAS DATAFRAME OPERATIONS 📊

import pandas as pd

# Creating DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'age': [25, 30, 35, 28],
    'city': ['NYC', 'LA', 'Chicago', 'Miami'],
    'salary': [50000, 75000, 85000, 62000]
})

DataFrame Info:
• Shape: (4, 4)
• Memory usage: 256 bytes
• Data types: 2 object, 2 int64
• Non-null values: 16/16

Common operations:
• df.head() - First 5 rows
• df.describe() - Statistical summary
• df.groupby() - Group operations
• df.merge() - Join DataFrames

"DataFrames make data manipulation easy!"`;

                case 'analyze':
                    return `
🔍 PANDAS DATA ANALYSIS 🔍

Dataset: sales_data.csv
Rows: 10,000 | Columns: 12

Statistical Summary:
       sales    profit    quantity
count  10000.0  10000.0   10000.0
mean   1250.45   312.67    47.23
std     456.78   124.89    18.45
min     100.00    25.00     1.00
max    5000.00  1250.00   200.00

Missing Values:
• customer_id: 0
• product_name: 23
• sales_date: 0
• region: 156

Top Products:
1. Laptop Pro - $2.1M revenue
2. Smartphone X - $1.8M revenue
3. Tablet Mini - $1.2M revenue

"Insights extracted from your data!"`;

                case 'clean':
                    return `
🧹 PANDAS DATA CLEANING 🧹

Cleaning operations performed:

1. Removed duplicates: 234 rows
2. Filled missing values:
   • age: median imputation
   • salary: mean imputation
   • city: mode imputation

3. Data type conversions:
   • date_column: string → datetime
   • salary: string → float64
   
4. Outlier detection:
   • Z-score method applied
   • 45 outliers flagged
   
5. Standardization:
   • Column names: lowercase
   • Text data: stripped whitespace

Before: 10,234 rows, 67% quality
After: 10,000 rows, 95% quality

"Your data is now clean and analysis-ready!"`;

                default:
                    return "Unknown pandas command. Try 'pandas dataframe' or 'pandas analyze'.";
            }
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
                "Premature optimization is the root of all evil.",
                "The Force is strong with this one.",
                "Help me, Obi-Wan Kenobi. You're my only hope.",
                "Yer a wizard, Harry!",
                "Mischief managed.",
                "The cake is a lie.",
                "In cybersecurity, trust is earned in drops and lost in buckets.",
                "AI will not replace humans, but humans with AI will replace humans without AI."
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

╔══════════════════════════════════╗
║ Wake up, Neo... The Matrix has you... ║
╚══════════════════════════════════╝`;
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
                'find': 'FIND(1)\n\nNAME\n    find - search for files\n\nSYNOPSIS\n    find [DIRECTORY] -name PATTERN\n\nDESCRIPTION\n    Search for files in DIRECTORY that match PATTERN.',
                'jedi': 'JEDI(1)\n\nNAME\n    jedi - Access Jedi Order archives and training\n\nSYNOPSIS\n    jedi [info|council|training|code]\n\nDESCRIPTION\n    Interface to the Jedi Order database and training systems.',
                'sortinghat': 'SORTINGHAT(1)\n\nNAME\n    sortinghat - Hogwarts House sorting system\n\nSYNOPSIS\n    sortinghat [house]\n\nDESCRIPTION\n    Sorts wizards into their appropriate Hogwarts houses.',
                'nmap': 'NMAP(1)\n\nNAME\n    nmap - Network exploration tool and security scanner\n\nSYNOPSIS\n    nmap [target]\n\nDESCRIPTION\n    Network scanning and security assessment tool.'
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