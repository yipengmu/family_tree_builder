'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let result = await this.ctx.service.getData.getFaimilyTreeData();

    let body =  'hi, family tree \n\n <span>' + JSON.stringify(result) + '</span>';

    this.ctx.body = body;

  }
}

module.exports = HomeController;
