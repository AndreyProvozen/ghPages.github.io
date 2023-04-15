import { FC } from "react";

interface CircleBackgroundProps {
  children: React.ReactNode;
}

const CircleBackground: FC<CircleBackgroundProps> = ({ children }) => {
  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const circles = Array(20)
    .fill(1)
    .map((_, i) => {
      const mathPosition = {
        left: `${Math.floor(Math.random() * 100)}%`,
        right: `${Math.floor(Math.random() * 100)}%`,
        top: `${Math.floor(Math.random() * 100)}%`,
        bottom: `${Math.floor(Math.random() * 100)}%`,
        backgroundColor: getRandomColor(),
      };
      return (
        <div
          key={i}
          className="absolute m-auto rounded-full w-24 h-24"
          style={mathPosition}
        />
      );
    });
  return (
    <div className="absolute w-full h-full overflow-hidden">
      {circles}
      <div className="relative">{children}</div>
    </div>
  );
};

export default CircleBackground;
