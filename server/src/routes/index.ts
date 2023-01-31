import { Router } from "express";

const router = Router();

// health route to check status of the server
router.get("/health", async (req, res, next) => {
    res.status(200).send('OK');
});

export default router;
