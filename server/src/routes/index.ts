import { Router } from "express";

const router = Router();

router.get("/health", async (req, res, next) => {
    res.status(200).send('OK');
});

export default router;
