document.getElementById('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const input = e.target.value;
        processCommand(input);
        e.target.value = '';
    }
});

const fileSystem = {
    '/': ['home'],
    '/home': ['standardgalactic'],
    '/home/standardgalactic': ['fonts', 'projects'],
    '/home/standardgalactic/fonts': [
        'Cheiro-Regular.eot', 'Cheiro-Regular.svg', 'Cheiro-Regular.ttf', 'Cheiro-Regular.woff', 'Cheiro-Regular.woff2',
        'Clypto-Regular.eot', 'Clypto-Regular.svg', 'Clypto-Regular.ttf', 'Clypto-Regular.woff', 'Clypto-Regular.woff2',
        'CursiveGalactic-Regular.g2n', 'CursiveGalactic-Regular.ttf', 'FONTLOG.txt', 'Lingojam_cipher-Regular.ttf',
        'Logico_philosophicus-Regular.g2n', 'Logico_philosophicus-Regular.ttf', 'NovaMonoStandardGalactic.ttf',
        'Sga-Regular.eot', 'Sga-Regular.g2n', 'Sga-Regular.svg', 'Sga-Regular.ttf', 'Sga-Regular.woff', 'Sga-Regular.woff2',
        'Systada-Regular.eot', 'Systada-Regular.svg', 'Systada-Regular.ttf', 'Systada-Regular.woff', 'Systada.g2n',
        'Systada.ttf', 'dactyl.ttf', 'demo.html', 'shapeform.g2n', 'shapeform.ttf', 'stylesheet.css'
    ],
    '/home/standardgalactic/projects': []
};

let currentDirectory = '/home/standardgalactic';

function processCommand(command) {
    const output = document.getElementById('output');
    const newLine = document.createElement('div');
    newLine.textContent = `$ ${command}`;
    output.appendChild(newLine);

    const [cmd, ...args] = command.split(' ');

    switch (cmd) {
        case 'ls':
            listFiles(args);
            break;
        case 'pwd':
            output.appendChild(createOutputLine(currentDirectory));
            break;
        case 'echo':
            output.appendChild(createOutputLine(args.join(' ')));
            break;
        case 'cd':
            changeDirectory(args);
            break;
        case 'clear':
            output.innerHTML = '';
            break;
        default:
            output.appendChild(createOutputLine('Command not found'));
    }

    output.scrollTop = output.scrollHeight;
}

function listFiles(args) {
    const output = document.getElementById('output');
    const path = args[0] ? `${currentDirectory}/${args[0]}` : currentDirectory;
    if (fileSystem[path]) {
        fileSystem[path].forEach(file => output.appendChild(createOutputLine(file)));
    } else {
        output.appendChild(createOutputLine('No such directory'));
    }
}

function changeDirectory(args) {
    const output = document.getElementById('output');
    const newDir = args[0];
    if (newDir === '..') {
        const parentDir = currentDirectory.split('/').slice(0, -1).join('/') || '/';
        if (fileSystem[parentDir]) {
            currentDirectory = parentDir;
        } else {
            output.appendChild(createOutputLine('No such directory'));
        }
    } else if (fileSystem[`${currentDirectory}/${newDir}`]) {
        currentDirectory = `${currentDirectory}/${newDir}`;
    } else {
        output.appendChild(createOutputLine('No such directory'));
    }
}

function createOutputLine(text) {
    const line = document.createElement('div');
    line.textContent = text;
    return line;
}

function setFont(font) {
    const terminal = document.getElementById('terminal');
    terminal.style.fontFamily = font;

    const output = document.getElementById('output');
    output.style.fontFamily = font;

    const inputLine = document.getElementById('input-line');
    inputLine.style.fontFamily = font;

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.fontFamily = font;
    });
}