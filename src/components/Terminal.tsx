import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [displayText, setDisplayText] = useState('');
  const [, setCursorPosition] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = [
    {
      command: 'system.init()',
      output: ['Initializing system modules...', 'Loading configuration...']
    },
    {
      command: 'load.skills()',
      output: ['Loading developer skills...', '✓ React', '✓ Node.js', '✓ TypeScript', '✓ Cloud Architecture']
    },
    {
      command: 'start.portfolio()',
      output: ['Portfolio initialized successfully', '🚀 Ready to explore!']
    }
  ];

  useEffect(() => {
    let fullText = '';
    let currentIndex = 0;
    let isTyping = true;

    const typeNextChar = () => {
      if (!isTyping) return;

      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCursorPosition(currentIndex + 1);
        currentIndex++;
        setTimeout(typeNextChar, 50);
      } else {
        isTyping = false;
      }

      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    };

    commands.forEach((cmd) => {
      fullText += `> ${cmd.command}\n`;
      cmd.output.forEach(line => {
        fullText += line + '\n';
      });
    });

    typeNextChar();

    return () => {
      isTyping = false;
    };
  }, []);

  const lines = displayText.split('\n');
  const lastLineIndex = lines.length - 1;

  return (
    <div className="w-full max-w-2xl p-4 font-mono text-sm border rounded-lg bg-gray-900/90 backdrop-blur-sm border-purple-900/20">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-0">
          <span className="text-sm text-gray-400">Nicolas@developer:~$ ./script.sh</span>
        </div>
      </div>
      
      <div ref={terminalRef} className="space-y-1 h-[305px] overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`${
              line.startsWith('>') 
                ? 'text-blue-400' 
                : line.startsWith('✓') 
                  ? 'text-green-400'
                  : 'text-purple-300'
            } flex`}
          >
            <span>{line}</span>
            {index === lastLineIndex && (
              <span className="w-2 h-4 bg-blue-400 ml-0.5 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}