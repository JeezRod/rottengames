const app = require("./app");
const PORT = process.env.PORT || 3001;
const conn = require("./db/conn");

(async ()=> {
    await conn.connect();
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
})();