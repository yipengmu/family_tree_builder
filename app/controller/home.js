'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let result = await this.ctx.service.getData.getFamilyTreeData();

    let body =  JSON.stringify(result);

    this.ctx.body = body;
    this.ctx.set('access-control-allow-origin', '*');
  }
}

module.exports = HomeController;
