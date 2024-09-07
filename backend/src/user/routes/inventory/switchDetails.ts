import express, {Request, Response} from 'express';
import { universalResponse } from 'user/types/universalResponse';
import { updatePort, deleteProduct, getProductList, relocateClient } from '../../dbServices/inventory/productList';

const router = express.Router();

router.patch('/update-port', async(req: Request, res: Response) =>{
    const body = req.body;

    try {
        const response:universalResponse = await updatePort(body)
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response);
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.patch('/relocate-client', async(req: Request, res: Response) =>{
    const body = req.body;

    try {
        const response:universalResponse = await relocateClient(body)
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response);
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/get-product', async(req: Request, res: Response) =>{
    const body = req.body;

    try {
        const response:universalResponse = await getProductList(body)
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response);
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/delete', async(req: Request, res: Response) =>{
    const {product_id} = req.body;
    
    try {
        const response:universalResponse = await deleteProduct(product_id)
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

export default router;