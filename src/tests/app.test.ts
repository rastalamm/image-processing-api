import request from "supertest"
import app from "../app"

describe("Server Endpoint", () => {
  it("returns a 200 if endpoint exists and sends a file", (done) => {
    request(app)
      .get("/image/200/200")
      .expect(200)
      .end((error) => (error ? done.fail(error) : done()));
  });
});
