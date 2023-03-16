import supertest from "supertest";
import createServer from "../../server";
import controller from "./human.controller";

describe("Human", () => {
  describe("GET human route", () => {
    describe("given that database returns data", () => {
      it.todo("should return status code 200 and a body");
    });
  });
  describe("POST human route", () => {
    describe("given that an empty form is submitted", () => {
      it.todo("should return status code 404");
    });
    describe("given that a valid form is submitted", () => {
      it.todo("should return status code 201 and the body");
    });
  });
  describe("DELETE human route", () => {
    describe("given that the object exists", () => {
      it.todo("should return status code 203");
    });
    describe("given that the object does not exists", () => {
      it.todo("should return status code 404");
    });
  });
});
