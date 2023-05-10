import express from 'express';
import {upgradeFirmware } from '../controller/upgrade_firmware_controller.js';

const router = express.Router();

router.get('/login', upgradeFirmware);

export default router;