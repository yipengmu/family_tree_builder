// app/service/news.js
const Service = require('egg').Service;

class FamilyTreeDBService extends Service {
    async getFamilyTreeData() {

        // 查询行数
        //const result = await this.app.mysql.query('SELECT COUNT(*) FROM family_tree_database.mu_family_tree;');

        // 原始sql方式
        const result = await this.app.mysql.query('SELECT * FROM family_tree_database.mu_family_tree;');

        // 封装调用方式
        //const result = await this.app.mysql.select('mu_family_tree');

        console.log(result);

        return {result};
    }
}

module.exports = FamilyTreeDBService;