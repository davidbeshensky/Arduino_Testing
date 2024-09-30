const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// Replace with your Arduino's serial port name
const portName = "/dev/tty.usbmodem2102";

// Initialize the serial port
const port = new SerialPort({ path: portName, baudRate: 9600 });

// Initialize the parser
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// Open port event
port.on("open", () => {
  console.log("Serial port open");
});

// Read data
parser.on("data", (data) => {
  console.log(`Received data: ${data}`);
});

// Error handling
port.on("error", (err) => {
  console.error(`Error: ${err.message}`);
});
