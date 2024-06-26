const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const MenuController = require('../../src/menu/controller');
const { Response } = require('../../src/common/response');

const app = express();
app.use(bodyParser.json());

// Define las rutas que corresponden a cada método en el controlador
app.get('/menu', MenuController.allMenu);
app.post('/menu', MenuController.addMenu);
app.put('/menu/:id', MenuController.updateMenu);
app.delete('/menu/:id', MenuController.deleteMenu);

const request = supertest(app);

jest.mock('../../src/common/validatetoken');
jest.mock('../../src/menu/service');

const { ValidateToken } = require('../../src/common/validatetoken');
const MenuService = require('../../src/menu/service');

describe('MenuController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('allMenu', () => {
        it('should return all menu items if token is valid', async () => {
            ValidateToken.mockResolvedValue({ userId: 1 });
            MenuService.allMenu.mockResolvedValue([{ id: 1, name: "Menu 1" }]);
            const res = await request.get('/menu');
            expect(res.status).toBe(200);
            expect(res.body).toEqual([{ id: 1, name: "Menu 1" }]);
        });
    });

    describe('addMenu', () => {
        it('should successfully add a new menu item', async () => {
            ValidateToken.mockResolvedValue({ userId: 1 });
            MenuService.addMenu.mockResolvedValue({ affectedRows: 1 });
            const newItem = { nombre: "Nuevo Item", precio: 10, cantidad: 2, tipo: 2 };
            const res = await request.post('/menu').send(newItem);
            expect(res.status).toBe(201);
            expect(res.body).toEqual({});
        });
    
        it('should return 400 if data is missing', async () => {
            ValidateToken.mockResolvedValue({ userId: 1 });
            const res = await request.post('/menu').send({ nombre: "Nuevo Item", precio: 10 });
            expect(res.status).toBe(400);
        });
    });
    
    describe('updateMenu', () => {
        it('should successfully update a menu item', async () => {
            ValidateToken.mockResolvedValue({ userId: 1 });
            MenuService.updateMenu.mockResolvedValue({ affectedRows: 1 });
    
            const updateData = { id: 1, nombre: "Item Modificado", precio: 15, cantidad: 5, tipo: 2 };
            const res = await request.put('/menu/1').send(updateData);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({});
        });
    
        it('should return 400 if update fails', async () => {
            ValidateToken.mockResolvedValue({ userId: 1 });
            MenuService.updateMenu.mockResolvedValue({ affectedRows: 0 });
    
            const updateData = { id: 1, nombre: "Item Modificado", precio: 15, cantidad: 5, tipo: 2 };
            const res = await request.put('/menu/1').send(updateData);
            expect(res.status).toBe(400);
        });
    
        it('should return 400 if data is incomplete', async () => {
            ValidateToken.mockResolvedValue({ userId: 1 });
            const updateData = { id: 1, nombre: "Item Modificado" };
            const res = await request.put('/menu/1').send(updateData);
            expect(res.status).toBe(400);
        });
    });    

    describe('deleteMenu', () => {

        it('should return 400 when the delete operation fails', async () => {
            ValidateToken.mockResolvedValue({ userId: 1 });
            MenuService.deleteMenu.mockResolvedValue({ affectedRows: 0 });
    
            const res = await request.delete('/menu/1');
            expect(res.status).toBe(400);
        });
    });
    
});
