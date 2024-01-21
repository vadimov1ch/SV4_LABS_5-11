import { body, param } from 'express-validator';

//auth validation
export const loginValidation = [
    body('phoneNumber', 'Invalid phone number format').notEmpty(),
    body('password', 'Password shoud be at least 5 symbols').isLength({ min: 8 }),
];

export const registerValidation = [
    body('phoneNumber', 'Invalid phone number format').notEmpty(),
    body('password', 'Password should be at least 8 symbols').isLength({ min: 8 }),
    body('userName', 'Name is too short').isLength({ min: 2 }),
    body('role', 'Invalid role').custom((value) => {
        const roles = ['user', 'admin'];
        if (!roles.includes(value)) {
            throw new Error('Invalid role');
        }
        return true;
    }),
];

//employee validation
export const createEmployeeValidate = [
    body('name', 'Name is required').notEmpty(),
    body('position', 'Position is required').notEmpty(),
    body('specialization', 'Specialization is required').notEmpty(),
    body('imageUrl', 'Invalid URL format for image').optional(),
];

export const updateEmployeeValidate = [
    body('name', 'Name is required').optional().notEmpty(),
    body('position', 'Position is required').optional().notEmpty(),
    body('specialization', 'Specialization is required').optional().notEmpty(),
    body('imageUrl', 'Invalid URL format for image').optional(),
];

//Machine validation
export const createMachineValidation = [
    body('name', 'Product name is required').notEmpty(),
    body('model', 'Product description is required').notEmpty(),
    body('imageUrl', 'Invalid URL format for image').optional(),
    body('condition', 'Invalid condition').isBoolean(),
];

export const updateMachineValidation = [
    body('name', 'Product name is required').optional().notEmpty(),
    body('model', 'Product description is required').optional().notEmpty(),
    body('imageUrl', 'Invalid URL format for image').optional(),
    body('condition', 'Invalid condition').optional().isBoolean(),
];

//order validation
export const createOrderValidation = [
    body('description', 'Description is required').notEmpty(),
    body('status', 'Invalid status').isIn(['pending', 'inProgress', 'completed', 'declined']),
    body('price', 'Price must be a number').optional().isNumeric(),
];

export const updateOrderValidation = [
    body('description', 'Description is required').optional().notEmpty(),
    body('status', 'Invalid status').optional().isIn(['pending', 'inProgress', 'completed', 'declined']),
    body('price', 'Price must be a number').optional().isNumeric(),
];
