const app = require("./app");
const PORT = process.env.PORT || 3001;
const conn = require("./db/conn");

(async ()=> {
    await conn().catch(err => console.log(err));
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
})();