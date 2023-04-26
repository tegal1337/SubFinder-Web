const socket = io();
const terminalTheme = {
    background: '#000000',
    foreground: '#FFFFFF',
    cursor: '#FFFFFF',
    cursorAccent: '#000000',
    selection: 'rgba(255, 255, 255, 0.3)',
    black: '#000000',
    red: '#C23621',
    green: '#25A45B',
    yellow: '#E5E510',
    blue: '#579FE6',
    magenta: '#DA28A6',
    cyan: '#2AA7E7',
    white: '#FFFFFF',
    brightBlack: '#666666',
    brightRed: '#F47178',
    brightGreen: '#5EC07E',
    brightYellow: '#F3F79E',
    brightBlue: '#89A6F7',
    brightMagenta: '#F783AC',
    brightCyan: '#6BDBE1',
    brightWhite: '#FFFFFF'
};

const terminalContainer = document.getElementById('terminal-container');
const terminal = new Terminal({ theme: terminalTheme });
const fitAddon = new FitAddon.FitAddon();

terminal.loadAddon(fitAddon);
terminal.open(terminalContainer);
fitAddon.fit();

terminal.onKey(({ key }) => {
    socket.emit('input', key);
});

socket.on('output', (data) => {
    terminal.write(data);
});

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        fitAddon.fit();
    }, 250);
});

document.getElementById('subdomain-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const subdomain = document.getElementById('subdomain-input').value;
    if (!subdomain) return;

    // document.getElementById('subdomain-form').style.display = 'none';
    document.querySelector('.terminal-window').style.display = 'block';

    socket.emit('set-subdomain', subdomain);
});