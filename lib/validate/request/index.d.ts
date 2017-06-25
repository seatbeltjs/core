import * as Joi from 'joi';
import { Decorator } from '../../../helpers';
export declare type Joi = typeof Joi;
export declare type JoyCallback = (Joi: Joi) => Joi.SchemaMap;
export declare function ValidateRequest(joyFunction: JoyCallback): Decorator.MethodDecorator;
