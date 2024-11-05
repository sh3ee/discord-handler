const resetColor = '\x1b[0m';
const print      = {};
print.reset      = (text) => `${text}${resetColor}`;
print.bright     = (text) => `\x1b[1m${text}${resetColor}`;
print.dim        = (text) => `\x1b[2m${text}${resetColor}`;
print.underscore = (text) => `\x1b[4m${text}${resetColor}`;
print.blink      = (text) => `\x1b[5m${text}${resetColor}`;
print.reverse    = (text) => `\x1b[7m${text}${resetColor}`;
print.hidden     = (text) => `\x1b[8m${text}${resetColor}`;

print.black      = (text) => `\x1b[30m${text}${resetColor}`;
print.red        = (text) => `\x1b[31m${text}${resetColor}`;
print.green      = (text) => `\x1b[32m${text}${resetColor}`;
print.gray       = (text) => `\x1b[38;5;8m${text}${resetColor}`;
print.yellow     = (text) => `\x1b[33m${text}${resetColor}`;
print.blue       = (text) => `\x1b[34m${text}${resetColor}`;
print.magenta    = (text) => `\x1b[35m${text}${resetColor}`;
print.cyan       = (text) => `\x1b[36m${text}${resetColor}`;
print.white      = (text) => `\x1b[37m${text}${resetColor}`;

print.bgBlack    = (text) => `\x1b[40m${text}${resetColor}`;
print.bgRed      = (text) => `\x1b[41m${text}${resetColor}`;
print.bgGreen    = (text) => `\x1b[42m${text}${resetColor}`;
print.bgYellow   = (text) => `\x1b[43m${text}${resetColor}`;
print.bgBlue     = (text) => `\x1b[44m${text}${resetColor}`;
print.bgMagenta  = (text) => `\x1b[45m${text}${resetColor}`;
print.bgCyan     = (text) => `\x1b[46m${text}${resetColor}`;
print.bgWhite    = (text) => `\x1b[47m${text}${resetColor}`;


function dateTime(d) {
  let offsetIST = 330;
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset() + offsetIST);

  const year = String(d.getFullYear()), time = String(d.toLocaleTimeString());
  let month = String(d.getMonth() + 1), day = String(d.getDate());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return `${year}-${month}-${day}  ${time}`;
}

const logger = {};

logger.Info  = (n, m) => console.log('✔', print.green('  INFO'), ' ', print.blue(n.padEnd(20)), print.green(m.padEnd(25)), print.gray(dateTime(new Date())))
logger.Warn  = (n, m) => console.log('✖', print.yellow('  WARN'), ' ', print.blue(n.padEnd(20)), print.yellow(m.padEnd(25)), print.gray(dateTime(new Date())))
logger.Error = (n, m) => console.log('⚠', print.red('  ERROR'), ' ', print.blue(n.padEnd(20)), print.red(m.padEnd(25)), print.gray(dateTime(new Date())))


module.exports = {
  print,
  logger
};
