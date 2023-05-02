import { SERVER_PORT } from "./config.js";
import { ConnectDB } from "./connectDB.js";
import server from "./server.js";

// Me conecto a la database

server.listen(SERVER_PORT, () => {
	console.log(`Server opening in ${SERVER_PORT}`);
	ConnectDB();
});
