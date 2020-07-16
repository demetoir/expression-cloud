import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';

const { Builder, Nuxt } = require('nuxt');
const config = require('../../nuxt.config.js').default;

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null;

describe('router test', () => {
  beforeAll(async (done) => {
    nuxt = new Nuxt(config);
    await new Builder(nuxt).build();
    await nuxt.server.listen(3000, 'localhost');
    done();
  }, 30000);

  // Example of testing only generated html
  describe('GET /', () => {
    test('Route / exits and render HTML', async () => {
      const { html } = await nuxt.renderRoute('/', {});
      console.log(html);

      expect(html).toContain('app');
    });
  });

  describe('GET /', () => {
    test('returns status code 200', async () => {
      const response = await request(nuxt.server.app).get('/');

      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /test', () => {
    test('returns status code 404', async () => {
      const response = await request(nuxt.server.app).get('/test');
      expect(response.statusCode).toBe(404);
    });
  });

  // Close server and ask nuxt to stop listening to file changes
  afterAll((done) => {
    nuxt.close();
    done();
  });
});
