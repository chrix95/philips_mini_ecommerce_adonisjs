"use strict";

const User = use("App/Models/User");
const { validate } = use('Validator')

class AuthController {
  async register({ request, auth, response }) {
    // set validation rules and validate
    const rules = {
      username: "required|min:3|max:255|unique:users,username",
      email: "required|email|unique:users,email",
      password: "required",
      type: "required",
      firstname: "required|min:3|max:255",
      lastname: "required|min:3|max:255",
      gender: "required|min:3|max:255",
      contact_number: "required|min:3|max:255",
      address: "required|min:3|max:255"
    };
    const validation = await validate(request.all(), rules);
    // check if validation fails
    if (validation.fails()) {
      return response.json({
        status: false,
        message: validation.messages()[0].message
      });
    }
    let user = await User.create(request.all());

    // generate token for user;
    let token = await auth.generate(user);
    // attach to payload
    Object.assign(user, {token});

    return response.json(user);
  }

  async login({ request, auth, response }) {
    // set validation rules and validate
    const rules = {
      email: "required|email",
      password: "required",
    };
    const validation = await validate(request.only(['email', 'password']), rules);
    // check if validation fails
    if (validation.fails()) {
      // session.withErrors(validation.messages()).flashAll();
      return response.json({
        status: false,
        message: validation.messages()[0].message
      });
    }

    let { email, password } = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy("email", email);
        let token = await auth.generate(user);

        Object.assign(user, {token});
        return response.json(user);
      }
    } catch (e) {
      console.log(e);
      return response.json({ message: "You are not registered!" });
    }
  }
  async getPosts({ request, response }) {
    let posts = await Post.query().with("user").fetch();

    return response.json(posts);
  }
}

module.exports = AuthController;
