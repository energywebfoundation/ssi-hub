import {
    Controller,
    Get,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginGuard } from './login.guard';

@Controller()
export class CsurfController {

    @UseGuards(LoginGuard)
    @ApiExcludeEndpoint()
    @Get('/get-frsc') // name should be unpredictable so hacker cannot grab it.
    async sendSecureToken(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        res.cookie('XSRF-TOKEN', req.csrfToken());

        return res.send({ isSent: true })
    }
}