import express, {Request, Response} from 'express';
import { 
    addBoxDetails,
    addSiteDetails, 
    addSwitchDetails, 
    getBoxDetails, 
    getSiteList, 
} from '../../dbServices/inventory/productGroup';
import { BoxDetailsProps, productgroupDetails } from 'user/types/productGroupTypes';
import { universalResponse } from 'user/types/universalResponse';

const router = express.Router();

router.post('/add-site', async(req: Request, res: Response) =>{
    const { site_location, description, shop_id }: productgroupDetails = req.body;
    const token: string = req.header('Authorization');

    try {
        const response:universalResponse = await addSiteDetails({site_location, description, shop_id})
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        // console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/add-box', async(req: Request, res: Response) =>{
    const { site_id, description, building_name, shop_id }: BoxDetailsProps = req.body;
    const token: string = req.header('Authorization');

    try {
        const response:universalResponse = await addBoxDetails({site_id, building_name, description, shop_id})
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        // console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/get-site', async(req: Request, res: Response) =>{
    const { shop_id} = req.body;
        
    try {
        const response:universalResponse = await getSiteList( shop_id);
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        // console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/box-details', async(req: Request, res: Response) =>{
    const { shop_id } = req.body;
        
    try {
        const response:universalResponse = await getBoxDetails( shop_id );
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        // console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/add-switch', async(req: Request, res: Response) =>{
    const body = req.body;
    
    try {
        const response:universalResponse = await addSwitchDetails (body)
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        // console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

export default router;