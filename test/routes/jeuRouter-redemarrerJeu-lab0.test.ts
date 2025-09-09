import { assert } from 'console';
import 'jest-extended';
import { Joueur } from "../../src/core/joueur"
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);


describe('GET /api/v1/jeu/redemarrerJeu', () => {
    beforeAll( async () => {
      await request.post("/api/v1/jeu/demarrerJeu").send({nom: "Bob"});
      await request.post("/api/v1/jeu/demarrerJeu").send({nom: "George"});
    })

    it("RedémarerJeu avec Succès", async () => {
      const response = await request.get("/api/v1/jeu/redemarrerJeu")
      expect(response.status).toBe(200)
    });

    it("Plus de joueur après redémarer", async () => {
      const response = await request.get("/api/v1/jeu/redemarrerJeu")
      expect(response.status).toBe(200)

      const response2 = await request.get("/api/v1/jeu/joueur")
      const joueur : Joueur[] = JSON.parse(response2.body.joueurs)
      expect(joueur.length).toBe(0)
    });




});
