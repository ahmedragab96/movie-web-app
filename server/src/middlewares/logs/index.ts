import winston from "winston";
import expressWinston from "express-winston";
import DailyRotateFile from "winston-daily-rotate-file";

const fileTransport: DailyRotateFile = new DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

export const expressLogger = expressWinston.logger({
  transports: [fileTransport, new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (req, res) {
    return false;
  },
});
