export default function loading(message: string, delay: number): string {
  const loadingTypes = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;

  const interval = setInterval(() => {
    i = (i + 1) % loadingTypes.length;
    process.stdout.write(`\r${loadingTypes[i]} ${message}`);
  }, delay);

  const stop = () => {
    clearInterval(interval);
    process.stdout.write(`\r${message}\n`);
  };

  return `\r${loadingTypes[i]} ${message}`;
}
