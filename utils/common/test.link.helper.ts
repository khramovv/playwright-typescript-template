import { TestLink } from 'testlink-xmlrpc';

const testlink = new TestLink({
    host: "http://192.168.88.21:80/testlink/lib/api/xmlrpc/v1/xmlrpc.php",
    secure: false, // Use https, if you are using http, set to false.
    port: 80,
    apiKey: "8c6997c00bed9d0ffa799300fc758451", // The API KEY from TestLink. Get it from user profile.
});

async function checkConnection() {
    console.log("...");
    let ping = await testlink.sayHello();
    console.log(`...${ping}...`);
    if (ping === "Hello!") {
        console.log("connection established");
    }
}

console.log("..111...");
checkConnection();