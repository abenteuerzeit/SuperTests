const { assert, expect } = require("chai");

const { users, seedUsers, addUserToDb } = require("../db");

describe("db", () => {
  describe("users", () => {
    it("seeds specified number of users", () => {
      const num = 1000;
      const seededUsers = seedUsers(num);
      assert.equal(seededUsers.length, num);
    });

    it("returns an array of users", () => {
      assert.isArray(users);
    });
    it("returns an array of objects", () => {
      users.forEach((user) => {
        assert.isObject(user);
      });
    });
    it("returns an array of objects with id, name, email, password, birthday, phone", () => {
      users.forEach((user) => {
        assert.property(user, "id");
        assert.property(user, "name");
        assert.property(user, "email");
        assert.property(user, "password");
        assert.property(user, "birthday");
        assert.property(user, "phone");
      });
    });
    it("generates a unique email for each user", () => {
      const emails = users.map((user) => user.email);
      assert.equal(new Set(emails).size, emails.length);
    });

    it("does not create emails without a username", () => {
      users.forEach((user) => {
        const email = user.email;
        assert.notEqual(email.indexOf("@"), 0);
        assert.notEqual(email.indexOf("."), 0);
        assert.notEqual(email.indexOf(" "), 0);
      });
    });

    it("generates a unique id for each user", () => {
      const ids = users.map((user) => user.id);
      assert.equal(new Set(ids).size, ids.length);
    });

    it("generates a US formatted phone number for each user", () => {
      users.forEach((user) => {
        assert.match(user.phone, /^\+1\(\d{3}\)\d{3}-\d{4}$/);
      });
    });

    it("generates a valid birthdate for each user", () => {
      users.forEach((user) => {
        const birthday = new Date(user.birthday);
        assert.isTrue(birthday instanceof Date);
        assert.isTrue(birthday < new Date());
      });
    });

    it("provides each user with a default password", () => {
      const pwdRegExp = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      users.forEach((user) => {
        const pwd = user.password;
        const match = pwd.match(pwdRegExp);
        assert.isTrue(match !== null);
      });
    });

    it("adding a user generates a unique id", () => {
      const user = {
        name: "John Doe",
        email: "abc@email.com",
        password: "DRPRT+uD@q?02",
        birthday: "1990-01-01",
        phone: "+1(123)456-7890",
        gender: "male",
      };

      const userAdded = addUserToDb(user);
      
      // check that the user was added
      assert.equal(userAdded, user);
      // check that the id was generated
      assert.property(userAdded, "id");
      // check that the id is unique
      const ids = users.map((user) => user.id);
      assert.equal(new Set(ids).size, ids.length);

    });

    it('returns null if user email already exists', () => {
      const email = "testing@123.com"
      const user = {
        name: "John Doe",
        email: email,
        password: "DRPRT+uD@q?02",
        birthday: "1990-01-01",
        phone: "+1(123)456-7890",
        gender: "male",
      };
      const userAdded = addUserToDb(user);
      assert.equal(userAdded, user);
      assert.isNull(addUserToDb(user));    
    });
  });
});