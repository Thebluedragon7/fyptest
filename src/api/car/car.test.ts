import supertest from "supertest";
import createServer from "../../server";

describe("Car", () => {
  describe("GET car route", () => {
    describe("given that database returns data", () => {
      it.todo("should return status code 200 and a body");
    });
  });
  describe("POST car route", () => {
    describe("given that an empty form is submitted", () => {
      it.todo("should return status code 404");
    });
    describe("given that a valid form is submitted", () => {
      it.todo("should return status code 201 and the body");
    });
  });
  describe("DELETE car route", () => {
    describe("given that the object exists", () => {
      it.todo("should return status code 203");
    });
    describe("given that the object does not exists", () => {
      it.todo("should return status code 404");
    });
  });
});
