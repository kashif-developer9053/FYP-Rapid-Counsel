import express from 'express'
import { create , getAllContracts , deleteContract, getAllContractsLawyer , updateContract , endContract , getLawyerContracts} from '../controllers/contractController.js';
import userAuth from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/create", userAuth, create);
router.get('/getAllContracts', userAuth ,getAllContracts);
router.get('/getAllContractsLawyer', userAuth ,getAllContractsLawyer);

router.delete('/delete/:id', userAuth, deleteContract);
router.patch('/update/:id',userAuth , updateContract );
router.patch('/end/:id',userAuth , endContract );
router.get('/getLawyerContracts/:id',userAuth , getLawyerContracts );



export default router;
