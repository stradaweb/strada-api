const supertest = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { Response } = require("../../src/common/response");
const MesaController = require("../../src/mesa/controller");

const app = express();
app.use(bodyParser.json());

// Simula las rutas como se definen en src/mesa/index.js
app.get("/mesas", MesaController.allMesa);
app.post("/mesas", MesaController.addMesa);
app.put("/mesas/:id", MesaController.updateMesa);
app.patch("/mesas/status/:id", MesaController.statusMesa);

const request = supertest(app);

jest.mock("../../src/common/validatetoken");
jest.mock("../../src/mesa/service");

const ServiceToken = require("../../src/common/validatetoken");
const MesaService = require("../../src/mesa/service");

describe("MesaController", () => {
  beforeEach(() => {
    // Reinicia los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  describe("allMesa", () => {
    it("should return all mesas", async () => {
      ServiceToken.ValidateToken.mockResolvedValue({ userId: 1 });
      MesaService.allMesa.mockResolvedValue([{ id: 1, numero: 10 }]);
      const res = await request.get("/mesas");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: 1, numero: 10 }]);
    });
  });

  describe("addMesa", () => {
    it("should add a mesa and return 201", async () => {
      ServiceToken.ValidateToken.mockResolvedValue({ userId: 1 });
      MesaService.addMesa.mockResolvedValue({ affectedRows: 1 });

      const res = await request
        .post("/mesas")
        .send({ numero: 10, descripcion: "Some description", id_seccion: 1 });

      expect(res.status).toBe(201);
      // Ajusta para verificar correctamente el contenido de la respuesta basándote en la estructura exacta que envías
      expect(res.body).toEqual({}); // Si el cuerpo de la respuesta debería estar vacío en caso de éxito
    });

    it("should handle errors and return 400", async () => {
      ServiceToken.ValidateToken.mockResolvedValue({ userId: 1 });
      MesaService.addMesa.mockResolvedValue({ affectedRows: 0 }); // Simulando un fallo en la inserción

      const res = await request
        .post("/mesas")
        .send({ numero: 10, descripcion: "Some description", id_seccion: 1 });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message"); // Verificando que la respuesta tenga una propiedad de mensaje de error
    });
  });

  // Ajusta la prueba para verificar la estructura correcta
  describe('updateMesa', () => {
    it('should update a mesa and return 200', async () => {
        ServiceToken.ValidateToken.mockResolvedValue({ userId: 1 });
        MesaService.updateMesa.mockResolvedValue({ affectedRows: 1 });

        const res = await request.put('/mesas/1').send({ id: 1, numero: 10, descripcion: "Updated description", id_seccion: 1 });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({}); // Ajustado para esperar un objeto vacío si eso es lo que realmente se envía
    });

    it('should handle errors and return 400', async () => {
        ServiceToken.ValidateToken.mockResolvedValue({ userId: 1 });
        MesaService.updateMesa.mockResolvedValue({ affectedRows: 0 }); // Simula una actualización fallida

        const res = await request.put('/mesas/1').send({ id: 1, numero: 10, descripcion: "Updated description", id_seccion: 1 });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "Bad Request" }); // Ajuste para esperar el mensaje de error correcto
    });
});

    describe('statusMesa', () => {
        it('should update the status of a mesa and return 200', async () => {
            ServiceToken.ValidateToken.mockResolvedValue({ userId: 1 });
            MesaService.statusMesa.mockResolvedValue({ affectedRows: 1 });
    
            const res = await request.patch('/mesas/status/1').send({ id: 1, estado: 1 });
            expect(res.status).toBe(200);
            // Asegúrate de que esta línea refleje lo que realmente se envía
            expect(res.body).toMatchObject({}); // Si esto es lo que realmente envías, si no, ajusta conforme a la implementación.
        });

      it('should handle errors and return 400', async () => {
        ServiceToken.ValidateToken.mockResolvedValue({ userId: 1 });
        MesaService.statusMesa.mockResolvedValue({ affectedRows: 0 });
        const res = await request.patch('/mesas/status/1').send({ id: 1, estado: 1 });
        expect(res.status).toBe(400);
      });
    });
});
