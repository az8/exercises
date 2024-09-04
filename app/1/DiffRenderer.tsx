import React from "react";

interface DiffRendererProps {
  diff: string;
}

export default function DiffRenderer({ diff }: DiffRendererProps): React.ReactNode {
  const lines = diff?.split('\n').filter(line => 
    !line.startsWith('diff') && 
    !line.startsWith('index') && 
    !line.startsWith('@@')
  );

  return (
    <>
      {lines.map((line, index) => {
        if (line.startsWith('+')) {
          return (
            <div 
              key={index} 
              style={{ 
                background: "#dafbe1", 
                borderRadius: "5px", 
                paddingLeft: "2px", 
                marginTop: "1px" 
              }}
            >
              {line}
            </div>
          );
        } else if (line.startsWith('-')) {
          return (
            <div 
              key={index} 
              style={{ 
                background: '#ffebe9', 
                borderRadius: "5px", 
                paddingLeft: "2px", 
                marginTop: "1px" 
              }}
            >
              {line}
            </div>
          );
        } else {
          return <div key={index}>{line}</div>;
        }
      })}
    </>
  );
}
