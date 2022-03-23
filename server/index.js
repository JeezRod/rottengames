const PORT = process.env.PORT || 3001;
import app from "./app.js";
import DAO from "./db/conn.cjs";

(async () => {
    await DAO.connect();
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
})();