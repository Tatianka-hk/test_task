import express from 'express';
const router = express.Router();


router.post('/', (req: express.Request, res: express.Response) => {
    return res.status(200).json({msg:"ok",isValid: true })
});
export  =  router;