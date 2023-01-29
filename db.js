const { surnames, maleNames, femaleNames } = require("./_names");
const { nouns, colors, adjectives, emailDomains } = require("./_words");
const genders = ["male", "female"];
const usernames = [];
const pwdRegExp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const _getUniqueWords = (arr) => {
  return Array.from(new Set(arr));
};
const words = [
  _getUniqueWords(nouns),
  _getUniqueWords(adjectives),
  _getUniqueWords(colors),
].flat();

const _userIds = new Set();
const addUserToDb = (user) => {
  try {
    const generateNewId = () => {
      let id = Math.floor(Math.random() * _userIds.size + 1);
      if (_userIds.has(id)) {
        return generateNewId();
      }
      return id;
    };
    if (users.find((u) => u.email === user.email)) {
      return null;
    }
    user.id = generateNewId();
    _userIds.add(user.id);
    users.push(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

class UserGenerator {
  constructor(id) {
    this.id = id;
    _userIds.add(id);
    this.name = this._generateName();
    this.email = this._generateEmail();
    this.password = this._generatePassword();
    this.birthday = this._generateBirthday();
    this.phone = this._generatePhone();
  }

  _generateName() {
    this.name = `${this._generateFirstName()} ${this._generateLastName()}`;
    return this.name;
  }

  _generateFirstName() {
    this.gender = genders[Math.floor(Math.random() * genders.length)];
    switch (this.gender) {
      case genders[0]:
        return maleNames[Math.floor(Math.random() * maleNames.length)];
      case genders[1]:
        return femaleNames[Math.floor(Math.random() * femaleNames.length)];
      default:
        return "Unknown";
    }
  }
  _generateLastName() {
    return surnames[Math.floor(Math.random() * surnames.length)];
  }
  _generateEmail() {
    return `${this._generateUsername()}@${
      emailDomains[Math.floor(Math.random() * emailDomains.length)]
    }`;
  }
  _generateUsername() {
    let _username = "";
    for (let i = 0; i < Math.floor(Math.random() * words.length); i++) {
      let rollDice = Math.floor(Math.random() * 7);
      switch (rollDice) {
        case 0:
          // user first initial and last name is used as username
          _username = `${this.name[0].toLowerCase()}${this.name
            .split(" ")[1]
            .toLowerCase()}`;
          break;
        case 1:
          // user initials are used as username with random number
          _username = `${this.name[0].toLowerCase()}${this.name
            .split(" ")[1][0]
            .toLowerCase()}${Math.floor(Math.random() * 1000)}`;
          break;
        case 2:
          // random word is used as username
          _username = `${words[
            Math.floor(Math.random() * words.length)
          ].toLowerCase()}`;
          break;
        case 3:
          // random word is used as username with random number
          _username = `${words[
            Math.floor(Math.random() * words.length)
          ].toLowerCase()}${Math.floor(Math.random() * 1000)}`;
          break;
        case 4:
          // parts of random words are used as username
          _username = `${words[
            Math.floor(Math.random() * words.length)
          ].toLowerCase()}${words[
            Math.floor(Math.random() * words.length)
          ].toLowerCase()}`;
          break;
        case 5:
          // parts of random words are used as username with parts of name and random number
          _username = `${words[
            Math.floor(Math.random() * words.length)
          ].toLowerCase()}${words[
            Math.floor(Math.random() * words.length)
          ].toLowerCase()}${this.name[0].toLowerCase()}${this.name
            .split(" ")[1][0]
            .toLowerCase()}${Math.floor(Math.random() * 1000)}`;
          break;
        case 6:
          // user first and last name is used separated by a dot and random characters or numbers are sometimes added
          if (
            Math.floor(Math.random() * 2) === 0 &&
            Math.floor(Math.random() * 2) === 0
          ) {
            _username = `${this.name.replace(" ", ".").toLowerCase()}`;
          } else if (Math.floor(Math.random() * 2) === 0) {
            _username = `${this.name
              .replace(" ", ".")
              .toLowerCase()}${Math.floor(Math.random() * 1000)}`;
          } else {
            const chars =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._";
            _username = `${this.name.replace(" ", ".").toLowerCase()}${
              chars[Math.floor(Math.random() * chars.length)]
            }${Math.floor(
              (Math.random() * 1000) % 2 === 0
                ? Math.floor(Math.random() * 1000)
                : ""
            )}`;
          }
          break;
        default:
          // user first and last name is used as username
          _username = this.name.replace(" ", "").toLowerCase();
          break;
      }
    }
    if (usernames.includes(_username) || ["", " ", "."].includes(_username)) {
      return this._generateUsername();
    } else {
      usernames.push(_username);
      return _username;
    }
  }
  _generatePassword() {
    // make password to match pwdRegExp const above
    let _password = "";
    while (!_password.match(pwdRegExp)) {
      _password = "";
      for (let i = 0; i < Math.floor(Math.random() * 10) + 8; i++) {
        _password += String.fromCharCode(Math.floor(Math.random() * 94) + 33);
      }
    }
    return _password;
  }

  _generateBirthday() {
    const birthday = new Date();
    birthday.setFullYear(Math.floor(Math.random() * 100) + 1920);
    birthday.setMonth(Math.floor(Math.random() * 12));
    birthday.setDate(Math.floor(Math.random() * 28));
    this.birthday = birthday.toISOString().split("T")[0];
    return this.birthday;
  }
  _generatePhone() {
    const phone = new Array(10);
    for (let i = 0; i < phone.length; i++) {
      phone[i] = Math.floor(Math.random() * 10);
    }
    const formatPhoneNumber = (phone) =>
      `+1(${phone.slice(0, 3).join("")})${phone.slice(3, 6).join("")}-${phone
        .slice(6)
        .join("")}`;
    return formatPhoneNumber(phone);
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getBirthday() {
    return this.birthday;
  }
  getGender() {
    return this._gender;
  }
  getPhone() {
    return this.phone;
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
}

const seedUsers = (num = 10) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    const user = new UserGenerator(i);
    users.push(user);
  }
  return users;
};

const users = seedUsers(100);

module.exports = {
  users: users,
  seedUsers: seedUsers,
  addUserToDb: addUserToDb,
};
